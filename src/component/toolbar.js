jui.defineUI("app.component.toolbar", [], function () {

	var Toolbar = function () {
		this.update = function () {

			this.super('update');

			$(this.root).html("Toolbar");
		}
	};

	Toolbar.setup = function () {
		return {
			height: 40,
			style : {
				padding:10,
				'box-sizing' : 'border-box',
				position: 'absolute',
				background: 'blue'
			}
		};
	}

	return Toolbar;

}, "app.component.core");
