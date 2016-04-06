jui.define("app.plugins.view", [], function () {
   var ViewPlugin = function (app) {

       app.addAction("view:toggle-toolbar", {
           click : function () {
               //app.emit("toggle", "toolbar");
               app.config.toggle("layout:show.toolbar");
           }
       });

       app.addAction("view:toggle-navigationbar", {
           click : function () {
               //app.emit("toggle", "navigationbar");
               app.config.toggle("layout:show.navigationbar");
           }
       });

       app.addAction("view:toggle-toolbuttons", {
           click : function () {
               app.emit("toggle", "toolbuttons");
           }
       });

       app.addAction("view:toggle-statusbar", {
           click : function () {
               //app.emit("toggle", "statusbar");
               app.config.toggle("layout:show.statusbar");
           }
       });
   };

   return ViewPlugin;
}, "app.plugin.core");
