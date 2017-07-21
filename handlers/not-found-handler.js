var cons = require('consolidate');
var path = require('path');

module.exports = function (err, req, res, next) {
	if (req._err !== 404) return next(err);

	var tpl = path.resolve(__dirname, '../views/404.hbs');

	var data = {
		error: err,
		config: req._fedx.config,
		route: req._fedx.route,
		method: req.method,
		query: req.query,
		match: req._fedx.match
	};

	cons.handlebars(tpl, data, function (err, html) {
		res.status(404).send(html);
	});
};
