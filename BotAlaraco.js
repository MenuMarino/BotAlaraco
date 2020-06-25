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

    if (message.content.toLowerCase().includes('$ano')) {
    	message.channel.send(`https://i.imgur.com/cpGwCdE.png\nhttps://i.imgur.com/cUbWo5Y.png\nhttps://i.imgur.com/6UHqMtD.png\nhttps://i.imgur.com/Mwyi2i5.png`)
    }

    if (message.content.toLowerCase().includes('$ping')) {
    	message.channel.send(`Ping ${client.latency * 1000} ms`)
    }

});

client.login(token);
