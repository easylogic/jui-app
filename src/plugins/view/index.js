jui.define("app.plugins.view", [], function () {
   var ViewPlugin = function (app) {

       this.namespace = "view";

       this.init(app);

       this.action("toggle-toolbar", {
           click : function () {
               app.config.toggle("layout:show.toolbar");
           }
       });

       this.action("toggle-navigationbar", {
           click : function () {
               app.config.toggle("layout:show.navigationbar");
           }
       });

       this.action("toggle-toolbuttons", {
           click : function () {
               app.config.toggle("layout:show.toolbuttons");
           }
       });

       this.action("toggle-statusbar", {
           click : function () {
               app.config.toggle("layout:show.statusbar");
           }
       });
   };

   return ViewPlugin;
}, "app.plugin.core");
