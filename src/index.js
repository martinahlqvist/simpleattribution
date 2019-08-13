(function () {
	'use strict';
	var router = require('router'),
		appData = require('appData'),
		preCheck = function (value) {
			if (value === null || value === undefined) {
				value = "";
			}
			return (value);
		};

	router.get('/', function (req, res) {
		var mergedOptions = "";

		var checkboxOptions = appData.get('option');
		if(checkboxOptions === null || checkboxOptions === undefined || checkboxOptions === "") {
			checkboxOptions = ["by"," "];
		}

		
		var i=0;

		if(typeof checkboxOptions === 'object') {
		for(i=0;i<checkboxOptions.length;i++) {
			mergedOptions += checkboxOptions[i] + " ";
		}
	} else {
		mergedOptions += checkboxOptions;
	}
		mergedOptions = mergedOptions.trim();
		
		var urlOptions = mergedOptions.split(' ').join('-');

		var ccUrl = "https://creativecommons.org/licenses/"+urlOptions+"/"+preCheck(appData.get('version'))+"/";

		var data = {
			license: preCheck(appData.get('license')),
			name: preCheck(appData.get('name')),
			url: preCheck(appData.get('url')),
			version: preCheck(appData.get('version')),
			option: preCheck(appData.get('option')),
			mergedOptions: mergedOptions,
			reference: preCheck(appData.get('reference')),
			retract: preCheck(appData.get('retract')),
			ccUrl: ccUrl
		};


		res.render('/', data);
	});
}());