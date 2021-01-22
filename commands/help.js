module.exports = {
    name: "help",
    description: "General help for the bot.",
    execute(message, client, args, prefix, botColor) {
        var eHelp = {
            color: botColor,
            
            title: "Wulf",
            description: `General help for ${client.user.tag}.`,
            author: {
                name: message.guild.name,
                icon_url: message.guild.iconURL({dynamic: true}),
            },
            thumbnail: {
                url: client.user.displayAvatarURL({dynamic: true}),
            },
            fields: [
                {
                    name: "Prefix",
                    value: `\`\`\`${prefix}\`\`\``,
                    inline: true,
                },
                {
                    name: "Command Help",
                    value: `\`\`\`${prefix}commandName -h\`\`\``,
                    inline: true
                },
            ],
            timestamp: new Date(),
            footer: {
                text: message.author.username,
                icon_url: message.author.displayAvatarURL({dynamic: true})
            }
        }
        message.channel.send({embed: eHelp});
    }
}