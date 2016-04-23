jui.defineUI("app.component.statusbar", [], function () {

	var Statusbar = function () {

		var self = this;


		this.init = function () {
			self = this;
			this.super('init');
		};

		this.initEvent = function () {
			this.super('initEvent');

			this.app.on('init', function () {
				self.update();
			})
		};

		this.update = function () {

			this.super('update');

			this.$root.html("Statusbar");
		}

	};

	Statusbar.setup = function () {
		return {
			height: 30,
			style : {
				padding:5,
				'box-sizing' : 'border-box',
				position: 'absolute',
				background: 'gray'
			}
		};
	}

	return Statusbar;

}, "app.component.core");
