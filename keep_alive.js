const fs = require('fs');
const app = require('express')();
const fetch = require('node-fetch');
class Server {
	constructor(port) {
		this.port = port;
	}
	launch() {
		app.get('/', (req, res) => {
			res.set('Content-Type', 'text/html');
			res.send(fs.readFileSync('index.html', 'utf8'));
		});
		app.get('/style.css', (req, res) => {
			res.set('Content-Type', 'text/css');
			res.send(fs.readFileSync('style.css', 'utf8'));
		});
		app.get('/script.js', (req, res) => {
			res.set('Content-Type', 'text/javascript');
			res.send(fs.readFileSync('script.js', 'utf8'));
		});
		app.get('/season.js', (req, res) => {
			res.set('Content-Type', 'text/javascript');
			res.send(fs.readFileSync('season.js', 'utf8'));
		});
		app.listen(this.port, () => {});
	}
}
module.exports = Server;