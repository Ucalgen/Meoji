const { prefixes } = require('../../../stuff//databases')

module.exports = {
    name: "prefix",
    aliases: [],
    run: async (bot, message, args) => { 
        await message.server.fetchMember(message)
        message.member.hasPermission('ManageServer') ? console.log(true) : console.log(false)
        // if (!args[0] && !message.member.hasPermission('ManageServer') || args[0] && !message.member.hasPermission('ManageServer') || !args[0]) {
        //    let prefix = await prefixes.get(`${message.server.id}`)
        //     if (!prefix) prefix = "m!"

        //    return message.reply(`The prefix for this server is **${prefix}**`)
        // }
    }
}