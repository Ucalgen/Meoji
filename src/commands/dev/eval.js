const { MessageEmbed } = require('revolt.js')
const beautify = require('beautify')

module.exports = {
    name: "eval",
    aliases: ["e"],
    run: async (bot, message, args) => {
        try {
            if(args.join(" ").toLowerCase().includes("token")){
                return;
            }
            const toEval = args.join(" ");
            const evaluated = eval(toEval);

            message.channel.sendMessage({
                embeds: [{
                    colour: "#00FF00",
                    title: "Eval",
                    description: `
                    Input:\n \`\`\`js
                    ${beautify(args.join(" "), {format: "js" })}\n\`\`\`\n
                    Evaulated: ${evaluated}\n
                    Type: ${typeof (evaluated)}
                    `
                }]
            })                
        } catch (e) {
            // let embed = new MessageEmbed()
            //     .setColor("#FF0000")
            //     .setTitle ("\:x: Error!")
            //     .setDescription(e)
            //     .setFooter(client.user.username, client.user.displayAvatarURL);



            // message.channel.send(embed);

            console.log(e)
        }
    }
}