jui.defineUI("app.component.statusbar", [], function () {

	var Statusbar = function () {

		this.update = function () {

			this.super('update');

			$(this.root).html("Statusbar");
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
