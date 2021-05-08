module.exports = {
    name: "echo",
    execute(message, client, args, prefix) {
        message.delete();                                                               // Deletes the command upon sending it.
        if (message.author.id !== message.guild.ownerID)                                // Only allows the guild owner to echo messages across the guild's text channels.
            return; 
        const getChannel = message.content.match(/<#[0-9]{18}>/);                       // Gets the channel mentioned in the message.
        let filterChannelID = getChannel[0].split("");                                  // Filters the ID.
        let channelID = filterChannelID.filter(e => !isNaN(e)).join("");                //     "    "

        function errorMessage(m) {
            let errorMessage = {
                color: "RED",
                description: "``` :x: " + m + "```",
            };
            message.channel.send({ embed: errorMessage });
            return;
        }

        args.splice(0, 1);                                                              // Remove one item at position 0 in args array =>   args.splice(starting_position, how_many_items)
        const requestedChannel = message.guild.channels.cache.get(channelID);
        if (requestedChannel === undefined) errorMessage("Channel does not exist!");    // If the channel does not exist, error message will be sent.
        else requestedChannel.send(args.join(" "));                                     // Message will be sent in channel which was mentioned
    }
}