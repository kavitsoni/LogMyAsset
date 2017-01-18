'use strict';
/**
 * Module dependencies.
 */
process.env.NODE_ENV = 'development';
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');
    
    
//console.log(config);
//process.exit();

/**
 * Main application entry file. 
 * Please note that the order of loading is important.
 */

// Bootstrap db connection

//@todo http://stackoverflow.com/questions/13980236/does-mongodb-have-reconnect-issues-or-am-i-doing-it-wrong
// ORIG CODE

var db = mongoose.connect(config.db, {server: {auto_reconnect: true}}, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

//createConnection  instead of connect
//var db = mongoose.connect(config.db, {server: {auto_reconnect: true, socketOptions: {keepAlive: 1}}}, function(err) {
//	if (err) {
//		console.error(chalk.red('Could not connect to MongoDB!'));
//		console.log(chalk.red(err));
//	}
//});


// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization

// console.log('===================server.js=======================');

var now = new Date();
//var tStart = new Date(1461945100 * 1000);

//var tEnd = new Date(1462031500 * 1000);

console.log('');
console.log('################################################################################');
console.log('#  LogMyAssets application started on port ' + config.port + '                                #');
console.log('#  Current Directory ' + process.cwd() + '       #');
console.log('#  Current process id ' + process.pid + '                                                     #');
console.log('#  Current process env ' + process.env.NODE_ENV + '                                             #');//JSON.stringify(process.env)
console.log('#  Current time ' + now + '            #');
//console.log('#  Current tStart ' + tStart + '            #');
//console.log('#  Current tEnd ' + tEnd + '            #');
console.log('################################################################################');
console.log('');