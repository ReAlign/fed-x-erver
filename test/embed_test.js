var should = require('should');
var fedx = require('../index');

describe('Embed Server', function () {
	var server;

	before(function () {
		server = fedx({enableJava: false});
	});

	it('should return a server object', function () {
		server.should.be.a.Function();
	});
});
