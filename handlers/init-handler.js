var Router = require('../libs/router');
var path = require('path');
var fs = require('fs');

module.exports = function (config) {
	var router = new Router(config.routeFile);

	return function (req, res, next) {
		var route = '/' + req.params.pattern;
		var match = router.search(route, req.method);

		req._fedx = {
			route: route,
			match: match,
			config: config,
			delay: 0,
			data: null
		};

		try {
			if (!match)
				throw new Error('No route defined in: ' + config.routeFile);

			if (match.searchType !== 'url') {
				var filePath = match.searchType === 'mock' ? config.mockFolder : config.viewFolder;
				file = path.resolve(filePath, match.file);

				if (!fs.existsSync(file))
					throw new Error('Template file: ' + file + ' is not found');
			}

			next();
		} catch(e) {
			req._err = 404;
			next(e);
		}
	};
};
