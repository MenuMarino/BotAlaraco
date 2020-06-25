module.exports = {
    name: 'moneda',
    description: 'Tira una moneda',
    execute(message, args) {
        var answers = ['Cara', 'Sello'];
        var answer = answers[Math.floor(Math.random() * answers.length)];
        console.log(answer);
        message.channel.send(answer);
    },
};