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
	"app.manager.actionmanager",
	"app.manager.configmanager"

], function (
		Modal,
		MenuBar, Toolbar, ToolButtons, StatusBar, NavigationBar, Editor,

		ActionManager, ConfigManager
) {

	var AppBuilder = function () {
		var opt, self, root;
		var $menubar, $toolbar, $toolbuttons_left, $toolbuttons_right, $toolbuttons_bottom, $statusbar, $navigationbar, $editor;
		var _menubar, _toolbar, _toolbuttons_left, _toolbuttons_right, _toolbuttons_bottom, _statusbar, _navigationbar, _editor;
		var totalWidth, totalHeight;
		var actionManager, configManager;

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

			this.emit("init");
		};

		this.initComponent = function () {
			actionManager = new ActionManager(this);
			this.config = configManager = new ConfigManager(this);

			this.config.import(this.options.config);
		};

		this.initPlugin = function () {
			var plugins = jui.include("app.plugins");
			var self = this;
			Object.keys(plugins).forEach(function(key) {
				var PluginClass = plugins[key];
				pluginList.push(new PluginClass(self));
			});

		};

		this.action = function (name, obj) {
			if (arguments.length == 1) {
				return actionManager.get(name);
			} else {
				actionManager.add(name, obj);
			}

		};

		this.run = function (name, params, type, context) {
			var action = this.action(name);
			var command = action[type||"click"];
			context = context || this;

			command && command.call(context, params);
		}

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

			var alertModal = Modal($template, {
				target : this.options.viewport
			});

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
				direction : 'right'
			});
			_toolbuttons_bottom = new ToolButtons($toolbuttons_bottom, {
				app : this,
				direction : 'bottom'
			});
			_statusbar = new StatusBar($statusbar, {
				app : this
			});
			_navigationbar = new NavigationBar($navigationbar, {
				app : this
			});
			_editor = new Editor($editor, {
				app : this
			});

			list = [_menubar, _toolbar, _toolbuttons_left, _toolbuttons_right, _toolbuttons_bottom, _statusbar, _navigationbar, _editor];

			this.renderView();
		};

		this.initEvent = function () {
			var self = this;

			configManager.on("layout:show.toolbar", function (value) {
				_toolbar.toggle(value);
				self.resize();
			});

			configManager.on("layout:show.navigationbar", function (value) {
				_navigationbar.toggle(value);
				self.resize();
			});

			configManager.on("layout:show.statusbar", function (value) {
				_statusbar.toggle(value);
				self.resize();
			});

			configManager.on("layout:show.toolbuttons", function (value) {
				_toolbuttons_left.toggle(value);
				_toolbuttons_right.toggle(value);
				_toolbuttons_bottom.toggle(value);
				self.resize();
			});

			configManager.dispatch("layout:show.toolbar", !!configManager.get("layout:show.toolbar"));
			configManager.dispatch("layout:show.navigationbar", !!configManager.get("layout:show.navigationbar"));
			configManager.dispatch("layout:show.statusbar", !!configManager.get("layout:show.statusbar"));
			configManager.dispatch("layout:show.toolbuttons", !!configManager.get("layout:show.toolbuttons"));

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
		};

		this.width = function () {
			return totalWidth;
		};

		this.height = function () {
			return totalHeight;
		};

		this.isHide = function (type) {
			if (type == 'toolbar') return !configManager.get("layout:show.toolbar");
			if (type == 'navigationbar') return !configManager.get("layout:show.navigationbar");
			if (type == 'statusbar') return !configManager.get("layout:show.statusbar");
			if (type == 'toolbuttons') return !configManager.get("layout:show.toolbuttons");

			return false;
		};


		this.layout = function () {

			var top = 0;

			// resize menubar
			_menubar.bound(0, 0, totalWidth, _menubar.options.height);
			top += _menubar.options.height;

			if (!this.isHide("toolbar")) {
				// resize toolbar
				_toolbar.bound(0, top, totalWidth, _toolbar.options.height);
				top += _toolbar.options.height;
			}


			if (!this.isHide("navigationbar")) {
				// resize navigationbar
				_navigationbar.bound(0, top, totalWidth, _navigationbar.options.height);
				top += _navigationbar.options.height;
			}

			// resize toolbuttons
			var centerHeight = totalHeight- top;

			if (!this.isHide("toolbuttons")) {
				centerHeight -= _toolbuttons_bottom.options.height;
			}

			if (!this.isHide("statusbar")) {
				centerHeight -= _statusbar.options.height;
			}

			var centerWidth = totalWidth;
			var centerX = 0;
			if (!this.isHide("toolbuttons")) {
				_toolbuttons_left.bound(0, top, _toolbuttons_left.options.width, centerHeight);
				centerWidth -= _toolbuttons_left.options.width;
				centerX += _toolbuttons_left.options.width;

				_toolbuttons_right.bound(totalWidth - _toolbuttons_right.options.width, top, _toolbuttons_right.options.width, centerHeight);
				centerWidth -= _toolbuttons_right.options.width;
			}


			_editor.bound(centerX, top, centerWidth, centerHeight);
			top += centerHeight;

			if (!this.isHide("toolbuttons")) {
				// resize toolbuttons_bottom
				_toolbuttons_bottom.bound(0, top, totalWidth, _toolbuttons_bottom.options.height);
				top += _toolbuttons_bottom.options.height;
			}

			if (!this.isHide("statusbar")) {
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
			viewport : "body",
			menu : "default",
			toolbar : "default",
			nav : []
		}
	};

	return AppBuilder;


});
