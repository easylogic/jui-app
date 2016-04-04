jui.defineUI("app.component.menubar", [], function () {


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
		this.update = function () {

			this.super('update');

			$(this.root).html(this.createMenu());
		};


		this.createMenu = function () {

		}

	};

	Menubar.setup = function () {
		return {
			menus : [],
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
