const {
    Client
} = require('revolt.js');
const fs = require('fs')
const json = require('../stuff/config.json');
const {
    prefixes
} = require('../stuff/databases')

let bot = new Client();
bot.commands = new Map();
bot.aliases = new Map();

const map = new Map();
map.set('path', process.cwd())
const path = map.get('path')

module.exports = {
    bot,
    path
}

require(`./handlers/command.js`)(bot)

bot.on('ready', async () => {
    console.info(`Logged in as ${bot.user.username}\nID: ${bot.user.id}`)
})

bot.on("messageCreate", async message => {

    let serverprefix = await prefixes.get(`${message.server.id}`)
    let prefix

    if (serverprefix) {
        prefix = serverprefix
    } else prefix = 'm!'

    if (message.author.bot) return;
    if (message.channel.type === 'DirectMessage') return;
    if (!message.server) return;

    if (message.mentionIds) {
        let msgsplit = message.content.split(/ +/)
        if (message.mentionIds.includes(bot.user.id) && bot.commands.has(msgsplit[1])) {
            prefix = `<@${bot.user.id}>`
        } else {
            if (!message.content.startsWith(prefix)) {
                let msgsplit = message.content.split(/ +/)
                if (message.mentionIds.includes(bot.user.id) && !msgsplit[1]) {
                    return message.reply({
                        content: `This server's prefix is **${prefix}**`
                    })
                } else return;
            }
        }
    }

    if (!message.content.startsWith(prefix)) return;
    if (!message.member) {
        message.member = await message.server.fetchMember(message)
    }

    const args = message.content.toLowerCase()
        .slice(prefix.length)
        .trim()
        .split(/ +/)
    const cmd = args.shift().toLowerCase()

    if (cmd.length === 0) return;
    let command = bot.commands.get(cmd)
    if (!command) {
        if (bot.aliases.get(cmd)) {
            command = bot.aliases.get(cmd)
            command = bot.commands.get(command)
        } else return;
    }

    if (command) {
        fs.readdirSync(`${path}/src/commands/`).forEach(dir => {
            let commands
            commands = fs.readdirSync(`${path}/src/commands/${dir}/`).filter(file =>
                file.endsWith('.js'))

            for (let file of commands) {
                let pull = require(`./commands/${dir}/${file}`)
                if (pull.name === command.name) {
                    if (dir === 'dev') {
                        if (!json.developers.includes(message.author.id)) {
                            return;
                        }
                    }
                    command.run(bot, message, args)
                }
            }
        })
    }
})

bot.loginBot(json.token);