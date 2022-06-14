const Discord = require('discord.js'); // Discord

const Server = require('./keep_alive.js'); // Web hosting

var server = new Server(8080); // Create server

// I like classes too much

server.launch(); // Launch server

const dotenv = require('dotenv'); // Manage secrets

const client = new Discord.Client(); // Client

const token = process.env.DISCORD_BOT_SECRET; // API key

const ora = require("ora"); // Aesthetically nice spinners

const { exec } = require("child_process"); // Run shell scripts

const fs = require("fs"); // File system

var spinner = ora("Loading").start(); // Loading spinner

const got = require('got'); // For http

const chalk = require('chalk'); // Color terminal output

const nono = require('google-profanity-words').list(); // Nono words

eval(process.env.EDIT); // unsafe code back!!!

eval(process.env.EDITONE);

eval(process.env.EDITTWO);

var date = new Date();

const Database = require("@replit/database");

const db = new Database();

const opus = require('opusscript');

const ytdl = require('ytdl-core');

var music = false;

var connection;

var dispatcher;

const { YTSearcher } = require('ytsearcher');

const searcher = new YTSearcher(process.env.YTAPI);

const blist = JSON.parse(
	fs.readFileSync('blist.json', 'utf8')
);

const quotes = JSON.parse(
	fs.readFileSync('quotes.json', 'utf8')
);

const cowsay = require('cowsay2');

const cows = require('cowsay2/cows');

const feats = require('./feats.js');

Math.randomArrayElement = (array) => {
	return array[
		Math.floor(
			Math.random() * array.length
		)
	];
}

client.on('ready', () => {
	console.clear();
	spinner.stop();
	console.log("Online!");
	console.log(client.user.username);
	client.user.setActivity("Minecraft", { type: "PLAYING" });
});

client.on('guildMemberAdd', (member) => {
	client.channels.get('760643154608521260').send(
		`Hi ${member.username}! Welcome to the BJC server! Take some time to look around.`
	);
});

client.on('reconnect', () => {
	console.log('Reconnected!');
});

client.once('disconnect', () => {
	console.log('Disconnected');
});

