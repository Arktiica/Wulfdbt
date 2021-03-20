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

/* Logs the bot login if it successfully logs in. Also sets status, so
feel free to change out the setActivity:
    'Status', {type: 'Type'}
Type is limited to:
    - Streaming
    - Listening
    - Watching
    - Playing               */
client.once('ready', () => {
    console.log('> Logged in successfully as ' + client.user.tag + '. <\n');
    client.user.setActivity(`to the distant howls`, { type: 'LISTENING'})
});

// Login with token, located in ./config.json.
client.login(token);



/* Don't forget you'll need the token if you copy the entire code include
the index. To get the token you'll need to go to https://discord.com/developers
and get the token for your bot. With this create a new file named: config.json and
input the following code:

{
    "token": "TOKEN_ID_HERE",
    "prefix": "DESIRED_PREFIX"
}

Note that the prefix will be "hard coded" and cannot be changed via discord with
what is all here.

Additional information for what you may need, how to get these,
or documentation for discord.js & JavaScript can be found in the following:
    https://discord.com/developers
    https://discordjs.guide/#before-you-begin
    https://discord.js.org/#/
    https://developer.mozilla.org/en-US/docs/Web/JavaScript
*/