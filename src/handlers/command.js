const {
    readdirSync,
    copyFileSync
} = require('fs')
const ascii = require('ascii-table')
const {
    path
} = require('../index')


let table = new ascii("Commands")
table.setHeading("Command", "Status")

module.exports = bot => {
    readdirSync(`${path}/src/commands/`).forEach(dir => {
        const commands = readdirSync(`${path}/src/commands/${dir}/`).filter(file => file.endsWith('.js'));

        for (let file of commands) {
            let pull = require(`${path}/src/commands/${dir}/${file}`)

            if (pull.name) {
                bot.commands.set(pull.name, pull)
                table.addRow(file, '✅')
            } else {
                table.addRow(file, '❌')
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name));
        }
    })
    console.log(table.toString());
}