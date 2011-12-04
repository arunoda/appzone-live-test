var appzone = require('appzone');
var logger = require('winstoon').createLogger('mtRouter');
var request = require('request');
var express = require('express');
/**
	mtRouter will take the MT's commig from the app and route them to registered phone(s)
*/

module.exports = MtRouter;

/**
	@param port - where MO router should start
	@param model - model
*/
function MtRouter(appzoneConfig, port, model) {
	
	var sender = appzone.sender(appzoneConfig.url, appzoneConfig.appId, appzoneConfig.password);

	var app = express.createServer();
	app.listen(port);
	app.use(express.bodyParser());

	//register the appCode
	app.post('/code/', function(req, res) {
		
		var appCode = guidGenerator();
		var url = (req.body)? req.body.url : null;

		logger.info('registering app', {appCode: appCode, appUrl: url});
		model.registerAppCode(appCode, url, function(err) {
			
			if(!err) {
				sendSuccess(res, {code: appCode});
			} else {
				sendError(res, err);
			}
		});
	});

	//start the simulator functionalities
	// app.post

	this.close = function close() {
		app.close();	
	};
}

function sendError(res, err) {
		
	res.send(JSON.stringify({
		code: err.code, 
		message: err.message,
	}), 500);
}

function sendSuccess(res, values) {
	
	values = (values)? values: {success: true};
	res.contentType('application/json');
	res.send(JSON.stringify(values));
}

function guidGenerator() {
	var S4 = function() {
		return (((1+new Date().getTime() + Math.random())*0x10000)|0).toString(32).substring(1);
	};
	return (S4());
}