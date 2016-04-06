jui.define("app.plugins.view", [], function () {
   var ViewPlugin = function (app) {

       app.action("view:toggle-toolbar", {
           click : function () {
               app.config.toggle("layout:show.toolbar");
           }
       });

       app.action("view:toggle-navigationbar", {
           click : function () {
               app.config.toggle("layout:show.navigationbar");
           }
       });

       app.action("view:toggle-toolbuttons", {
           click : function () {
               app.config.toggle("layout:show.toolbuttons");
           }
       });

       app.action("view:toggle-statusbar", {
           click : function () {
               app.config.toggle("layout:show.statusbar");
           }
       });
   };

   return ViewPlugin;
}, "app.plugin.core");
