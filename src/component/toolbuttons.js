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

			$(this.root).append(this.createToolButtons());

		};

		this.getName = function (name) {
			return "toolbuttons:" + name;
		}

		this.createToolButtons = function () {

			var width = this.options.width;
			var height = this.options.height;
			var name = this.getName(this.options.direction);
			var arr = [ [], [] ];
			this.app().config.each(name, function(panelName) {
				var panelObject = self.app().panel(panelName);
				// it is action name or plugin
				arr[panelObject.index || 0].push(self.createPanelButton(panelName, panelObject));
			});

			var $group = $("<div />").css({ width: '100%', height: '100%', position: 'relative' });
			var $child1 = $("<div />").css({  position: 'absolute' });
			var $child2 = $("<div />").css({ position: 'absolute' });

			// first
			arr[0].forEach(function(it) { $child1.append(it); })

			// second
			arr[1].forEach(function(it) { $child2.append(it); })

			$group.append([$child1, $child2]);

			var buttonHeight = 100;

			if (this.options.direction == 'left' || this.options.direction == 'right') {
				$child1.css({ top: 0, left:0, right:0 });
				$child2.css({ bottom: 0, left:0, right:0 });

				var deg = "-90deg";

				if (this.options.direction == 'right') {
					deg = "90deg";
				}

				[$child1, $child2].forEach(function($child){
					$child.children().each(function() {
						$(this).height(buttonHeight);
						var $div = $(this).find("div");
						$div.width(buttonHeight);

						var x = width/2;
						var y = buttonHeight/2 - width/2;

						$div.css({
							transform: "translate( " + -(y) + "px, " + y + "px) rotate(" + deg + ")",
							'transform-origin': 'center center'
						})
					});
				});

			} else if (this.options.direction == 'top' || this.options.direction == 'bottom') {
				$child1.css({ top: 0, left:0, bottom:0 });
				$child2.css({ top: 0, bottom:0, right:0 });

				[$child1, $child2].forEach(function($child){
					$child.children().each(function() {
						$(this).width(buttonHeight);
						var $div = $(this).find("div");
						$div.width(buttonHeight);
					});
				});
			}

			return $group;
		};

		this.createPanelButton = function (panelName, panelObject) {
			var $panel = $('<a class="btn tool-button"/>').css({
				position: 'relative',
				display: 'inline-block',
				padding:0,
				margin:0,
				'border-radius': 0,
				border: 0,
				color: 'white',
				width: this.options.width,
				height: this.options.height,
				'box-sizing': 'border-box',
				background: '#4e4e4e'
			});
			$panel.html(this.createSvgButton(panelObject.title));

			$panel.click(function() {
				// 패널을 보여주는 action 을 실행하는데 , 문제는 현재 위치를 알고 있어야한다.
				// 패널의 현재 위치는 어떻게 알 수 있을까?
				app.run("layout:show.panel", panelName);
			});

			return $panel;
		};

		this.createSvgButton = function (title) {
			return $("<div>" + title + "</div>").css({
				width: this.options.width,
				height: this.options.height,
				'text-align': 'center'
			});
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
			direction : 'left',   // left, right, top, bottom
			width: 24,
			height: 24,
			style : {
				position: 'absolute',
				overflow: 'hidden',
				background: '#4e4e4e'
			}
		};
	}

	return ToolButtons;

}, "app.component.core");
