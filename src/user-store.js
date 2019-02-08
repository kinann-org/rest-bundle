(function(exports) {
    const fs = require('fs');
    const path = require('path');
    const cred = require('credential')();
    const logger = require('./logger');
    const USERS_PATH = path.join(process.cwd(), 'local', 'users.json');
    const DEFAULT_USER = {
        username: "admin",
        credentials: '{"hash":"13YYGuRGjiQad/G1+MOOmxmLC/1znGYBcHWh2vUgkdq7kzTAZ6dk76S3zpP0OwZq1eofgUUJ2kq45+TxOx5tvvag","salt":"Qf1NbN3Jblo8sCL9bo32yFmwiApHSeRkr3QOJZu3KJ0Q8hbWMXAaHdoQLUWceW83tOS0jN4tuUXqWQWCH2lNCx0S","keyLength":66,"hashMethod":"pbkdf2","iterations":748406}',
    }

    class UserStore { 
        constructor(opts={}) {
            this.filePath = opts.filePath || USERS_PATH;
            this.cred = opts.cred || cred;
            var _users = {};
            if (opts.users) {
                _users = opts.users;
            } else if (fs.existsSync(this.filePath)) {
                var text = fs.readFileSync(this.filePath).toString();
                _users = JSON.parse(text);
                var text = JSON.stringify(_users, null, 4);
                fs.writeFileSync(this.filePath, text);
            } else {
                if (opts.defaultUser) {
                    if (opts.defaultUser.credentials == null) {
                        throw new Error(`default user must have credentials`);
                    } 
                    var username = opts.defaultUser.username.toLowerCase();
                    _users = Object.assign({}, {
                        [username]: Object.assign({
                            dateAdded: new Date(),
                        }, opts.defaultUser || DEFAULT_USER),
                    });
                } else {
                    _users = {};
                }
                var text = JSON.stringify(_users, null, 4);
                fs.writeFileSync(this.filePath, text);
            }
            Object.defineProperty(this, "_users", {
                value: _users,
            });
        }

        hash(password) {
            return cred.hash(password);
        }

        userInfo(username) {
            var user = this._users[username];
            if (user) {
                user = JSON.parse(JSON.stringify(user));
                delete user.credentials;
            }

            return user || null;
        }

        users() {
            var result = {};
            Object.keys(this._users).map(k => {
                result[k] = this.userInfo(k);
            });
            return result;
        }

        deleteUser(username) {
            var that = this;
            return new Promise((resolve, reject) => { 
                (async function() { try {
                    var userinfo = that.userInfo(username);
                    if (userinfo == null) {
                        throw new Error(`Invalid username:${username}`);
                    }
                    delete that._users[username];
                    fs.writeFileSync(that.filePath, 
                        JSON.stringify(that._users, null, 4));
                    resolve(userinfo);
                } catch(e) {reject(e);} })();
            });
        }

        setPassword(username, password) {
            var that = this;
            return new Promise((resolve, reject) => { 
                (async function() { try {
                    var user = that._users[username];
                    if (user == null) {
                        throw new Error(`Invalid username:${username}`);
                    }
                    user.dateSetPassword = new Date();
                    user.credentials = await that.cred.hash(password);
                    fs.writeFileSync(that.filePath, 
                        JSON.stringify(that._users, null, 4));
                    resolve(that.userInfo(username));
                } catch(e) {reject(e);} })();
            });
        }

        addUser(user) {
            var that = this;
            return new Promise((resolve, reject) => { 
                (async function() { try {
                    user = Object.assign({}, user);
                    user.dateAdded = new Date();
                    var username = user.username;
                    var password = user.password;
                    delete user.password;
                    if (!!that._users[username]) {
                        reject(new Error(`Attempt to add existing user:${username}`));
                    }
                    that._users[username] = user;
                    var result = await that.setPassword(username, password);
                    resolve(result);
                } catch(e) {reject(e);} })();
            });
        }

        authenticate(username, password) {
            var that = this;
            return new Promise((resolve, reject) => { 
                (async function() { try {
                    username = username.toLowerCase();
                    var user = that._users[username];
                    var result = null;
                    if (user) {
                        result = await that.cred.verify(user.credentials, password);
                        user.dateAuthenticated = new Date();
                    } else {
                        var credentials = DEFAULT_USER.credentials;
                        await that.cred.verify(credentials, 'invalidpassword');
                    }
                    var userinfo = that.userInfo(username);
                    logger.debug(`UserStore.authenticate(${username}) => ${JSON.stringify(userinfo)}`);
                    resolve(userinfo);
                } catch(e) {reject(e);} })();
            });
        }

    }

    module.exports = exports.UserStore = UserStore;
})(typeof exports === "object" ? exports : (exports = {}));

