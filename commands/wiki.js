const fetch = require("node-fetch");

module.exports = {
    name: 'wiki',
    description: 'Articulo de wikipedia. Primer argumento el lenguaje de la búsqueda (EN = inglés, ES = español, etc.). Los siguientes conforman el titulo.',
    guildOnly: false,
    cooldown: 2,
    execute(message, args) {
    	
    	if (args.length < 2) {
    		message.channel.send("Usa $help wiki. BELLACO");
    		return;
    	}
    	var lang = "https://" + args[0].toLowerCase();

    	var params = {
		    action: "query",
		    format: "json",
		    list: "random",
		    rnlimit: "5"
		};

    	var url1 = ".wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&prop=extracts&gsrsearch=";
    	var url2 = "&gsrlimit=5&exintro=1&explaintext=1&exlimit=50&exchars=2000";

    	var finalUrl = lang + url1;

    	// Titulo
    	for (var i = 1; i < args.length; ++i) {
    		finalUrl += args[i];
    		if (i != args.length - 1)
    			finalUrl += "%20";
    	}

    	finalUrl += url2;

    	console.log(finalUrl);

    	fetch(finalUrl)
		    .then(function(response){ return response.json();})
		    .then(function(response) {
		        var page = response.query.pages;
				let pageId = Object.keys(response.query.pages)[0];

		        for (var i = 0; i < 5; ++i) {
		        	let pageId = Object.keys(response.query.pages)[i];
		        	console.log(page[pageId].index);
		        	if (page[pageId].index == 1) {
		        		let content = page[pageId].extract;
		        		message.channel.send(content);
		        		break;
		        	}
		        }
		    })
		    .catch(function(error){
		    	message.channel.send("Hubo un error con tu consulta. (Probablemente el lenguaje)");
		    	message.channel.send("https://imgur.com/nYHZZbR");
		    	console.log(error);
		    });
	},
};