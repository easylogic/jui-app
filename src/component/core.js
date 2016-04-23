jui.defineUI("app.component.core", [], function () {

	var Core = function () {

		this.init = function () {
			this.app = this.options.app;
			this.config = this.app.config;

			this.$root = $(this.root);
			this.rect = {};
			this.initUI();
			this.initEvent();
		};

		this.initEvent = function () {

		}

		this.initUI = function () {

			this.$root.css(this.options.style).css({
				'user-select' : 'none'
			});
		};

		this.update = function () {

		};

		this.hide = function () {
			this.$root.hide();
		};

		this.show = function () {
			this.$root.show();
		}

		this.toggle = function (value) {
			this.$root.toggle(value);
		}

		this.getRect = function () {
			return {
				width : this.rect.width ? this.rect.width :  $(this.root).width(),
				height : this.rect.height ? this.rect.height :  $(this.root).height()
			}
		};


		this.action = function (actionName) {
			return this.app.action(actionName) || {};
		}

		this.run = function (actionName, params, type, context) {
			return this.app.run(actionName, params, type, context);
		};

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
			style : {
				position: 'absolute',
				background: 'yellow'
			}
		};
	}

	return Core;

});
