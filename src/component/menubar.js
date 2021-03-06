jui.defineUI("app.component.menubar", [ "ui.dropdown" ], function (Dropdown) {


	/**
	 * 메뉴바는 tree 형태로 데이타 구조를 저장한다
	 *
	 * 미리 정해진 액션에 의해서 정의된다
	 *,
	 * * dropdown-menu
	 * * dropdown-submenu
	 * * radio-button
	 * *
	 *
	 * @constructor
	 */


	var Menubar = function () {
		var self = this;
		var clicked = false;

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

			this.$root.html(this.createMenuBar());
		};

		this.createMenuBar = function () {
			var menuName = "app.menu." + this.app.opt("menu");
			var menu = jui.include(menuName).menu;

			var $temp = [];

			menu.forEach(function(root) {
				$temp.push(self.createMenu(root));
			});

			return $temp;
		}

		this.createMenu = function (root) {
			var $btn = $('<button class="btn" type="button"/>').html(root.title).css({
				'border-radius': 0,
				'height' : '100%',
				'position' : 'relative',
				'border': '0px',
				'line-height' : '100%',
				'padding' : '0px 20px',
				'outline' : 'none',
				'background-color' : '#181818',
				'background-image' : 'none'
			});

			if (root.submenu) {
				var submenu = this.createSubMenu($btn, root.submenu);
				$btn.on('click', function(e) {
					$btn.after(submenu.root);
					submenu.show($btn.position().left, $btn.height());
					clicked = true;
				});

				$btn.on('mouseover', function(e) {
					if (clicked) {
						$btn.after(submenu.root);
						submenu.show($btn.position().left, $btn.height());
					}

				});


			}

			return $btn;
		}

		this.createCheckBox = function (m, dropdownObject) {
			m.icon = "icon-check";
			var $li = this.createButton(m, dropdownObject);

			var checked = m.checked;

			if (m.config) {
				checked = this.config.get(m.config);
			}

			var $imgArea = $li.find(".img-area");
			$imgArea.toggle(!!checked);

			this.config.on(m.config, function (value) {
				$imgArea.toggle(value);
			});

			return $li;
		};

		this.createDivider = function (m, dropdownObject) {
			return "<li class='divider' />";
		};

		this.createButton = function (m, dropdownObject) {
			var $imgArea = $("<div class='img-area' />").css({
				display: 'inline-block',
				position: 'absolute',
				top:0,
				bottom:0,
				left:-10,
				width:20,
				padding:'0px 5px',
				'box-sizing' : 'border-box',
				'background-color': '#181818'
			});
			var $a = $("<a />").html(" " + m.title).attr('title', m.description).css({
				position: 'relative',
				'padding-left': 12
			});

			$a.prepend($imgArea);

			if (m.img) {
				$imgArea.prepend("<img src='" + m.img + "' />");
			} else if (m.icon) {
				$imgArea.prepend("<i class='" + m.icon + "'></i> ");
			} else {
				$imgArea.hide();
			}

			var $shortcut = $("<span />").html(m.shortcut).css({
				float: 'right'
			});

			var $li = $("<li />").html($a).css({
				'background-image' : 'none'
			}).append($shortcut);

			$li.click(function(e) {
				dropdownObject.hide();
				self.run(m.action);
			});

			return $li;
		}

		this.createSubMenu = function ($btn, submenu) {
			var self = this;
			var $dropdown = $("<div class='dropdown' ><ul></ul></div>").css({
				border: '0px'
			});
			var $ul = $dropdown.find("ul").css({
				'border-radius': '0px',
				width: 200
			});

			var dropdownObject = new Dropdown($dropdown, {
				event : {
					show : function () {
						$btn.addClass('active').css({
							'background-color' : '#4E4E4E'
						});
					},
					hide : function () {
						$btn.removeClass('active').css({
							'background-color' : '#181818'
						});
					}
				}
			});

			submenu.forEach(function(m) {
				if (m == '-') {
					$ul.append(self.createDivider(m, dropdownObject));
				} else if (m.type == 'checkbox') {
					$ul.append(self.createCheckBox(m, dropdownObject));
				} else {
					$ul.append(self.createButton(m, dropdownObject));

				}
			});

			return dropdownObject ;
		}

	};

	Menubar.setup = function () {
		return {
			menus : [],
			height: 30,
			style : {
				'box-sizing' : 'border-box',
				position: 'absolute',
				background: '#181818'
			}
		};
	}

	return Menubar;

}, "app.component.core");
