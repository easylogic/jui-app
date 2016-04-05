jui.defineUI("app.builder", [

	// core ui
	"ui.modal",

	// extension ui
	"app.component.menubar",
	"app.component.toolbar",
	"app.component.toolbuttons",
	"app.component.statusbar",
	"app.component.navigationbar",
	"app.component.editor",
	"app.component.actionmanager"

], function (Modal, MenuBar, Toolbar, ToolButtons, StatusBar, NavigationBar, Editor, ActionManager) {

	var AppBuilder = function () {
		var opt, self, root;
		var $menubar, $toolbar, $toolbuttons_left, $toolbuttons_right, $toolbuttons_bottom, $statusbar, $navigationbar, $editor;
		var _menubar, _toolbar, _toolbuttons_left, _toolbuttons_right, _toolbuttons_bottom, _statusbar, _navigationbar, _editor;
		var totalWidth, totalHeight;
		var actionManager;

		var list = [], pluginList = [], alertList = [];

		var template = {
			alert : '' +
				'<div class="msgbox" style="display: none;">' +
				'	<div class="head"></div>' +
				'	<div class="body">' +
				'		<div class="content"></div>' +
				'		<div class="buttons" style="text-align: center; margin-top: 45px;">' +
				'			<a class="btn small close">Close</a>' +
				'		</div>' +
				'	</div>' +
				'</div>'
		}

		this.init = function () {
			opt = this.options;
			self = this;
			root = this.root;

			$menubar = $("<div class='menubar' />").appendTo(this.root);
			$toolbar = $("<div class='toolbar' />").appendTo(this.root);
			$toolbuttons_left = $("<div class='toolbuttons-left' />").appendTo(this.root);
			$toolbuttons_right = $("<div class='toolbuttons-right' />").appendTo(this.root);
			$toolbuttons_bottom = $("<div class='toolbuttons-bottom' />").appendTo(this.root);
			$statusbar = $("<div class='statusbar' />").appendTo(this.root);
			$navigationbar = $("<div class='navigationbar' />").appendTo(this.root);
			$editor = $("<div class='editor' />").appendTo(this.root);


			this.initComponent();
			this.initPlugin();
			this.initUI();
			this.initEvent();
		};

		this.initComponent = function () {
			actionManager = new ActionManager(this);
		};

		this.initPlugin = function () {
			var plugins = jui.include("app.plugins");
			var self = this;
			Object.keys(plugins).forEach(function(key) {
				var PluginClass = plugins[key];
				pluginList.push(new PluginClass(self));
			});

		};

		this.addAction = function (name, obj) {
			actionManager.add(name, obj);
		};

		this.getAction = function (name) {
			return actionManager.get(name);
		};

		this.getActionList = function () {
			return actionManager.list();
		};

		this.opt = function (key, value) {
			if (arguments.length == 1) {
				return this.options[key];
			} else {
				this.setOption(key, value);
			}
		};

		this.alert = function (message, title) {
			title = title || "Alert";

			var $template = $(template.alert);

			$template.find(".head").html(title);
			$template.find(".content").html(message);
			$template.appendTo('body');

			var alertModal = Modal($template);

			$template.find(".close").on('click', function() {
				alertModal.hide();
				$(alertModal.root).remove();
			});

			alertModal.show();

		};

		this.initUI = function () {


			var $root = $(this.root);

			$root.appendTo(this.options.viewport);
			$root.css({
				position: 'absolute',
				right: '0px',
				left: '0px',
				top: '0px',
				bottom: '0px'
			});

			_menubar = new MenuBar($menubar, {
				app : this
			});
			_toolbar = new Toolbar($toolbar, {
				app : this
			});
			_toolbuttons_left = new ToolButtons($toolbuttons_left, {
				direction : 'left',
				app : this
			});
			_toolbuttons_right = new ToolButtons($toolbuttons_right, {
				app : this,
				direction : 'right',
				collapse : true
			});
			_toolbuttons_bottom = new ToolButtons($toolbuttons_bottom, {
				app : this,
				direction : 'bottom',
				collapse : true
			});
			_statusbar = new StatusBar($statusbar);
			_navigationbar = new NavigationBar($navigationbar);
			_editor = new Editor($editor);

			list = [_menubar, _toolbar, _toolbuttons_left, _toolbuttons_right, _toolbuttons_bottom, _statusbar, _navigationbar, _editor];

			this.renderView();
		};

		this.initEvent = function () {
			var self = this;

			this.on('hide', function(target) {
				switch(target) {
					case 'toolbar': _toolbar.hide(); break;
					case 'toolbuttons':
						_toolbuttons_left.hide();
						_toolbuttons_right.hide();
						_toolbuttons_bottom.hide();
						break;
					case 'statusbar': _statusbar.hide(); break;
					case 'navigationbar': _navigationbar.hide(); break;
				}

				self.resize();
			});


			this.on('show', function(target) {
				switch(target) {
					case 'toolbar': _toolbar.show(); break;
					case 'toolbuttons':
						_toolbuttons_left.show();
						_toolbuttons_right.show();
						_toolbuttons_bottom.show();
						break;
					case 'statusbar': _statusbar.show(); break;
					case 'navigationbar': _navigationbar.show(); break;
				}

				self.resize();
			});

			this.on('toggle', function(target) {
				switch(target) {
					case 'toolbar': _toolbar.toggle(); break;
					case 'toolbuttons':
						_toolbuttons_left.toggle();
						_toolbuttons_right.toggle();
						_toolbuttons_bottom.toggle();
						break;
					case 'statusbar': _statusbar.toggle(); break;
					case 'navigationbar': _navigationbar.toggle(); break;
				}

				self.resize();
			});

			this.on('collapse', function (target) {
				switch(target) {
					case 'right': _toolbuttons_right.collapse(false); break;
					case 'left': _toolbuttons_left.collapse(false); break;
					case 'bottom': _toolbuttons_bottom.collapse(false); break;
				}

				self.resize();
			});

			this.on('expand', function (target) {
				switch(target) {
					case 'right': _toolbuttons_right.expand(false); break;
					case 'left': _toolbuttons_left.expand(false); break;
					case 'bottom': _toolbuttons_bottom.expand(false); break;
				}

				self.resize();
			});


			$(window).resize(function() {
				self.renderView();
			})
		}

		this.renderView = function () {
			totalWidth = $(this.root).width();
			totalHeight = $(this.root).height();
			this.resize();
		}


		this.publish = function (type, args) {
			for(var i = 0, len = list.length; i < len; i++) {
				list[i].emit(type, args);
			}
		}

		this.width = function () {
			return totalWidth;
		}

		this.height = function () {
			return totalHeight;
		}


		this.layout = function () {

			var top = 0;

			// resize menubar
			_menubar.bound(0, 0, totalWidth, _menubar.options.height);
			top += _menubar.options.height;

			if (!_toolbar.isHide()) {
				// resize toolbar
				_toolbar.bound(0, top, totalWidth, _toolbar.options.height);
				top += _toolbar.options.height;
			}


			if (!_navigationbar.isHide()) {
				// resize navigationbar
				_navigationbar.bound(0, top, totalWidth, _navigationbar.options.height);
				top += _navigationbar.options.height;
			}

			// resize toolbuttons
			var centerHeight = totalHeight- top;

			if (!_toolbuttons_bottom.isHide()) {
				centerHeight -= _toolbuttons_bottom.options.height;
			}

			if (!_statusbar.isHide()) {
				centerHeight -= _statusbar.options.height;
			}

			var centerWidth = totalWidth;
			var centerX = 0;
			if (!_toolbuttons_left.isHide()) {
				_toolbuttons_left.bound(0, top, _toolbuttons_left.options.width, centerHeight);
				centerWidth -= _toolbuttons_left.options.width;
				centerX += _toolbuttons_left.options.width;
			}

			if (!_toolbuttons_right.isHide()) {
				_toolbuttons_right.bound(totalWidth - _toolbuttons_right.options.width, top, _toolbuttons_right.options.width, centerHeight);
				centerWidth -= _toolbuttons_right.options.width;
			}


			_editor.bound(centerX, top, centerWidth, centerHeight);
			top += centerHeight;

			if (!_toolbuttons_bottom.isHide()) {
				// resize toolbuttons_bottom
				_toolbuttons_bottom.bound(0, top, totalWidth, _toolbuttons_bottom.options.height);
				top += _toolbuttons_bottom.options.height;
			}

			if (!_statusbar.isHide()) {
				// resie statusbar
				_statusbar.bound(0, top, totalWidth, _statusbar.options.height);
			}

		};

		this.resize = function () {
			this.layout();
			this.publish("resize");
		}
	};

	AppBuilder.setup = function () {
		return {
			config :  {},
			toolbar: [],
			toolbuttons : [],
			statusbar : [],
			menubar : [],
			navigationbar : [],
			viewport : "body",
			menu : "default"
		}
	};

	return AppBuilder;


});
