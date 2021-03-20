module.exports = {
    name: "ban",
    description: "Bans a user from the server.",
    execute(message, client, args, prefix, errorColor) {
        const member = message.mentions.members.first(); // Mention User
        
        /* Error message for any invalid syntaxes when initiating the 
        command. If you do not want the error to be auto-deleted, remove
        or comment out everything in the ".then()" statement. */
        function msgError(msgContent) {     
            let ErrorEmbed = {
                color: errorColor,
                description: msgContent,
            };
            message.channel.send({embed: ErrorEmbed}).then( msg => {
                msg.delete({timeout: 5000})
            });
            return;
        };

        /* Ban log. which will be sent in #logs if it exists.
        If you want a "Ban" image for this embed, then replace IMAGE_LINK_HERE 
        with the desired image link. Don't forget to uncomment. */
        function BanLog(user, reas) { // BAN LOG 
            let eBanLog = {
                color: "RED",
                title: "BANNED USER",
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
                logsChannel.send({embed: eBanLog});
            }
            
            return;
        };
        
        /* Validates whether or not the person initiating the command 
        has permission to use the command before  actually doing anything. */

        if (message.member.hasPermission('BAN_MEMBERS' || 'ADMINISTRATOR') || message.author.id === message.guild.ownerID) {
            if (args[0] === '-h') { // Embed for how to use the ban command. <prefix>kick -h
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
                        text: message.author.username + ` (${message.author.id})`,
                        icon_url: message.author.displayAvatarURL({dynamic: true}),
                    }
                }
                message.channel.send({embed: eBanHelp});
            } 

            /* Below allows the user mentioned to be banned in 2 ways:
                - Mention
                - User ID
                This ensures flexibility for silent bans, where in this
                bot, the "Silent Ban" doesn't send a message sending 
                "<member> was banned from..." */

            if (member !== undefined) {
                message.delete({timeout: 7500}); // Deletes Command after 7.5s
                args.shift();
                let reason = args.join(" ");
                if (reason === "") {
                    var APIReason = null
                    reason = "No reason provided."
                } else {
                    var APIReason = reason
                }
                
                /* If you want the bot to not delete the "{member} was banned from...", 
                remove everything from "m =>" to "}," in the .then() statement. */
                var errorMSG = ':x: Error: ban unsuccessful.'
                message.channel.send(`${message.guild.member(member)} was banned from ${message.guild.name}.`).then( m => {
                    m.delete({timeout: 7500}); // Deletes "{member} was banned from..." after 7.5s
                },
                    member.ban({reason: APIReason}).catch(
                        console.error() && message.channel.send({embed: msgError(errorMSG)})
                    )
                );
                BanLog(member, reason);                
                return;
            } else if (!member) { // Ban via ID
                var userID = args.shift();
                var errorMSG = ":x: Error: unable to find and ban this user."
                message.guild.members.fetch(userID).then(reqUser => {

                    /* This let and if/else just allows the reason to be put as 
                    the reason for the discord API, nothing special really. */
                    
                    let reason = args.join(" ");
                    if (reason === "") {
                        var APIReason = null;
                        reason = "No reason provided.";
                    } else {
                        var APIReason = reason;
                    }
                    var errorMSG = ':x: Error: ban unsuccessful.'
                    reqUser.ban({reason: APIReason}).catch(
                        console.error() && message.channel.send({embed: msgError(errorMSG)})
                    );
                    BanLog(reqUser, reason);
                    return;
                }).catch(msgError(errorMSG)) // If the ID isn't valid.
            }
        } else { 
        /* If the user doesn't have the sufficient permissions to use this command, 
        the following error message will be sent. */
            var errorMSG = ":x: Error: you do not have permission to do this.";
            msgError(errorMSG);
            return;
        }
    }
}
