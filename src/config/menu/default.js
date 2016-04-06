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
            { type : 'checkbox', title : "Tool Bar", config : "layout:show.toolbar", action : "view:toggle-toolbar"},
            { type : 'checkbox', title : "Tool Buttons", config : "layout:show.toolbuttons", action : "view:toggle-toolbuttons"},
            { type : 'checkbox', title : "Navigation Bar", config : "layout:show.navigationbar", action : "view:toggle-navigationbar"},
            { type : 'checkbox', title : "Status Bar", config : "layout:show.statusbar", action : "view:toggle-statusbar"}
          ]
        }
      ]
  };

  return DefaultMenu;
});