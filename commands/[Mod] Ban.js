module.exports = {
    name: "ban",
    description: "Bans a user from the server.",
    execute(message, client, args, prefix, errorColor) {
        let member = message.mentions.members.first();

        function msgError(msgContent) {     // For ease in making a bunch of error responses, this function just makes it all so much easier.
            let ErrorEmbed = {
                color: errorColor,
                description: msgContent,
            }
            message.channel.send({embed: ErrorEmbed}).then( msg => {
                msg.delete({timeout: 5000})
            });
            return;
        };

        function eBanLog(logContent) {
            let eBanLog = {
                color: "RED",
                author: {
                    name: message.guild.name,
                    icon_url: message.guild.iconURL({dynamic: true})
                },
                title: "BANNED USER",
                fields: [
                    {
                        name: "Username",
                        value: ,
                        inline: true,
                    },
                    {
                        name: "User ID",
                        value: ,
                        inline: true,
                    },
                    {
                        name: "Moderator",
                        value: ,
                    }
                ]
            }
        }

        if (message.member.hasPermission('BAN_MEMBERS' || 'ADMINISTRATOR') || message.author.id === message.guild.ownerID) {    // Validates whether or not the person initiating the command has permission to use the command.
            if (args[0] === '-h') {
                var eBanHelp = {
                    color: "WHITE",
                    title: "Ban Users - HELP",
                    description: "The mentioned user will be banned from the guild. *Alternative:* Stating a user's ID will also be banned.",
                    author: {
                        name: message.guild.name,
                        icon_url: message.guild.iconURL({dynamic: true}),
                    },
                    fields: [
                        {
                            name: "Syntax",
                            value: "```" + `${prefix}ban <@user> <reason>\n${prefix}ban <userID> <reason>` + "```"
                        },
                        {
                            name: "Example",
                            value: "```" + `${prefix}ban @user#1234 reason will go here.\n${prefix}ban 123456789012345678 reason will go here` + "```",
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: message.author.username + `(${message.author.id})`,
                        icon_url: message.author.displayAvatarURL({dynamic: true}),
                    }
                }
                message.channel.send({embed: eBanHelp});
            } else if (!member) {
                var error_msg = ":x: Syntax Error: a user was not mentioned."
                msgError(error_msg); // Calls function
            } else {

            }
        } else {
            var error_msg = ":x: Error: you do not have permission to do this.";
            msgError(error_msg); // Calls function
        }
    }
}