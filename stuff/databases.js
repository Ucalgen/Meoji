const Keyv = require('@keyvhq/core')

const {
    prefix_string,
    money_string,
    bank_string,
    user_data_string,
    server_settings_string,
    temp_string
} = require('./config.json')

// let path;

// if (process.cwd().split('\\')[0] == 'C:') {
//     path = process.cwd()
// } else {
//     path = '/home/container/'
// }

module.exports = {
    prefixes: new Keyv({ store: new Keyv(prefix_string)}),
    money: new Keyv({store: new Keyv(money_string)}),
    bank: new Keyv({store: new Keyv(bank_string)}),
    data: new Keyv({store: new Keyv(user_data_string)}),
    settings: new Keyv({store: new Keyv(server_settings_string)}),
    temp: new Keyv({store: new Keyv(temp_string)})
    // path: path
}