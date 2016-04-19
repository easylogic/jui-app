jui.define("app.config.layout", [], function () {
  var LayoutConfig = {
      title : "Layout Manager",
      description : "Implements Layout Manager",
      settings : {
        "show.toolbar" : {
          title : "Show Tool Bar",
          description : "xxx",
          type : "boolean",
          default: false,
          order : 0
        },
        "show.toolbuttons" : {
          title : "Show Tool Buttons",
          description : "xxx",
          type : "boolean",
          default: false,
          order : 1
        },
        "show.navigationbar" : {
          title : "Show Navigation Bar",
          description : "xxx",
          type : "boolean",
          default: false,
          order : 2
        },
        "show.statusbar" : {
          title : "Show Status Bar",
          description : "xxx",
          type : "boolean",
          default: false,
          order : 3
        },
        "show.editor.panel.left": {
          title : "Show Editor Panel For Left",
          description : "xxx",
          type : "boolean",
          default: false,
          order : 4
        },
        "show.editor.panel.right": {
          title : "Show Editor Panel For Right",
          description : "xxx",
          type : "boolean",
          default: false,
          order : 4
        },
        "show.editor.panel.top": {
          title : "Show Editor Panel For top",
          description : "xxx",
          type : "boolean",
          default: false,
          order : 4
        },
        "show.editor.panel.bottom": {
          title : "Show Editor Panel For bottom",
          description : "xxx",
          type : "boolean",
          default: false,
          order : 4
        }
      }
  };

  return LayoutConfig;
});