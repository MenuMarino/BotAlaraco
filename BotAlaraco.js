const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Estoy bellaco.');
});

console.log('Bellaqueo');

/* TODO:
	YouTube texto
	Spotify
	Bug al reaccionar a ciertos comentarios
	Comando $hydra "arg1" "arg2" "arg3" (Enviar a hydra esos args y que los reproduzca)
	I NEED MORE IDEAS
*/
client.on('message', message => {
    if (message.author.bot || message.channel.name === 'hydra-song-requests' || message.channel.name === 'pancake')
        return;

    //En caso alguien diga algo potencialmente alaraco.
    console.log(message.content)
    if (!message.content.startsWith('$')) {
        var m = message.content.toLowerCase();
        if (m.includes('hola') || m.includes('habla') || m == 'oe'){
            var answers = ['Habla ps chivo', 'En questas', 'Hola ps homoSEXual']
            var answer = answers[Math.floor(Math.random() * answers.length)];
            console.log(answer);
            message.channel.send(answer);
        } else if (m.includes('big mac') || m.includes('bigmac')) {
            message.react('🍔')
                .then(console.log)
                .catch(console.error);
            message.channel.send('Ese alaraco');
        }

        if (m.includes('linasty')) {
            message.react('💦')
                .then( () => message.react('🧦') )
                .then(console.log)
                .catch(console.error);
        }

        if (m.includes('alaraco')) {
            message.react('🇦🇱')
                .then(console.log)
                .catch(console.error);
        }
    }

    //Comandos
    //Si llega hasta aqui, el texto DEBE empezar con $
    if (!message.content.startsWith('$')) {
        return;
    }

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
    	message.reply('Usa help oe cagada');
    	return;
	}

    // Si el comando es enviado en DM y solo es para servers
    if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('DMs no papi, quizás en un server');
	}

    //Cooldown stuff
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Espera p bellaco. (Tiempo restante ${timeLeft.toFixed(1)})`);
            }
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    //Cooldown end

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Hubo un error con tu mierda');
	}
});

client.login(token);
