module.exports = {
    name: 'ping',
    description: 'Ping del bot',
    guildOnly: false,
    cooldown: 2,
    execute(message, args) {
        message.channel.send(`Checking for ping...`).then(m => {
            var ping = m.createdTimestamp - message.createdTimestamp;
            m.edit(`Bot ping: ${ping}`);
            console.log(ping);
        });
    },
};