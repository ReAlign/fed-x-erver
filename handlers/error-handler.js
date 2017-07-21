var cons = require('consolidate');
var path = require('path');

module.exports = function (err, req, res, next) {
	var tpl = path.resolve(__dirname, '../views/error.hbs');

	var data = {
		error: err,
		route: req._fedx.route,
		method: req.method,
		query: req.query,
		match: req._fedx.match,
		config: req._fedx.config
	};

	cons.handlebars(tpl, data, function (err, html) {
		res.status(req._err || 500).send(html);
	});
};
