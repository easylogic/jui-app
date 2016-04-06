jui.define("app.plugins.file", [], function () {
   var FilePlugin = function (app) {

       app.action("file:open", {
           title : "File",
           description : "",
           icon : 'icon-report2',
           click : function () {
               app.alert('this is inner alert system.');
           }
       });

       app.action("file:save", {
           title : 'Save',
           click : function () {
               app.alert('this is save function');
           }
       });

   };

   return FilePlugin;
}, "app.plugin.core");
