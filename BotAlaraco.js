const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Estoy bellaco.');
});

//TODO: Cooldowns, YouTube, Spotify?, reaccionar a ciertas interacciones

client.on('message', message => {
    if (message.author.bot)
        return;
    
    //En caso alguien diga algo potencialmente alaraco.
    console.log(message.content)
    if (message.content.toLowerCase().includes('hola') || message.content.toLowerCase().includes('habla')){
        var answers = ['Habla ps chivo', 'No', 'En questas', 'Hola ps homoSEXual']
        var answer = answers[Math.floor(Math.random() * answers.length)];
        console.log(answer);
        message.channel.send(answer);
    }

    //Comandos
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // Si el comando es enviado en DM y solo es para servers
    if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('DMs no papi, quizás en un server');
	}

    if (!command) {
    	message.reply('Usa help oe cagada');
    	return;
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Hubo un error con tu mierda');
	}
});

client.login(token);
