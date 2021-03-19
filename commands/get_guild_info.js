const { Guild } = require("discord.js")

module.exports = {
    name: 'guild',
    description: 'Guild information',
    execute(message, client, args, prefix, botColor) {
        if (message.guild.partnered === true) {
            var isDiscordPartner = "Yes"
        } else {
            var isDiscordPartner = "No"
        }
        var eGuildInfo = {
            color: botColor,
            title: message.guild.name + "Guild Info",
            thumbnail: {
                url: message.guild.iconURL({dynamic: true})
            },
            image: {
                url: message.guild.banner
            },
            fields: [
                {
                    name: "Member Count",
                    value: message.guild.memberCount /* + " / " + message.guild.maximumMembers */,
                    inline: true,
                },
                {   
                    name: "Partnered?",
                    value: isDiscordPartner,
                    inline: true,
                },
                {
                    name: "Owner",
                    value: `<@${message.guild.ownerID}>`,
                    inline: true,
                },
                {
                    name: "Text Channel Count",
                    value: message.guild.channels.cache.filter((c) => c.type === "text").size,
                    inline: true,
                },
                {
                    name: "Voice Channel Count",
                    value: message.guild.channels.cache.filter((c) => c.type === "voice").size,
                    inline: true,
                },
                {
                    name: "Region",
                    value: message.guild.region,
                },
            ]
        }
        message.channel.send({embed: eGuildInfo});
    }
}