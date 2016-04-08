jui.define("app.plugins.file", [], function () {
   var FilePlugin = function (app) {

       this.namespace = "file";

       this.init(app);

       this.action("open", {
           title : "File",
           description : "",
           icon : 'icon-report2',
           click : function () {
               app.alert('this is inner alert system.');
           }
       });

       this.action("save", {
           title : 'Save',
           click : function () {
               app.alert('this is save function');
           }
       });
   };

   return FilePlugin;
}, "app.plugin.core");
