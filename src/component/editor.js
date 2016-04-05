jui.defineUI("app.component.editor", [], function () {

	var Editor = function () {

		this.update = function () {

			this.super('update');

			$(this.root).html("editor");
		}

	};

	Editor.setup = function () {
		return {
			style : {
				position: 'absolute',
				background: 'green',
				overflow: 'hidden'
			}
		};
	}

	return Editor;

}, "app.component.core");
