jui.defineUI("app.component.navigationbar", [], function () {

	var NavigationBar = function () {
		var self = this;


		this.initEvent = function () {
			this.super('initEvent');

			this.app().on('init', function () {
				self.update();
			})
		};


		this.update = function () {

			this.super('update');

			$(this.root).html(this.createNavigationBar());
		};

		this.createDivider = function () {

			var height = this.options.height-2;
			var half_height = height / 2;

			var $divider = $("<button class='btn' type='button' />").css({
				border:'0px',
				height: '100%',
				padding: '0px',
				'border-radius': '0px',
				'box-sizing' : 'border-box',
				outline : 0
			});

			var svg = '<svg width="10px" height="'+height+'">' +
				'<path d="M0,2 L10,15 L0,28" stroke="white" stroke-width="0.5" fill="transparent" />' +
				'</svg>';

			$divider.append(svg);

			return [$divider];
		};

		this.createNavigationBar = function () {
			var items = this.app().opt('nav');
			var $left = $("<div class='left' />").css({
				float: 'left',
				height: '100%'
			})

			items.forEach(function(item, index) {
				var title = item.title;
				var $content = $('<button class="btn" />').css({
					border:'0px',
					height: '100%',
					padding: '0px 10px',
					'border-radius': '0px',
					'box-sizing' : 'border-box',
					outline : 0
				}).html(title);

				$content.on('click',item.click);

				if (index > 0) {
					$left.append(self.createDivider());
				}

				$left.append($content);
			});

			return [$left];
		}

	};

	NavigationBar.setup = function () {
		return {
			height: 30,
			style : {
				padding:0,
				'box-sizing' : 'border-box',
				position: 'absolute',
				background: '#4e4e4e',
				'border-top': '1px solid #666666',
				'border-bottom': '1px solid #666666'
			}
		};
	}

	return NavigationBar;

}, "app.component.core");
