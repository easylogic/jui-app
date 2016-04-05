jui.define("app.menu.default", [], function () {
  var DefaultMenu = {
      menu : [
        {
          title : "File",
          submenu : [
            { title : 'Open File..', action : "file:open" },
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
        }
      ]
  };

  return DefaultMenu;
});