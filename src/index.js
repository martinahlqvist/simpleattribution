(function() {
	'use strict';
	var router = require('router'),
		appData = require('appData'),
		endecUtil = require('EndecUtil'),
		suffixArray = [],
		imageSuffix = "",
		imageString = "",
		n = 0;
	router.get('/', function(req, res) {
		if (appData.get('greyscaleBoolean') === true) {
			suffixArray.push('grayscale');
		}
		if (appData.get('blurBoolean') === true) {
			suffixArray.push('blur');
		}
		if (appData.get('imageID') === null || appData.get('imageID') === "") {} else {
			imageString += "/id/" + appData.get('imageID');
		}
		imageString += "/" + appData.get('imageWidth') + "/" + appData.get('imageHeight');
		if (suffixArray.length > 0) {
			for (n = 0; n < suffixArray.length; n++) {
				if (n == 0) {
					imageSuffix += "?"
				} else {
					imageSuffix += "&";
				}
				imageSuffix += suffixArray[n];
			}
		} else {}
		var data = {
			imageString: imageString,
			imageSuffix: imageSuffix
		};
		data.selectedLanguage = "language-" + data.currentLanguage;
		data.selectedCode = endecUtil.escapeXML(data.currentCode);
		res.render('/', data);
	});
}());