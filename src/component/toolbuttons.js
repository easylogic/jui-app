jui.defineUI("app.component.toolbuttons", [], function () {

	var ToolButtons = function () {

		var self = this;


		this.init = function () {
			self = this;
			this.super('init');
		};

		this.initEvent = function () {
			this.super('initEvent');

			this.app.on('init', function () {
				self.update();
			});

			this.config.on(this.getName(this.options.direction), function () {
				self.update();
			})
		};

		this.update = function () {

			this.super('update');

			var $root = this.$root;

			$root.attr('droppable', true);
			$root.html(this.createToolButtons());

		};

		this.getName = function (name) {
			return "toolbuttons:" + name;
		}

		this.createToolButtons = function () {

			var width = this.options.width;
			var name = this.getName(this.options.direction);
			var arr = [];
			this.config.each(name, function(panelName) {
				var panelObject = self.app.panel(panelName);
				// it is action name or plugin
				arr.push(self.createPanelButton(panelName, panelObject));
			});

			var $group = $("<div />").css({ width: '100%', height: '100%', position: 'relative' });
			var $child = $("<div />").css({  position: 'absolute' }).addClass('direction-' + this.options.direction);

			this.setDropEvent($child);

			// first
			arr.forEach(function(it) { $child.append(it); })

			$group.html([$child]);

			var buttonHeight = 100;

			if (this.options.direction == 'left' || this.options.direction == 'right') {
				$child.css({ top: 0, left:0, right:0, bottom: 0 });

				var deg = "-90deg";

				if (this.options.direction == 'right') {
					deg = "90deg";
				}

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


			} else if (this.options.direction == 'top' || this.options.direction == 'bottom') {
				$child.css({ top: 0, left:0, bottom:0, right: 0 });


				$child.children().each(function() {
					$(this).width(buttonHeight);
					var $div = $(this).find("div");
					$div.width(buttonHeight);
				});
			}

			return $group;
		};

		this.updateList = function ($el, direction) {
			var list = [];
			$el.children().each(function (i, e) {
				list.push($(e).data('name'));
			})

			var name = self.getName(direction);

			// 배열 재설정 설정하는 순간 이벤트 발생해서 UI 변경
			this.config.set(name, list);
		}

		this.setDropEvent = function ($el) {
			$el.on('drop', function (e) {
				var dragPanel = app.config.get("toolbuttons:drag.object");
				var dragDirection = app.config.get("toolbuttons:drag.direction");

				var $target = dragPanel.parent();

				var $draggableObject = $(e.target).closest('[draggable]');

				if ($draggableObject.length) {
					$draggableObject.after(dragPanel);
				} else {
					$(e.target).append(dragPanel);
				}

				// 방향이 다를 때만 target 을 업데이트
				if (dragDirection != self.options.direction) {
					self.updateList($target, dragDirection);
				}

				self.updateList($el, self.options.direction);

			});

			$el.on('dragover', function (e) {
				e.preventDefault();
				//console.log('over', e);
			});

			$el.on('dragenter', function (e) {
				//console.log('enter', e);
			})
		}

		this.createPanelButton = function (panelName, panelObject) {
			var $panel = $('<a class="btn tool-button" draggable="true"/>').css({
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
			$panel.data('name', panelName);
			$panel.html(this.createSvgButton(panelObject.title));

			$panel.click(function() {
				// 패널을 보여주는 action 을 실행하는데 , 문제는 현재 위치를 알고 있어야한다.
				// 패널의 현재 위치는 어떻게 알 수 있을까?
				app.run("layout:show.panel", panelName, self.options.direction);
			});

			$panel.on('dragstart', function (e) {
				e.originalEvent.dataTransfer.setData("panel", panelName);
				app.config.set("toolbuttons:drag.object", $panel);
				app.config.set("toolbuttons:drag.direction", self.options.direction);
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
