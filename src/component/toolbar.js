jui.defineUI("app.component.toolbar", [], function () {

	var Toolbar = function () {
		var self = this;
		this.update = function () {

			this.super('update');

			$(this.root).html(this.createToolbar());
		}

		this.createToolbar = function () {
			var toolbarName = "app.toolbar." + this.app().opt("toolbar");
			var toolbar = jui.include(toolbarName).toolbar;

			var $temp = [];

			toolbar.forEach(function(root) {

				if (root == '-') {
					var $divider = $("<div />").html("&nbsp;").css({
						width: '2px',
						'display' : 'inline-block',
						'border-right' : '1px dotted gray',
						'margin-right' : '2px'
					});
					$temp.push($divider);
				} else {
					$temp.push(self.createToolbarButton(root));
				}

			});

			return $temp;
		}

		this.createToolbarButton = function (root) {

			var action = this.action(root.action);

			var title = action.title || root.title;
			var img = action.img || root.img;
			var icon = action.icon || root.icon;

			var content = title;

			if (img) {
				content = "<img src='" + img + "' />";
			} else if (icon) {
				content = "<i class='" + icon + "'></i>";
			}

			var $btn = $('<button class="btn" type="button"/>').html(content).css({
				'border-radius': 0,
				'padding' : '0px 8px',
				'border': '0px',
				'line-height' : '100%',
				'outline' : 'none',
				'background-image' : 'none'
			}).attr({
				title : title
			});

			$btn.on('click', function (e) {
				action.click && action.click(e);
			});

			return $btn;
		}
	};

	Toolbar.setup = function () {
		return {
			height: 40,
			style : {
				padding: '5px 10px',
				'box-sizing' : 'border-box',
				position: 'absolute',
				background: '#4e4e4e'
			}
		};
	}

	return Toolbar;

}, "app.component.core");
