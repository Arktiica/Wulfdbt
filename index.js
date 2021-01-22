/*
        GENERAL INFORMATION
    ---------------------------
    Discord Bot:           Wulf
    Developer:        ArktisRäv
*/
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, botColor } = require('./config.json');

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
            client.commands.get(command).execute(message, client, args, prefix, botColor);
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