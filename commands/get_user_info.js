const { GuildMember } = require('discord.js');
const moment = require('moment')
module.exports = {
    name: "user",
    description: "Displays information of the user mentioned.",
    execute(message, client, args, prefix, botColor) {
        let guildMember = message.mentions.users.first();
        if (guildMember === undefined) {
            if (message.guild.member(message.author).nickname !== null) {
                var nickname = message.guild.member(message.author).nickname
            } else {
                var nickname = "None"
            }
            var eUserInfo = {
                color: botColor,
                title: "Your User Info",
                thumbnail: {
                    url: message.author.displayAvatarURL({dynamic: true})
                },
                author: {
                    name: message.guild.name,
                    icon_url: message.guild.iconURL({dynamic: true})
                },
                fields: [
                    {
                        name: "Alias",
                        value: `<@${message.author.id}>`,
                        inline: true,
                    },
                    {
                        name: "Nickname",
                        value: nickname,
                        inline: true,
                    },
                    {
                        name: "User ID",
                        value: message.author.id,
                        inline: true,
                    },
                    {
                        name: "Is Bot?",
                        value: "No",
                        inline: true,
                    },
                    {
                        name: "Roles",
                        value: message.guild.member(message.author).roles.cache.map(role => `<@&${role.id}>`).join(" ").replace(` <@&${message.guild.id}>`, "")
                    },
                    {
                        name: "Account Created",
                        value: moment(message.author.createdAt).format('DD MMMM YYYY'),
                        inline: true,
                    },
                    {
                        name: "Account Joined",
                        value: moment(message.guild.member(message.author).joinedAt).format('DD MMMM YYYY'),
                        inline: true,
                    }
                ]
            }
            message.channel.send({embed: eUserInfo});
            return;
        } else {
            if (message.guild.member(message.mentions.users.first()).nickname !== null) {
                var nickname = message.guild.member(message.mentions.users.first()).nickname
            } else {
                var nickname = "None"
            }
            var eUserInfo = {
                color: botColor,
                title: message.mentions.users.first().username + "'s User Info",
                thumbnail: {
                    url: message.mentions.users.first().displayAvatarURL({dynamic: true})
                },
                author: {
                    name: message.guild.name,
                    icon_url: message.guild.iconURL({dynamic: true})
                },
                fields: [
                    {
                        name: "Alias",
                        value: `<@${message.mentions.users.first().id}>`,
                        inline: true,
                    },
                    {
                        name: "Nickname",
                        value: nickname,
                        inline: true,
                    },
                    {
                        name: "User ID",
                        value: message.mentions.users.first().id,
                        inline: true,
                    },
                    {
                        name: "Is Bot?",
                        value: "No",
                        inline: true,
                    },
                    {
                        name: "Roles",
                        value: message.guild.member(message.mentions.users.first().id).roles.cache.map(role => `<@&${role.id}>`).join(" ").replace(` <@&${message.guild.id}>`, "")
                    },
                    {
                        name: "Account Created",
                        value: moment(message.mentions.users.first().createdAt).format('DD MMMM YYYY'),
                        inline: true,
                    },
                    {
                        name: "Account Joined",
                        value: moment(message.guild.member(message.mentions.users.first()).joinedAt).format('DD MMMM YYYY'),
                        inline: true,
                    }
                ]
            }
            message.channel.send({embed: eUserInfo});
            return;
        }
    }
}