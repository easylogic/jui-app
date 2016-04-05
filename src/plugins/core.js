jui.define("app.plugin.core", [], function () {
   var Core = function () {

       var _app;


       this.init = function (app)  {
           _app = app;
           this.initPlugin();
       };

       this.getName = function (name) {
           return [this.name, name].join(":");
       }

       /**
        * �׼� ���
        */
       this.action = function (name, objOrCallback) {

           if (arguments.length == 1) {
               return _app.getAction(this.getName(name));
           }


           if (typeof objOrCallback == 'function') {
               objOrCallback = objOrCallback.call(this);        // �Լ��� ������ ��ü�� �����Ѵ�.
           }

            _app.addAction(this.getName(name), objOrCallback || {});
       }

       this.initPlugin = function () {

       }



       this.init();
   };

   return Core;
});
