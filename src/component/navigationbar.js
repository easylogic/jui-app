jui.defineUI("app.component.navigationbar", [], function () {

	var NavigationBar = function () {

		this.update = function () {

			this.super('update');

			$(this.root).html("NavigationBar");
		}

	};

	NavigationBar.setup = function () {
		return {
			height: 50,
			style : {
				position: 'absolute',
				background: 'red'
			}
		};
	}

	return NavigationBar;

}, "app.component.core");
