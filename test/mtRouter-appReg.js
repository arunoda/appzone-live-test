var MtRouter = require('mtRouter');
var horaa = require('horaa');
var appzone = horaa('appzone');
var nodemock = require('nodemock');
var request = require('request');

exports.testRouteDeregister= function(test) {
	
	var appCode = '45445';
	var appUrl = 'http://dfdfdgdg.com';

	var sendSmsMock = nodemock.mock('sendSms').fail();
	appzone.hijack('sender', function() {

		return sendSmsMock;
	});

	var modelMock = nodemock.mock('registerAppCode').takes(appCode, appUrl, function() {}).calls(2, [null]);
	var mtRouter = new MtRouter({}, 8092, modelMock);

	request({
		method: 'POST',
		uri: 'http://localhost:8092/code/' + appCode,
		body: JSON.stringify({url: appUrl}),
		headers: {'Content-Type': 'application/json'}
	}, function(error, response, data) {
		
		mtRouter.close();
		test.ok(!error);
		test.equal(response.statusCode, 200);
		test.deepEqual(JSON.parse(data), {success: true});

		test.ok(sendSmsMock.assert());
		test.ok(modelMock.assert());
		test.done();

		appzone.restore('sender');
	});

};

exports.testRouteDeregisterError= function(test) {
	
	var appCode = '45445';
	var appUrl = 'http://dfdfdgdg.com';

	var sendSmsMock = nodemock.mock('sendSms').fail();
	appzone.hijack('sender', function() {

		return sendSmsMock;
	});

	var modelError = {code: 540, message: "bad"};
	var modelMock = nodemock.mock('registerAppCode').takes(appCode, appUrl, function() {}).calls(2, [modelError]);
	var mtRouter = new MtRouter({}, 8092, modelMock);

	request({
		method: 'POST',
		uri: 'http://localhost:8092/code/' + appCode,
		body: JSON.stringify({url: appUrl}),
		headers: {'Content-Type': 'application/json'}
	}, function(error, response, data) {
		
		test.ok(!error);
		test.equal(response.statusCode, 500);
		test.deepEqual(JSON.parse(data), modelError);

		test.ok(sendSmsMock.assert());
		test.ok(modelMock.assert());
		test.done();

		appzone.restore('sender');
	});

};
