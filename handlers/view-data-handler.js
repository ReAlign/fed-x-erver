var DataSet = require('../libs/dataset');

module.exports = function (req, res, next) {
	var config = req._fedx.config;
	var match = req._fedx.match;

	var ds = new DataSet(config.mockFolder, config.mockExts);
	var data = {
		params: match.params,
		query: req.query,
		body: req.body
	};
	req._fedx.data = data = ds.get(match.file, data);

	if (data instanceof Error) {
		req._err = 500;
		return next(data);
	}

	if (data.$$header) {
		Object.keys(data.$$header).forEach(function (key) {
			res.setHeader(key, data.$$header[key]);
		});
	}

	if (data.$$delay >= 0) {
		req._fedx.delay = data.$$delay;
	}

	Object.keys(data).forEach(function (key) {
		if (key.match(/^\$\$/)) delete data[key];
	});

	next();
};
