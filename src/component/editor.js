jui.defineUI("app.component.editor", [], function () {

	var Editor = function () {
		var self = this ;
		var panels = {};

		this.initEvent = function () {
			this.super('initEvent');

			this.app().on('init', function () {
				self.update();
			});


			// config 이벤트 설정
			['left','right','top','bottom'].forEach(function(it) {
				this.config().on(["editor:show" , it], function () {
					self.showPanels();
				})
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
					'min-width' : '240px',
					background: 'yellow'
				});
			}
			if (!panels.right) {
				panels.right = $("<div />").addClass("editor-right-panel").css({
					'position': 'absolute',
					'left': '0px',
					'top' : '0px',
					'min-width' : '240px',
					background: 'yellow'
				});
			}
			if (!panels.top) {
				panels.top = $("<div />").addClass("editor-top-panel").css({
					'position': 'absolute',
					'left': '0px',
					'top' : '0px',
					'min-height' : '240px',
					background: 'yellow'
				});
			}
			if (!panels.bottom) {
				panels.bottom = $("<div />").addClass("editor-bottom-panel").css({
					'position': 'absolute',
					'left': '0px',
					'top' : '0px',
					'min-height': '240px',
					background: 'yellow'
				});
			}
			if (!panels.content) {
				panels.content = $("<div />").addClass("editor-content-panel").css({
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					background: 'red'
				});
			}

			this.showPanels();

			return [panels.left, panels.top, panels.right, panels.bottom, panels.content];
		};

		this.showPanels = function () {
			var self = this;

			['left', 'right', 'top', 'bottom'].forEach(function (direction) {
				var isShow = self.app().config.get("layout:show.editor.panel." + direction);

				panels[direction].toggle(isShow);

			});


			this.resize();

		};

		this.resize = function () {
			var totalWidth = $(this.root).width();
			var totalHeight = $(this.root).height();
			var config = this.app().config;

			var top = 0, left = 0, right = 0, bottom = 0;
			if (config.get('layout:show.editor.panel.top')) {

				panels.top.css({
					width: totalWidth
				});
				top += panel.top.height();

			}

			if (config.get('layout:show.editor.panel.bottom')) {

				panels.bottom.css({
					width: totalWidth
				});
				bottom += panel.bottom.height();
			}

			if (config.get('layout:show.editor.panel.left')) {

				panels.left.css({
					top: top,
					height: totalHeight - top - bottom
				});
				left += panel.left.width();
			}

			if (config.get('layout:show.editor.panel.right')) {
				panels.right.css({
					top: top,
					left : totalWidth - panel.right.width(),
					height: totalHeight - top - bottom
				});
				right += panel.right.width();
			}

			// set content size
			panels.content.css({
				left : left,
				top: top,
				width: totalWidth - left - right,
				height : totalHeight - top - bottom
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
