jui.define("app.toolbar.default", [], function () {
  var DefaultToolbar = {
      toolbar : [
        { action : "file:open"},
        { action : "file:save" },
        '-',
        { title: 'Undo', description: '', action: 'edit:undo' },
        { title: 'Redo', description: '', action: 'edit:redo' },
        '-',
        { title: 'Cut', description: '', action: 'edit:cut' }
      ]
  };

  return DefaultToolbar;
});