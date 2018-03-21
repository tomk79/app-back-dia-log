/**
 * templates.js
 */
module.exports = function(main){
	var _this = this;
	var fs = require('fs');
	var pathTemplateDir = __dirname+'/../common/templates/';
	var templateFileList = fs.readdirSync(pathTemplateDir);
	this.collection = {};

	for(var idx in templateFileList){
		var basename = templateFileList[idx];
		var bin = fs.readFileSync(pathTemplateDir+basename).toString();

		_this.collection[basename] = {
			"basename": basename,
			"src": bin
		};
	}


	/**
	 * テンプレートを取得する
	 * @param {String} basename 
	 */
	this.get = function(basename){
		return _this.collection[basename+'.html'];
	}

}
