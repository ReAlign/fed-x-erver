var path = require('path');
var request = require('request');
var utils = require('../libs/utils');
var DataSet = require('../libs/dataset');
var lrScript = require('../libs/lr-script');

module.exports = function (req, res, next) {
	var config = req._fedx.config;
	var match = req._fedx.match;

	if (!utils.contains(['.jsp', '.vm'], path.extname(match.file)))
		return next();

	if (!config.enableJava) {
		req._err = 500;
		return next(new Error('Please enable Java support in your fedx-config.js file.'));
	}

	var formData = {
		template: match.file.slice(0, 1) === '/' ? match.file : '/' + match.file,
		data: JSON.stringify(req._fedx.data)
	};
	var url = 'http://localhost:' + config.javaServerPort + '/render?' + utils.serialize(req.query);

	request.post(url, {form: formData}, function (err, response, body) {
		if (err) return next(err);

		if (config.livereload) {
			body = lrScript.getInjectHtml(body, config.livereloadPort);
		}

		setTimeout(function () {
			res.status(response.statusCode);
			res.setHeader('Content-Type', 'text/html');
			res.write(body);
			res.end();
		}, req._fedx.delay);
	});
};
