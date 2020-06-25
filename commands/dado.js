module.exports = {
    name: 'dado',
    aliases: ['dice', 'renom'],
    description: 'Tira un dado de 6 caras. (Puedes pasar un argumento y seran las caras del dado)',
    execute(message, args) {
        if (args.length === 1) {
            var answer = Math.floor(Math.random() * args[0]) + 1;
            console.log(answer);
            message.channel.send(answer);
        } else {
            var answer = Math.floor(Math.random() * 6) + 1;
            console.log(answer);
            message.channel.send(answer);
        }
    },
};