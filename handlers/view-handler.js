var DataSet = require('../libs/dataset');
var lrScript = require('../libs/lr-script');

module.exports = function (req, res, next) {
	var match = req._fedx.match;
	var config = req._fedx.config;

	res.render(match.file, req._fedx.data, function (err, html) {
		if (err) return next(err);

		if (config.livereload) {
			html = lrScript.getInjectHtml(html, config.livereloadPort);
		}

		setTimeout(function () {
			res.send(html);
		}, req._fedx.delay);
	});

};
