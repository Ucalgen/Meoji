const { prefixes } = require('../../../stuff//databases')

module.exports = {
    name: "prefix",
    aliases: [],
    run: async (bot, message, args) => { 
        if (!args[0] && !message.member.hasPermission(message.server, 'ManageServer') || args[0] && !message.member.hasPermission(message.server, 'ManageServer') || !args[0]) {
           let prefix = await prefixes.get(`${message.server.id}`)
            if (!prefix) prefix = "m!"

           return message.reply(`The prefix for this server is **${prefix}**`)
        } else if (args[0] && isNaN()) {
            
        }
    }
}