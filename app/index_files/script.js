new (function(window){
	// pickles
	var _this = this;
	this.px2style = window.px2style;

	// node.js
	this.process = process;
	this.cwd = process.cwd();

	// NW.js
	this.nw = nw;
	this.nwWindow = nw.Window.get();
	this.nwWindow.moveTo(0, 0);
	this.nwWindow.resizeTo(window.parent.screen.width, window.parent.screen.height);

	// jQuery
    var $ = require('jquery');
    this.$ = $;

	// package.json
	var _packageJson = require('../package.json');
	this.packageJson = _packageJson;

	// data
	var _path_data_dir = (process.env.HOME||process.env.LOCALAPPDATA) + '/'+_packageJson.pickles2.dataDirName+'/';

	// utils
	var _utils79 = require('utils79');
	this.utils79 = _utils79;

	// filesystem
	var _fs = require('fs');
	this.fs = _fs;
	var _fsEx = require('fs-extra');
	this.fsEx = _fsEx;
	var _path = require('path');
	this.path = _path;

	// Pickles 2
	var _px2dtLDA = new (require('px2dt-localdata-access'))(
		_path_data_dir,
		{
			"updated": function(updatedEvents){
				console.log('Px2DTLDA Data Updated:', updatedEvents);
			}
		}
	);
	this.px2dtLDA = _px2dtLDA;

	var _php = require('phpjs');
	this.php = _php;

	var _it79 = require('iterate79');
	this.it79 = _it79;

	var _nw_gui = require('nw.gui');
	var _appName = _packageJson.window.title;
	window.document.title = _appName;

	/**
	 * アプリケーションの初期化
	 */
	function init(callback){
		_it79.fnc({},
			[
				function(it1, data){
					// データディレクトリを初期化
					_this.px2dtLDA.initDataDir(function(result){
                        if( !result ){
							console.error('FAILED to Initialize data directory. - '+_path_data_dir);
						}
						_this.px2dtLDA.save(function(){
							it1.next(data);
						});
					});
				},
				function(it1, data){

					(function(){
						// node-webkit の標準的なメニューを出す
						var win = _nw_gui.Window.get();
						var nativeMenuBar = new _nw_gui.Menu({ type: "menubar" });
						try {
							nativeMenuBar.createMacBuiltin( _appName );
							win.menu = nativeMenuBar;
							// win.menu.append(new _nw_gui.MenuItem({
							// 	type: "normal",
							// 	label: 'Item 1',
							// 	click: function() {
							// 		console.log('Click on Item 1');
							// 	}
							// }));
						} catch (ex) {
							console.log(ex.message);
						}

						// ↓Macのメニューバーの右側に並ぶメニューのこと
						// var tray = new _nw_gui.Tray({ icon: './common/images/appicon.png' });
						// tray.title = 'Love Tray';
						// tray.tooltip = 'Love Tooltip';

					})();

					_this.log( 'Application start;' );
					it1.next();
					return;
				},
				function(it1, data){
					callback();
				}

			]
		);
		return;
	}

	/**
	 * ログをファイルに出力
	 */
	this.log = function( msg ){
		console.info(msg);
		return _this.px2dtLDA.log(msg);
	}

	/**
	 * アプリケーションを終了する
	 */
	this.exit = function(){
		console.log( 'exit() called.' );
		// if(!confirm('exit?')){return;}
		try {
			if( _platform == 'win' ){
				nw.App.closeAllWindows();
			}else{
				nw.App.quit();
			}
		} catch (e) {
			console.error('Unknown Error on exit()');
		}
	}

	/**
	 * イベントセット
	 */
	process.on( 'exit', function(e){
		_this.log( 'Application exit;' );
	});
	process.on( 'uncaughtException', function(e){
		// alert('ERROR: Uncaught Exception');
		console.error('ERROR: Uncaught Exception');
		console.error(e);
		_this.log( 'ERROR: Uncaught Exception' );
		_this.log( e );
	} );


	/**
	 * アプリケーションを初期化
	 */
	$(window).on('load', function(){

        _it79.fnc({}, [
			function(it, arg){
				// init
				init(function(){
					it.next(arg);
				});
			} ,
			function(it, arg){
				it.next(arg);
			}
		]);

		window.focus();
	});

	return this;
})(window);
