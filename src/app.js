jui.defineUI("app.builder", [
	"app.component.menubar",
	"app.component.toolbar",
	"app.component.toolbuttons",
	"app.component.statusbar",
	"app.component.navigationbar",
	"app.component.editor"

], function (MenuBar, Toolbar, ToolButtons, StatusBar, NavigationBar, Editor) {

	var AppBuilder = function () {
		var opt, self, root;
		var $menubar, $toolbar, $toolbuttons_1, $toolbuttons_2, $statusbar, $navigationbar, $editor;
		var _menubar, _toolbar, _toolbuttons_1, _toolbuttons_2, _statusbar, _navigationbar, _editor;

		var list = [];

		this.init = function () {
			opt = this.options;
			self = this;
			root = this.root;

			$menubar = $("<div class='menubar' />").appendTo(this.root);
			$toolbar = $("<div class='toolbar' />").appendTo(this.root);
			$toolbuttons_1 = $("<div class='toolbuttons-1' />").appendTo(this.root);
			$toolbuttons_2 = $("<div class='toolbuttons-2' />").appendTo(this.root);
			$statusbar = $("<div class='statusbar' />").appendTo(this.root);
			$navigationbar = $("<div class='navigationbar' />").appendTo(this.root);
			$editor = $("<div class='editor' />").appendTo(this.root);


			this.initUI();
		}

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

			_menubar = new MenuBar($menubar);
			_toolbar = new Toolbar($toolbar);
			_toolbuttons_1 = new ToolButtons($toolbuttons_1);
			_toolbuttons_2 = new ToolButtons($toolbuttons_2, {
				direction : 'right'
			});
			_statusbar = new StatusBar($statusbar);
			_navigationbar = new NavigationBar($navigationbar);
			_editor = new Editor($editor);

			list = [menubar, _toolbar, _toolbuttons_1, _toolbuttons_2, _statusbar, _navigationbar, _editor];

			this.renderView();
		}

		this.renderView = function () {
			this.resize();
		}


		// 각각의 커맨드에 이벤트를 전달한다.
		this.publish = function (type, args) {
			for(var i = 0, len = list.length; i < len; i++) {
				list[i].emit(type, args);
			}
		}


		this.layout = function () {
			var totalWidth = $(this.root).width();
			var totalHeight = $(this.root).height();
			var top = 0;

			// resize menubar
			_menubar.bound(0, 0, totalWidth, _menubar.options.height);
			top += _menubar.options.height;

			// resize toolbar
			_toolbar.bound(0, top, totalWidth, _toolbar.options.height);
			top += _toolbar.options.height;

			// resize navigationbar
			_navigationbar.bound(0, top, totalWidth, _navigationbar.options.height);
			top += _navigationbar.options.height;

			// resize toolbuttons
			var centerHeight = totalHeight- top - _statusbar.options.height;

			_toolbuttons_1.bound(0, top, _toolbuttons_1.options.width, centerHeight);
			_toolbuttons_2.bound(totalWidth - _toolbuttons_2.options.width, top, _toolbuttons_2.options.width, centerHeight);
			_editor.bound(300, top, totalWidth - (_toolbuttons_1.options.width + _toolbuttons_2.options.width), centerHeight);

			top += centerHeight;

			_statusbar.bound(0, top, totalWidth, _statusbar.options.height);
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
			navigationbar : [],
			viewport : "body"
		}
	};

	return AppBuilder;


});
