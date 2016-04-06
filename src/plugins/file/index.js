jui.define("app.plugins.file", [], function () {
   var FilePlugin = function (app) {

       app.config.on("layout:show.toolbar", function(newValue, oldValue) {

       });

       app.addAction("file:open", {
           title : "File",
           description : "",
           icon : 'icon-report2',
           click : function () {
               app.alert('this is inner alert system.');
           }
       });

       app.addAction("file:save", {
           title : 'Save',
           click : function () {
               app.alert('this is save function');
           }
       });

   };

   return FilePlugin;
}, "app.plugin.core");
