jui.define("app.plugins.file", [], function () {
   var FilePlugin = function (app) {

       app.addAction("file:open", {
           title : "Open",
           description : "파일을 열어보자.",
           icon : null,
           shortcut : "ALT+O",
           click : function () {
               app.alert('this is inner alert system.');
           }
       });

       app.addAction("file:save", {
           title : 'Save',
           description : "여기는 저장하는거야",
           icon : null,
           shortcut : 'ALT+S',
           click : function () {
               app.alert('this is save function');
           }
       });

   };

   return FilePlugin;
}, "app.plugin.core");
