jui.define("app.manager.configmanager", [], function () {
    var ApplicationConfig = function (app) {

        var data = {};
        var event = {} ;

        this.get = function (name) {
            var arr = name.split(":");

            var key = arr[0];
            var config = arr[1];
            data[key] = data[key] || {};

            return data[key][config];
        };

        this.set = function (name, value, isNotFire) {

            var arr = name.split(":");

            var key = arr[0];
            var config = arr[1];
            data[key] = data[key] || {};

            var oldValue = data[key][config];
            data[key][config] = value;

            if (!isNotFire) {
                this.dispatch(name, value, oldValue);
            }

        };

        this.toggle = function (name) {
            this.set(name, !this.get(name));
        };

        this.on = function (name, callback) {
            event[name] = event[name] || [];
            event[name].push(callback);
            return callback;
        }

        this.off = function (name, callback) {
            if (arguments.length ==1) {
                event[name] = null;
                delete event[name];
            } else {
                event[name] = event[name] || [];

                var temp = [];
                for(var i = 0, len = event[name].length; i < len; i++) {
                    if (event[name][i] == callback) {
                        continue;
                    }
                    temp.push(event[name][i]);
                }
            }
        }

        this.dispatch = function (name, value, oldValue) {
            var events = event[name] || [];

            for(var i = 0, len = events.length; i < len; i++) {
                events[i].call(app, value, oldValue);
            }
        }
    };

    return ApplicationConfig;
});