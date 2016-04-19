jui.defineUI("app.component.editor", [], function () {

	var Editor = function () {
		var self = this ;
		var panels = {};

		this.initEvent = function () {
			this.super('initEvent');

			this.app().on('init', function () {
				self.update();
			})
		};
		this.update = function () {

			this.super('update');

			$(this.root).html(this.createEditorPanels());
		};

		this.createEditorPanels = function () {

			if (!panels.left) {
				panels.left = $("<div />").addClass("editor-left-panel").css({
					'position': 'absolute',
					'left': '0px',
					'top' : '0px',
					'bottom' : '0px',
					'min-width' : '240px'
				});
			}
			if (!panels.right) {
				panels.right = $("<div />").addClass("editor-right-panel").css({
					'position': 'absolute',
					'left': '0px',
					'top' : '0px',
					'bottom' : '0px',
					'min-width' : '240px'
				});
			}
			if (!panels.top) {
				panels.top = $("<div />").addClass("editor-top-panel").css({
					'position': 'absolute',
					'left': '0px',
					'top' : '0px',
					'right' : '0px',
					'min-height' : '240px'
				});
			}
			if (!panels.bottom) {
				panels.bottom = $("<div />").addClass("editor-bottom-panel").css({
					'position': 'absolute',
					'left': '0px',
					'top' : '0px',
					'right' : '0px',
					'min-height': '240px'
				});
			}
			if (!panels.content) {
				panels.content = $("<div />").addClass("editor-content-panel").css({
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				});
			}

			this.showPanels();

			return [panels.left, panels.top, panels.right, panels.bottom, panels.content];
		};

		this.showPanels = function () {

			['left', 'right', 'top', 'bottom'].forEach(function (direction) {
				var isShow = this.app().config.get("layout:show.editor.panel." + direction);

				panels[direction].toggle(isShow);

			});


			this.resize();

		};

		this.resize = function () {
			var config = this.app().config;

			var top = 0, left = 0, right = 0, bottom = 0;
			if (config.get('layout:show.editor.panel.top')) {
				top += panel.top.height();
			}

			if (config.get('layout:show.editor.panel.bottom')) {
				bottom += panel.bottom.height();
			}

			if (config.get('layout:show.editor.panel.left')) {
				left += panel.left.width();
			}

			if (config.get('layout:show.editor.panel.right')) {
				right += panel.right.width();
			}

			// set content size
			panel.content.css({
				left : left,
				right : right,
				bottom: bottom,
				top: top
			})

		}

	};

	Editor.setup = function () {
		return {
			style : {
				position: 'absolute',
				background: 'green',
				overflow: 'hidden'
			}
		};
	}

	return Editor;

}, "app.component.core");
