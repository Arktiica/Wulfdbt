const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, errorColor } = require('./config.json'); // A config.json file will have to be created with "Prefix" & "Token"

const client = new Discord.Client();
client.commands = new Discord.Collection();

/* './commands' is to split all the commands into individual files
to prevent an obnoxiously long 'if..else if' chain. Creating another 
command, a new .js file will need to be created in './commands' */

const commandfiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandfiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Listen for messages.
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

// Activation & Activity -- Console logs a "login message"
client.once('ready', () => {
    console.log('> Logged in successfully as ' + client.user.tag + '. <\n');
    client.user.setActivity(`the distant howls.`, { type: 'LISTENING'})
});

// Login with token, located in ./config.json.
client.login(token);
