jui.defineUI("app.component.editor", [], function () {

	var Editor = function () {
		var self = this ;
		var maxWidth, maxHeight, collapsedSize = 20, resizerSize = 4, halfResizerSize = 2;
		var $resizer;

		var panels = {};

		this.init = function () {
			self = this;
			this.super('init');

			this.$root.html(this.createEditorPanels());
		};

		this.initEvent = function () {
			this.super('initEvent');

			this.app.on('init', function () {
				self.update();
			});

			this.on('resize', function () {
				self.resize();
			});

			// config 이벤트 설정
			['left','right','top','bottom'].forEach(function(it) {
				self.config.on(["editor:show" , it], function () {
					self.showPanels();
				})
			})

		};
		this.update = function () {

			this.super('update');

			this.showPanels();

		};

		this.bound = function (x, y, width, height) {
			this.super('bound', [ x, y, width, height ]);

			//this.config.set("editor:width", width);
			//this.config.set("editor:height", height);

			maxHeight = height;
			maxWidth = width;
		};

		this.createEditorPanels = function () {

			if (!panels.left) {
				panels.left = $("<div />").addClass("editor-left-panel").css({
					'position': 'absolute',
					'left': '0px',
					'top' : '0px',
					background: 'yellowgreen',
					'overflow' : 'hidden',
					'z-index' : 999
				});
			}
			if (!panels.right) {
				panels.right = $("<div />").addClass("editor-right-panel").css({
					'position': 'absolute',
					'left': '0px',
					'top' : '0px',
					background: 'gray',
					'overflow' : 'hidden',
					'z-index' : 999
				});
			}
			if (!panels.top) {
				panels.top = $("<div />").addClass("editor-top-panel").css({
					'position': 'absolute',
					'left': '0px',
					'top' : '0px',
					background: 'cyan',
					'overflow' : 'hidden',
					'z-index' : 999
				});
			}
			if (!panels.bottom) {
				panels.bottom = $("<div />").addClass("editor-bottom-panel").css({
					'position': 'absolute',
					'left': '0px',
					'top' : '0px',
					background: 'pink',
					'overflow' : 'hidden',
					'z-index' : 999
				});
			}
			if (!panels.content) {
				panels.content = $("<div />").addClass("editor-content-panel").css({
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					background: 'red',
					'overflow' : 'hidden',
					'z-index' : 998
				});
			}

			return [panels.left, panels.top, panels.right, panels.bottom, panels.content];
		};

		this.isShow = function (direction) {
			var isShow = this.config.get(["editor:show", direction]);

			if (isShow && this.config.length(['editor:panels', direction]) == 0) {
				isShow = false;
			}

			return isShow;
		};

		this.renderPanel = function (direction) {
			// 저장된 panel 을 그린다


			panels[direction].empty();
			this.config.each(['editor:panels', direction], function (panel) {
				panels[direction].append(panel);
				self.initResizer(direction);
			});

		}

		this.showPanels = function () {
			var self = this;

			['left', 'right', 'top', 'bottom'].forEach(function (direction) {

				var panel = panels[direction];

				if (!panel) return;

				if (direction == 'left' || direction == 'right') {
					panel.width(self.config.get(['editor:size', direction]));
				} else {
					panel.height(self.config.get(['editor:size', direction]));
				}

				var isShow = self.isShow(direction);
				panel.toggle(isShow);

				if (isShow) {
					self.renderPanel(direction);
				}

			});


			this.resize();

		};

		this.resize = function () {
			var totalWidth = maxWidth;
			var totalHeight = maxHeight;

			var top = 0, left = 0, right = 0, bottom = 0;
			if (this.isShow('top')) {
				panels.top.css({
					width: totalWidth
				});
				top += this.config.get("editor:size.top");
			}

			if (this.isShow('bottom')) {
				var size = this.config.get("editor:size.bottom");
				panels.bottom.css({
					top: totalHeight  - size,
					width: totalWidth
				});
				bottom += size;
			}

			if (this.isShow('left')) {
				var size = this.config.get("editor:size.left");
				panels.left.css({
					top: top,
					height: totalHeight - top - bottom
				});
				left += left;
			}

			if (this.isShow('right')) {
				var size = this.config.get("editor:size.right");
				panels.right.css({
					top: top,
					left : totalWidth - size,
					height: totalHeight - top - bottom
				});
				right += size;
			}

			if (panels.content) {
				// set content size
				panels.content.css({
					left : left,
					top: top,
					width: totalWidth - left - right,
					height : totalHeight - top - bottom
				})
			}

		}


		this.initResizer = function (direction) {

			if (!panels[direction].find(".resizer").length) {
				var $resizer = $("<div class='resizer' />").appendTo(this.root).css({
					position: 'absolute'
				});

				$resizer.on('mousedown', function (e) {

					var startX = e.clientX;
					var startY = e.clientY;

					function call(moveEvent) {
						var distX = moveEvent.clientX - startX;
						var distY = moveEvent.clientY - startY;

						startX = moveEvent.clientX;
						startY = moveEvent.clientY;

						self.setResizer(direction, distX, distY);
					};

					function call2(e) {
						$('body').off('mousemove', call);
						$('body').off('mouseup', call2);
					}

					$('body').on('mousemove', call);
					$('body').on('mouseup', call2);
				});


				if (direction == 'left') {
					$resizer.css({
						right : -halfResizerSize,
						top: '0px',
						bottom : '0px',
						width : resizerSize,
						cursor : 'ew-resize'
					});
				} else if (direction == 'right') {
					$resizer.css({
						left : -halfResizerSize,
						top: '0px',
						bottom : '0px',
						width : resizerSize,
						cursor : 'ew-resize'
					});
				} else if (direction == 'bottom') {
					$resizer.css({
						left : '0px',
						right: '0px',
						top: -halfResizerSize,
						height: resizerSize,
						cursor : 'ns-resize'
					});
				} else if (direction == 'top') {
					$resizer.css({
						left : '0px',
						right: '0px',
						bottom: -halfResizerSize,
						height: resizerSize,
						cursor : 'ns-resize'
					});
				}
			}

			panels[direction].append($resizer);

		}

		this.setResizer = function (direction, distX, distY) {

			if (direction == 'left') {
				var size = this.config.get(['editor:size', direction]) + distX;

				if (size < 0) { size = 0 }
				else if (maxWidth < size) { size = maxWidth; }
				panels[direction].width(size);
			} else if (direction == 'right') {
				var size = this.config.get(['editor:size', direction]) + distX * -1;

				if (size < 0) { size = 0 }
				else if (maxWidth < size) { size = maxWidth; }
				panels[direction].width(size);
			} else if (direction == 'bottom') {
				var size = this.config.get(['editor:size', direction]) + distY * -1;
				if (size < 0) { size = 0 }
				else if (maxHeight < size) { size = maxHeight; }
				panels[direction].height(size);
			} else if (direction == 'top') {
				var size = this.config.get(['editor:size', direction]) + distY;
				if (size < 0) { size = 0 }
				else if (maxHeight < size) { size = maxHeight; }
				panels[direction].height(size);
			}

			this.config.set(["editor:size", direction], size);

			this.resize();
		}

	};

	Editor.setup = function () {
		return {
			style : {
				position: 'absolute',
				overflow: 'hidden'
			}
		};
	}

	return Editor;

}, "app.component.core");
