jui.defineUI("app.component.toolbar", [], function () {

	var Toolbar = function () {
		this.update = function () {

			this.super('update');

			$(this.root).html("Toolbar");
		}
	};

	Toolbar.setup = function () {
		return {
			height: 50,
			style : {
				position: 'absolute',
				background: 'blue'
			}
		};
	}

	return Toolbar;

}, "app.component.core");
