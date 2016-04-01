jui.defineUI("app.component.toolbuttons", [], function () {

	var ToolButtons = function () {

		var self = this;
		var lastWidth, lastHeight, collapsedSize = 20, resizerSize = 4;
		var $resizer;

		this.initEvent = function () {

		};

		this.update = function () {

			this.super('update');

			this.initResizer();

			if (this.options.collapse) {
				this.collapse(false);
			} else {
				this.expand(false);
			}

			$(this.root).append("Toolbuttons");

		}

		this.initResizer = function () {
			if (!$resizer) {
				$resizer = $("<div class='resizer' />").appendTo(this.root).css({
					position: 'absolute',
					background: 'black',
				});

				$resizer.on('mousedown', function (e) {

					var startX = e.clientX;
					var startY = e.clientY;

					function call(moveEvent) {
						var distX = moveEvent.clientX - startX;
						var distY = moveEvent.clientY - startY;

						startX = moveEvent.clientX;
						startY = moveEvent.clientY;

						self.setResizer(distX, distY);
					};

					function call2(e) {
						$('body').off('mousemove', call);
						$('body').off('mouseup', call2);
					}

					$('body').on('mousemove', call);
					$('body').on('mouseup', call2);
				});


				if (this.options.direction == 'left') {
					$resizer.css({
						right : '0px',
						top: '0px',
						bottom : '0px',
						width : resizerSize,
						cursor : 'ew-resize'
					});
				} else if (this.options.direction == 'right') {
					$resizer.css({
						left : '0px',
						top: '0px',
						bottom : '0px',
						width : resizerSize,
						cursor : 'ew-resize'
					});
				} else if (this.options.direction == 'bottom') {
					$resizer.css({
						left : '0px',
						right: '0px',
						top: '0px',
						height: resizerSize,
						cursor : 'ns-resize'
					});
				}
			}

		}

		this.setResizer = function (distX, distY) {
			if (this.options.direction == 'left') {
				this.options.width += distX;

				if (this.options.width > this.options.app.width() - 4) {
					this.options.width  =  this.options.app.width() - 4;
				}


			} else if (this.options.direction == 'right') {
				this.options.width += distX * -1;

				if (this.options.width > this.options.app.width() - 4) {
					this.options.width  =  this.options.app.width() - 4;
				}

			} else if (this.options.direction == 'bottom') {

				this.options.height += distY * -1;

				if (this.options.height > this.options.app.height() - 4) {
					this.options.height  =  this.options.app.height() - 4;
				}
			}

			this.options.app.resize();
		}

		this.isCollapsed = function () {
			return !!this.options.collapse;
		}

		this.collapse = function (isNoneResize) {
			this.options.collapse = true;

			lastWidth = this.options.width;
			lastHeight = this.options.height;

			this.options.width = collapsedSize;
			this.options.height = collapsedSize;

			$resizer.hide();

			if (isNoneResize !== false) this.options.app.resize();
		};

		this.expand = function (isNoneResize) {
			this.options.collapse = false;

			if (typeof lastWidth  != 'undefined') {
				this.options.width = lastWidth ;
			}

			if (typeof lastHeight != 'undefined') {
				this.options.height = lastHeight;
			}

			$resizer.show();

			if (isNoneResize !== false) this.options.app.resize();
		}

	};

	ToolButtons.setup = function () {
		return {
			direction : 'left',
			collapse: false,
			width: 200,
			height: 200,
			style : {
				position: 'absolute',
				background: 'pink'
			}
		};
	}

	return ToolButtons;

}, "app.component.core");
