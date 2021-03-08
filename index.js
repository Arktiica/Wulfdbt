const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, errorColor } = require('./config.json');

/* 

config.json stores the bot's token, prefix, and an error color. If you do not have config.json
you will want to create it and put in the following code. If you do have the file, you may need
to add a few things.

CODE TO ADD:
{
    "prefix": "PREFIX_OF_CHOICE",
    "token": "56_CHAR_TOKEN",
    "error_color": "#d92d43"
} 

*/

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandfiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandfiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Message Overwatch
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Dynamic Command Execution, allowing ./commands to be each and every command.
    if (!client.commands.has(command)) return;
        try {
            client.commands.get(command).execute(message, client, args, prefix, errorColor);
        } catch (error) {
            console.error('\n' + error + '\n')
        }
});

// Activation & Activity
client.once('ready', () => {
    console.log('> Logged in successfully as ' + client.user.tag + '. <\n');
    client.user.setActivity(`the distant howls.`, { type: 'LISTENING'})
});

// Login, token = ./config.json
client.login(token);