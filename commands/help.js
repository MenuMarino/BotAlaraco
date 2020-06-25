const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Todos los comandos',
    guildOnly: false,
    cooldown: 2,
	aliases: ['commands'],
	execute(message, args) {
		const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Comandos disponibles:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nPuedes enviar \`${prefix}help [command name]\` para saber mas`);

            return message.channel.send(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        
        if (!command) {
            return message.reply('No sabes leer/escribir ctm');
        }
        
        data.push(`**Name:** ${command.name}`);
        
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        
        message.channel.send(data, { split: true });

	},
};