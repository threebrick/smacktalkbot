//Add your requirements below
var restify = require('restify');
var builder = require('botbuilder');

//var appId = process.env.MY_APP_ID || "dd0a4eb6-9324-4d4a-9251-da27f780a679";
//var appSecret = process.env.MY_APP_SECRET || "QcAK5MpmPiAXD2mqp1MSZ4c";

var appId = null;
var appSecret = null;

// Create bot and add dialogs
var bot = new builder.BotConnectorBot
({appId: process.env.MY_APP_ID, appSecret: process.env.MY_APP_SECRET});
bot.add('/', new builder.SimpleDialog( function (session) {
session.send('Hello World');
}));

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3000, function () {
console.log('%s listening to %s', server.name, server.url);
});

server.get('/', restify.serveStatic({
    directory: __dirname,
    default: '/index.html'
})

);