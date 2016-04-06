jui.defineUI("app.component.toolbuttons", [], function () {

	var ToolButtons = function () {

		var self = this;
		var lastWidth, lastHeight, collapsedSize = 20, resizerSize = 4;
		var $resizer;

		this.initEvent = function () {
			this.super('initEvent');

			this.app().on('init', function () {
				self.update();
			})
		};

		this.update = function () {

			this.super('update');

			//this.initResizer();

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

			var maxWidth = this.app().width() - resizerSize;
			var maxHeight = this.app().height();

			if (this.options.direction == 'left') {
				this.options.width += distX;
				
				if (this.options.width > maxWidth) {
					this.options.width  =  maxWidth;
				}


			} else if (this.options.direction == 'right') {
				this.options.width += distX * -1;

				if (this.options.width > maxWidth) {
					this.options.width  =  maxWidth;
				}

			} else if (this.options.direction == 'bottom') {

				this.options.height += distY * -1;

				if (this.options.height > maxHeight) {
					this.options.height  =  maxHeight;
				}
			}

			this.app().resize();
		}

	};

	ToolButtons.setup = function () {
		return {
			direction : 'left',
			width: 20,
			height: 20,
			style : {
				position: 'absolute',
				overflow: 'hidden',
				background: 'pink'
			}
		};
	}

	return ToolButtons;

}, "app.component.core");
