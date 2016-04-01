jui.defineUI("app.component.menubar", [], function () {

	var Menubar = function () {
		this.update = function () {

			this.super('update');

			$(this.root).html("Menubar");
		}

	};

	Menubar.setup = function () {
		return {
			height: 30,
			style : {
				padding:5,
				'box-sizing' : 'border-box',
				position: 'absolute',
				background: 'darkblue'
			}
		};
	}

	return Menubar;

}, "app.component.core");
