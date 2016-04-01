jui.defineUI("app.component.core", [], function () {

	var Core = function () {

		this.init = function () {

			this.initUI();
		};

		this.initUI = function () {

			$(this.root).css(this.options.style);

			this.update();
		};

		this.update = function () {

		};

		this.bound = function (x, y, width, height) {
			$(this.root).css({
				left : x,
				top : y,
				width : width,
				height: height
			});
		};

	};

	Core.setup = function () {
		return {
			style : {
				position: 'absolute',
				background: 'yellow'
			}
		};
	}

	return Core;

});
