module.exports = {
    name: 'ayuda',
    description: 'Preguntale al bot, el lo sabe todo',
    guildOnly: false,
    cooldown: 2,
    execute(message, args) {
        if (args.length === 0) {
            console.log('No pregunta');
            message.channel.send(`Cual es tu pregunta oe s**ano**`);
            return;
        }
        var answers = ['Si', 'No', 'Espero que no', 'Espero que si', 'A mi que chucha', 'XD'];
        var answer = answers[Math.floor(Math.random() * answers.length)];
        console.log(answer);
        message.channel.send(answer);
    },
};