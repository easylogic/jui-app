jui.define("app.menu.default", [], function () {
  var DefaultMenu = {
      menu : [
        {
          title : "File",
          submenu : [
            { title : 'Open File..', action : "file:open", shortcut : "ALT+O" },
            '-',
            { title : 'Save..', action : "file:save" }
          ]
        },
        {
          title : 'Edit',
          submenu : [
            { title: 'Undo', description: '', action: 'edit:undo' },
            { title: 'Redo', description: '', action: 'edit:redo' },
            '-',
            { title: 'Cut', description: '', action: 'edit:cut' }
          ]
        },
        {
          title : "View",
          submenu : [
            { type : 'checkbox', title : "Tool Bar", checked : function(app) {  return !app.isHide("toolbar");}, action : "view:toggle-toolbar"},
            { type : 'checkbox', title : "Tool Buttons", checked : true, action : "view:toggle-toolbuttons"},
            { type : 'checkbox', title : "Navigation Bar", checked : function(app) {  return !app.isHide("navigationbar");}, action : "view:toggle-navigationbar"},
            { type : 'checkbox', title : "Status Bar", checked : function(app) {  return !app.isHide("statusbar");}, action : "view:toggle-statusbar"}
          ]
        }
      ]
  };

  return DefaultMenu;
});