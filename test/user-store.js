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

    it("UserStore(opts) creates a user profile store", function() {
        var users = new UserStore();

        // default path
        should(users.filePath).equal(USERS_PATH);
        
        var testPath = temp.path();
        var users = new UserStore({
            filePath: testPath,
        });
        var json = JSON.parse(fs.readFileSync(testPath));
        should(json.admin).properties(['username', 'credentials']);
        should(json.admin.username).equal('admin');
        fs.unlinkSync(testPath);
    });
    it("addUser(user) creates a new user", function(done) {
        this.timeout(10*1000);
        (async function() { try {
            var filePath = temp.path();
            var users = new UserStore({ filePath, });
            var user = {
                username: "test-user",
                password: "secret",
                isAdmin: true,
                isTranslator: true,
            };
            var result = await users.addUser(user);
            should(result).properties({
                username: "test-user",
                isAdmin: true,
                isTranslator: true,
            });
            should(result.password).equal(undefined);
            should(users.users).properties(["test-user"]);
            done();
        } catch(e) {done(e);} })();
    });
    it("authenticate(u,pw) validates username/password", function(done) {
        this.timeout(10*1000);
        (async function() { try {
            var filePath = temp.path();
            var users = new UserStore({ filePath, });
            var user = {
                username: "test",
                password: "secret",
                isAdmin: true,
                isTranslator: true,
            };
            var result = await users.addUser(user);
            var MIN_TIME = 1000; // ALL authentications take time

            // authenticate returns user
            var users2 = new UserStore({ filePath, });
            should(result.password).equal(undefined);
            var msStart = Date.now();
            var auth = await users2.authenticate("test", "secret");
            should(auth).properties({
                username: "test",
                isAdmin: true,
                isTranslator: true,
            });
            should(auth.password).equal(undefined);
            should(Date.now()-msStart).above(MIN_TIME);

            // wrong user
            var msStart = Date.now();
            var auth = await users2.authenticate("test-nobody", "secret");
            should(auth).equal(null);
            should(Date.now()-msStart).above(MIN_TIME);

            // wrong password
            var msStart = Date.now();
            var auth = await users2.authenticate("test", "wrongsecret");
            should(auth).equal(null);
            should(Date.now()-msStart).above(MIN_TIME);

            fs.unlinkSync(filePath);
            done();
        } catch(e) {done(e);} })();
    });
});

