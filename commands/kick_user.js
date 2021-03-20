module.exports = {
    name: "kick",
    description: "Kicks a user from the server",
    execute(message, client, args, prefix, errorColor) {
        const member = message.mentions.members.first(); // Mentioned User

        /* Error message for any invalid syntaxes when initiating the 
        command. If you do not want the error to be auto-deleted, remove
        or comment out everything in the ".then()" statement. */
        function errorMSG(msg) {
            let errorEmbed = {
                color: errorColor,
                description: msg,
            };
            message.channel.send({embed: errorEmbed}).then( msg => {
                msg.delete({timeout: 5000});
            });
            return;
        };

        /* Kick log which will send in #logs if it exists.
        If you want a "Kick" image for this embed, then replace IMAGE_LINK_HERE
        with the desired image link. Don't forget to uncomment. */
        function kickLog(user, reas) {
            let eKickLog = {
                color: "BLACK",
                title: "KICKED USER",
                author: {
                    name: message.guild.name,
                    icon_url: message.guild.iconURL({dynamic: true})
                },
                // thumbnail: {
                //     url: 'IMAGE_LINK_HERE'
                // },
                fields: [
                    {
                        name: "Username",
                        value: user,
                        inline: true,
                    },
                    {
                        name: "User ID",
                        value: user.id,
                        inline: true,
                    },
                    {
                        name: "Reason",
                        value: reas,
                    },
                    {
                        name: "Moderator",
                        value: message.author.username,
                    }
                ],
                timestamp: new Date(),
            }

            /* Sends the embed in #{channelName}. Default is set to #logs,
            where if it doesn't exists, log will not be sent. Feel free to
            replace 'logs' with any other desired channel name, but keep
            the type as 'text'. */
            let channel = message.guild.channels.cache.array();
            let logsChannel = channel.filter(c => c.name === 'logs' && c.type === 'text')[0];
            if (!logsChannel) {
                return;
            } else {
                logsChannel.send({embed: eKickLog});
            }
            return;
        };

        /* Validates whether or not the person initiating the command has permission 
        to use the command before actually proceeding to kick the user from the server. */

        if (message.member.hasPermission('KICK_MEMBERS' || 'ADMINISTRATOR') || message.author.id === message.guild.ownerID) {
            if (args[0] === '-h') { // Embed for how to use the kick command. <prefix>kick -h
                var eKickHelp = {
                    color: "WHITE",
                    title: "Kick Users - HELP",
                    description: "The mentioned user will be kicked from this guild. *Alternative:* Stating a user's ID will also be kicked.",
                    author: {
                        name: message.guild.name,
                        icon_url: message.guild.iconURL({dynamic: true}),
                    },
                    fields: [
                        {
                            name: "Syntax",
                            value: "```" + `${prefix}kick <@user> <reason>\n${prefix}kick <userID> <reason>` + "```"
                        },
                        {
                            name: "Example",
                            value: "```" + `${prefix}kick @user#1234 reason will go here.\n${prefix}kick 123456789012345678 reason will go here` + "```",
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: message.author.username + ` (${message.author.id})`,
                        icon_url: message.author.displayAvatarURL({dynamic: true}),
                    }
                }
                message.channel.send({embed: eKickHelp});
                return;
            } else if (member !== undefined) {
                message.delete({timeout: 7500}); // Deletes Command after 7.5s
                args.shift();
                var reason = args.join(" ");
                if (reason === "") {
                    var APIReason = null;
                    reason = "None"
                } else {
                    var APIReason = reason;
                };
                var msg = ":x: Error: kick was unsuccessful.";

                /* If you want the bot to not delete the "{member} was banned from...", 
                remove everything* in the .then() statement.
                *but don't delete "member.kick". */
                message.channel.send(`Kicked ${member} from ${message.guild.name}.`).then( m => {
                    m.delete({timeout: 7500}); // Deletes "Kicked {member} from..." after 7.5s
                },
                    member.kick([APIReason]).catch(
                        console.error() && message.channel.send({embed: errorMSG(msg)})
                    ),
                );
                kickLog(member, reason);

            /* Below allows the user mentioned to be banned in 2 ways:
            - Mention
            - User ID
            This ensures flexibility for silent bans, where in this
            bot, the "Silent Ban" doesn't send a message sending 
            "<member> was banned from..." */

            } else if (!member) { // Kick via ID
                var userID = args.shift();
                var msg = ":x: Error: unabled to find and kick this user.";
                message.guild.members.fetch(userID).then( reqUser => {
                    let reason = args.join(" ");
                    if (reason === "") {
                        var APIReason = null;
                        reason = "No reason provided.";
                    } else {
                        var APIReason = reason;
                    }
                    var msg = ':x: Error: kick was unsuccessful.'
                    reqUser.kick([APIReason]).catch(
                        console.error() && message.channel.send({embed: errorMSG(msg)})
                    );
                    kickLog(reqUser, reason);
                    return;
                }).catch(
                    console.error() && message.channel.send({embed: errorMSG(msg)})
                );
            }
        } else {
        /* If the user doesn't have sufficient permissions to use this command,
        the follow error message will be sent. */
        var msg = ":x: Error: you do not have permission to do this.";
        errorMSG(msg);
        return;
        }
    }
}