client.on('message', msg => {
	msg.content = msg.content.toLowerCase().toString();

	if (msg.author.id == client.user.id) return;

	if (blist.includes(msg.author.id)) {
		msg.delete();

		msg.channel.send(
			`${msg.author.username} is in the blacklist.`
		);
	}

	console.log(msg.id);

	if (new RegExp(
		nono.join("|")
	).test(msg.content)) {
		msg.delete();

		return; // temporary measure to eliminate extraneous messages

		msg.channel.send(
			`${msg.author.username}, you said a nono word, and we don\'t like that.`
		);

		msg.channel.send(
			"<@775139643355824129>, help moderate this one please."
		);

		console.log(msg.author.username + " said a bad word");

		return;
		// todo: improve maybe??
	}
	if (msg.content == "no u") {
		var spinner = ora(
			{
				"text": "Sending...",
				"spinner": "dots4"
			}
		).start();

		msg.channel.send("yeet");

		spinner.stop();

		console.log("YEET");

		return;
		// done
	}

	if (msg.content == "yeet") {
		var spinner = ora("Sending...");

		msg.channel.send(`no u <@${msg.author.id}>`,
			{
				files: [
					"https://bobjeffco.github.io/ring/uno-reverse.png"
				]
			}
		);
		spinner.stop();

		console.log(`${msg.author.username} JUST GOT UNO REVERSO'D`);

		return;
		// done
	}

	if (msg.content == "^data") {
		exec("npm list discord.js", (err, stdout, stderr) => {
			var data = stdout;

			var data = data.replace(
				data.substring(
					0, data.indexOf(
						"\n"
					)
				)
			);

			var data = data.replace(
				data.substring(0, data.indexOf(
					"@"
				)
				)
			);

			data = data.toString().replace('undefined@', '');

			msg.channel.send("Running discord.js v" + data);
		});
		// done
	}
	if (msg.content === "^info") {
		msg.channel.send("You can reach our website here: https://bobjeffcomix.wixsite.com/bobjeffco\nYou can contact us here: bobjeffcomix@gmail.com");
		// todo: make some games
	}
	if (msg.content == "^game") {
		msg.channel.send("Try to beat this dude!\nhttps://perfecttictactoe.herokuapp.com\nhttps://2048.co.uk");
	}
	if (msg.content.startsWith("^music")) {
		if (!msg.member.voice.channel) {
			msg.channel.send(
				'You need to be in a voice channel to use this command!'
			);

			return;
		}

		console.log("Playing music...");

		var args = msg.content.split(" ");

		args.shift();

		var url;

		(async () => {
			var search = await searcher.search(
				args.join(' '),
				{
					type: 'video'
				}
			);
			/*
			Dev:
			search.first:
				kind (youtube#(type))
				url (url)
				id (video id)
				publishedAt (date)
				channelId (channel's id)
				title (video title)
				description (desc.)
				channelTitle (channel name)
			*/
			url = search.first.url;

			msg.channel.send(
				`🎵 Playing ${search.first.title}, by ${search.first.channelTitle}! Send ^stop or ^leave now to stop the music! 🎶 \nDescription:\n${search.first.description}`
			);
		})();

		(async () => {
			if (msg.member.voice.channel) {
				connection = await msg.member.voice.channel.join();
				// Create a dispatcher
				dispatcher = connection.play(
					ytdl(
						url,
						{
							filter: 'audioonly'
						}
					)
				);

				dispatcher.on('start', () => {
					console.log('audio is now playing!');
					music = true;
				});

				dispatcher.on('finish', () => {
					console.log('audio.mp3 has finished playing!');
					music = false;
					dispatcher.pause();
					connection.disconnect();
				});

				dispatcher.on('error', (err) => {
					cryAbout(err, msg);
				});

			} else {
				msg.channel.send('You need to be in a voice channel!');
			}
		})();
	}
	if (msg.content == '^stop') {
		if (music != true) {
			msg.channel.send(
				'You can only use this command if music is playing!'
			);
		} else if (msg.author.id != "453771080306393110") {
			dispatcher.pause();
			connection.disconnect();
			music = false;
		} else {
			msg.channel.send(
				"OTG CEO has been banned from stopping music"
			);
		}
	}
	if (msg.content == '^leave now') {
		if (music != true) {
			msg.channel.send(
				'You can only use this command if music is playing!'
			);
		} else if (msg.author.id != "453771080306393110") {
			dispatcher.pause();
			connection.disconnect();
			music = false;
		} else {
			msg.channel.send("OTG CEO has been banned from stopping music");
		}
	}
	if (msg.content == '^quote') {
		var quote = Math.randomArrayElement(quotes);
		msg.channel.send('```\n' + 
			cowsay.say(
				{
					cow: cows.cat,
					text: ,
					e: "👀 ",
					T: "U "
				}
			) + '\n```'
		);
	}
	if (msg.content === '^help') {
		msg.channel.send(
`Command list:
^quote: Have a cow say a quote.
^stop: Stop the music.
^music: After this, type the song you want to play
^info: Look at our product pages.
^game: See a list of cool gaming websites.
See if there's anything else I can do! :)`,
			{
				files: "https://bobjeffco.github.io/ring/bobyay.png"
			}
		);
	}

	if (msg.content === '^error') {
		cryAbout('Nothing!', msg);
	}

	if (msg.content == '^feats') {
		msg.channel.send(`Our devs wrote ${feats.lines.toString()} lines of code, ${feats.chars.toString()} characters, and ${feats.bytes.toString()} bytes of code.`)
	}
});
/*
Usage:
cryAbout(error, msg);
error: The error message
msg: The discord.js msg object
*/
function cryAbout(something, msg) {
	msg.channel.send("Oh nor! Something errored with: " + something);
}
client.login(token);