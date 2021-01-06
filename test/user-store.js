(typeof describe === 'function') && describe("user-store", function() {
    const should = require("should");
    const temp = require('temp');
    const fs = require('fs');
    const path = require('path');
    const Credentials = require('credential');
    const cred = Credentials();
    const {
        UserStore,
    } = require("../index");
    const USERS_PATH = path.join(__dirname, '../local/users.json');
    this.timeout(30*1000);

    it("UserStore(opts) creates a user profile store", async()=>{
        var us = new UserStore();

        // default path
        should(us.filePath).equal(USERS_PATH);
        
        // custom filePath, defaultUser, cred
        var testPath = temp.path();
        var credentials = await cred.hash('testpassword');
        var defaultUser = {
            username: 'TestUser',
            isAdmin: true,
            credentials,
        };
        var us = new UserStore({
            filePath: testPath,
            cred,
            defaultUser,
        });
        should(us.cred).equal(cred);
        should(us.filePath).equal(testPath);

        // custom file is created
        var json = JSON.parse(fs.readFileSync(testPath));
        should(json.testuser).properties(['username', 'credentials']);
        should(json.testuser.username).equal('TestUser');

        // defaultUser is authenticated
        var msStart = Date.now();
        var authuser = await us.authenticate('testUSER', 'testpassword');
        should(authuser).properties({
            username: 'TestUser',
            isAdmin: true,
            // credentials,
        });
        should(authuser.dateAdded).not.below(msStart);
        should(authuser.dateAdded).not.above(Date.now());
        should(authuser.dateAuthenticated).not.below(msStart);
        should(authuser.dateAuthenticated).not.above(Date.now());

        fs.unlinkSync(testPath);
    });
    it("userInfo() returns sanitized user", async()=>{
        var filePath = temp.path();
        var users = {
            alice: {
                username: 'alice',
                address: 'alice-house',
                credentials: 'alice-secret',
            },
            bob: {
                username: 'bob',
                address: 'bob-house',
                credentials: 'bob-secret',
            },
        };
        var us = new UserStore({ users, filePath, });
        should.deepEqual(us.userInfo('bob'), {
            username: 'bob',
            address: 'bob-house',
            //credentials: 'bob-secret',
        });
        should(us.userInfo('ted')).equal(null);
    });
    it("users() returns sanitized user list", async()=>{
        var filePath = temp.path();
        var users = {
            alice: {
                username: 'alice',
                address: 'alice-house',
                credentials: 'alice-secret',
            },
            bob: {
                username: 'bob',
                address: 'bob-house',
                credentials: 'bob-secret',
            },
        };
        var us = new UserStore({ users, filePath, });
        should.deepEqual(us.users(), {
            alice: {
                username: 'alice',
                address: 'alice-house',
                //credentials: 'alice-secret',
            },
            bob: {
                username: 'bob',
                address: 'bob-house',
                //credentials: 'bob-secret',
            },
        });
    });
    it("deleteUser(username) deletes user", async()=>{
        var filePath = temp.path();
        var users = {
            alice: {
                username: 'alice',
                address: 'alice-house',
                credentials: 'alice-secret',
            },
            bob: {
                username: 'bob',
                address: 'bob-house',
                credentials: 'bob-secret',
            },
        };
        var us = new UserStore({ users, filePath });
        var deleted = await us.deleteUser('bob');
        should.deepEqual(deleted, {
            username: 'bob',
            address: 'bob-house',
            //credentials: 'bob-secret',
        });
        should.deepEqual(us.users(), {
            alice: {
                username: 'alice',
                address: 'alice-house',
                //credentials: 'alice-secret',
            },
        });

        // deletion is serialized
        var us2 = new UserStore({ filePath, });
        should.deepEqual(us2.users(), {
            alice: {
                username: 'alice',
                address: 'alice-house',
                //credentials: 'alice-secret',
            },
        });
    });
    it("addUser(user) creates a new user", async()=>{
        var filePath = temp.path();
        var us = new UserStore({ filePath, });
        var user = {
            username: "test-user",
            password: "secret",
            isAdmin: true,
            isTranslator: true,
        };
        var msStart = Date.now();
        var testuser = await us.addUser(user);
        should(testuser).properties({
            username: "test-user",
            isAdmin: true,
            isTranslator: true,
        });
        should(testuser.dateAdded).not.below(msStart);
        should(testuser.dateAdded).not.above(Date.now());
        should(testuser.password).equal(undefined);
        should(us.users()).properties(["test-user"]);

        // new user is serialized
        var us2 = new UserStore({ filePath, });
        var testuser2 = us2.userInfo('test-user');
        should.deepEqual(testuser2, testuser);
    });
    it("setPassword(username,password) sets password", async()=>{
        var filePath = temp.path();
        var us = new UserStore({ filePath, });
        var user = {
            username: "test-user",
            password: "secret",
            isAdmin: true,
            isEditor: true,
        };
        var msStart = Date.now();
        var testuser = await us.addUser(user);
        should(testuser).properties({
            username: "test-user",
            isAdmin: true,
            isEditor: true,
        });
        var testuser1 = await us.setPassword("test-user", "new-secret");
        should(testuser1).properties({
            username: "test-user",
            isAdmin: true,
            isEditor: true,
        });
        should(testuser1).properties([
            'username',
            'isAdmin',
            'isEditor',
            'dateAdded',
            'dateSetPassword',
        ]);

        // new user password is serialized
        var us2 = new UserStore({ filePath, });
        var msStart = Date.now();
        var testuser2 = await us2.authenticate('test-user', 'new-secret');
        should(testuser2).properties(testuser1);
        should(testuser2.dateAuthenticated).not.below(msStart);
        should(testuser2.dateAuthenticated).not.above(Date.now());
    });
    it("TESTTESTauthenticate(u,pw) check username/password", async()=>{
        var filePath = temp.path();
        var us = new UserStore({ filePath, });
        var user = {
            username: "testuser",
            password: "secret",
            isHoly: true,
        };
        var result = await us.addUser(user);
        var MIN_TIME = 1000; // ALL authentications take time

        // authenticate returns user
        var us2 = new UserStore({ filePath, });
        should(result.password).equal(undefined);
        var msStart = Date.now();
        var authuser = await us2.authenticate("testuser", "secret");
        should(authuser).properties({
            username: "testuser",
            isHoly: true,
        });
        should(authuser.dateAuthenticated).not.below(msStart);
        should(authuser.dateAuthenticated).not.above(Date.now());
        should(authuser.password).equal(undefined);
        authuser.username = 'hack-attempt'; 
        should(us.userInfo('testuser').username)
            .equal('testuser'); // no change
        should(Date.now()-msStart).above(MIN_TIME);

        // wrong user
        var msStart = Date.now();
        var auth = await us2.authenticate("test-nobody", "secret");
        should(auth).equal(null);
        should(Date.now()-msStart).above(MIN_TIME);

        // wrong password
        var msStart = Date.now();
        var auth = await us2.authenticate("testuser", "wrongsecret");
        should(auth).equal(null);
        should(Date.now()-msStart).above(MIN_TIME);

        fs.unlinkSync(filePath);
    });
});

