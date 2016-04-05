jui.defineUI("app.component.core", [], function () {

	var Core = function () {

		this.init = function () {

			this.rect = {};
			this.initUI();
			this.initEvent();
		};

		this.initEvent = function () {

		}

		this.initUI = function () {

			$(this.root).css(this.options.style).css({
				'user-select' : 'none'
			});

			this.update();
		};

		this.update = function () {

		};

		this.isHide = function () {
			return !!this.options.hide;
		}

		this.hide = function () {
			this.options.hide = true;
			$(this.root).hide();
		};

		this.show = function () {
			this.options.hide = false;
			$(this.root).show();
		}

		this.toggle = function () {
			this.options.hide = !this.options.hide;
			$(this.root).toggle();
		}

		this.getRect = function () {
			return {
				width : this.rect.width ? this.rect.width :  $(this.root).width(),
				height : this.rect.height ? this.rect.height :  $(this.root).height()
			}
		};

		this.app = function () {
			return this.options.app;
		};

		this.action = function (actionName) {
			return this.app().getAction(actionName) || {};
		}

		this.bound = function (x, y, width, height) {

			var style = this.root.style;

			style.left = x + 'px';
			style.top = y + 'px';
			style.width = width + 'px';
			style.height = height + 'px';

			this.rect = {
				width : width,
				height : height
			};


			/*
			$(this.root).css({
				left : x,
				top : y,
				width : width,
				height: height
			});
			*/
		};

	};

	Core.setup = function () {
		return {
			app : null,
			hide : false,
			style : {
				position: 'absolute',
				background: 'yellow'
			}
		};
	}

	return Core;

});
