const fetch = require("node-fetch");

// Solo funciona con un argumento como titulo, arreglarlo

module.exports = {
    name: 'wiki',
    description: 'Articulo de wikipedia. Primer argumento (EN o ES) el lenguaje de la busqueda. Los siguientes son el titulo.',
    guildOnly: false,
    cooldown: 2,
    execute(message, args) {
    	
    	if (args.length < 2) {
    		message.channel.send("Usa $help wiki. BELLACO");
    		return;
    	}
    	var lang = "";

    	if (args[0].toLowerCase() == 'en') {
    		lang += "https://en.";
    	} else if (args[0].toLowerCase() == 'es') {
    		lang += "https://es.";
    	} else {
    		message.channel.send("Solo funciona EN y ES ps bellaco no soy poliglota.");
    	}

    	var params = {
		    action: "query",
		    format: "json",
		    list: "random",
		    rnlimit: "5"
		};

    	var url1 = "wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&prop=extracts&gsrsearch=";
    	var url2 = "&gsrlimit=5&exintro=1&explaintext=1&exlimit=50";

    	var finalUrl = lang + url1 + args[1] + url2;

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
		    .catch(function(error){console.log(error);});

    	/*
    	var url = "https://en.wikipedia.org/w/api.php"; 

		var params = {
		    action: "query",
		    format: "json",
		    list: "random",
		    rnlimit: "5"
		};

		url = url + "?origin=*";
		Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

		console.log(url);
    	console.log("BELLACO");

		fetch(url)
		    .then(function(response){ return response.json();})
		    .then(function(response) {
		        var randoms = response.query.random;
		        message.channel.send(randoms[0].title);
		        for (var r in randoms) {
		            console.log(randoms[r].title);
		        }
		    })
		    .catch(function(error){console.log(error);});
		*/
	},
};