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
            if (fs.existsSync(this.filePath)) {
                var text = fs.readFileSync(this.filePath).toString();
                this.users = JSON.parse(text);
            } else {
                this.users = Object.assign({}, {
                    admin: DEFAULT_USER,
                });
                var text = JSON.stringify(this.users, null, 4);
                fs.writeFileSync(this.filePath, text);
            }
        }

        addUser(user) {
            var that = this;
            return new Promise((resolve, reject) => { 
                (async function() { try {
                    user = Object.assign({}, user);
                    var username = user.username;
                    var password = user.password;
                    if (!!that.users[username]) {
                        reject(new Error(`Attempt to add existing user:${username}`));
                    }
                    user.credentials = await that.cred.hash(password);
                    delete user.password;
                    that.users[username] = user;
                    fs.writeFileSync(that.filePath, 
                        JSON.stringify(that.users,null,4));
                    resolve(user);
                } catch(e) {reject(e);} })();
            });
        }

        authenticate(username, password) {
            var that = this;
            return new Promise((resolve, reject) => { 
                (async function() { try {
                    username = username.toLowerCase();
                    var user = that.users[username];
                    var result =  user == null
                        ? await that.cred.verify(DEFAULT_USER.credentials, 'invalidpassword')
                        : await that.cred.verify(user.credentials, password);
                    logger.info(`authenticate(${username}) => ${result}`);
                    resolve(result ? user : null);
                } catch(e) {reject(e);} })();
            });
        }

    }

    module.exports = exports.UserStore = UserStore;
})(typeof exports === "object" ? exports : (exports = {}));

