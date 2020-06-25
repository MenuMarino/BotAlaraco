module.exports = {
    name: 'grep',
    description: 'Prueba del stack en pintoes',
    guildOnly: false,
    execute(message, args) {
        console.log(`grep foo fuck you`);
        message.channel.send(`grep foo fuck you`);
    },
};