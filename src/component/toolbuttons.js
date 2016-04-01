jui.defineUI("app.component.toolbuttons", [], function () {

	var ToolButtons = function () {

		this.update = function () {

			this.super('update');

			$(this.root).html("Toolbuttons");
		}

	};

	ToolButtons.setup = function () {
		return {
			direction : 'left',
			width: 300,
			style : {
				position: 'absolute',
				background: 'pink'
			}
		};
	}

	return ToolButtons;

}, "app.component.core");
