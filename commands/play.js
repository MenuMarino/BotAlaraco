const ytdl = require('ytdl-core');

module.exports = {
    //TODO: arreglar el delay, hacer que busque en youtube y entre al primer video
    name: 'play',
    description: 'Reproduce una video de youtube.',
    guildOnly: true,
    cooldown: 2,
    execute(message, args) {
        if (message.channel.type !== 'text') {
            return;
        }

        if (args.length === 0) {
            message.channel.send('Se necesita un link ps bellaco');
            return;
        }

        const voiceChannel = message.member.voice.channel;
    
        if (!voiceChannel) {
            return message.reply('Unete a un canal de voz oe');
        }
    
        voiceChannel.join().then(connection => {
            const stream = ytdl(args[0], { filter: 'audioonly' });
            const dispatcher = connection.play(stream);

            dispatcher.on('end', () => voiceChannel.leave());
        });
    },
};