const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Estoy bellaco.');
});

client.on('message', async message => {
    if (message.author.bot)
        return;
    
    console.log(message.content)
    if (message.content.toLowerCase().includes('hola') || message.content.toLowerCase().includes('habla')){
        message.channel.send(`hola ps homoSEXual.`)
    }

});

client.login(token);
