jui.define("app.manager.configmanager", [], function () {
    var ApplicationConfig = function (app) {

        var self = this;
        var data = {};
        var event = {} ;

        this.get = function (name) {
            var arr = name.split(":");

            var key = arr[0];
            var ConfigObject = jui.include("app.config." + key);

            var config = arr[1];
            data[key] = data[key] || {};

            return data[key][config] || ConfigObject.settings[config].default;
        };

        this.casting = function (value, configInfo) {
            if (typeof value == 'undefined') return configInfo.default;

            switch(configInfo.type) {
                case "boolean":
                    return new Boolean(value).valueOf();
                case "integer":
                    value = parseInt(value, 10);
                    if (typeof configInfo.minimum != 'undefined') {
                        if (configInfo.minimum > value) value = configInfo.minimum;
                    }
                    if (typeof configInfo.maximum != 'undefined') {
                        if (configInfo.maximum < value) value = configInfo.maximum;
                    }
                    return value;
                case "string":
                    return value + "";
                    break;
                case "number":
                    value = parseFloat(value);
                    if (typeof configInfo.minimum != 'undefined') {
                        if (configInfo.minimum > value) value = configInfo.minimum;
                    }
                    if (typeof configInfo.maximum != 'undefined') {
                        if (configInfo.maximum < value) value = configInfo.maximum;
                    }
                    return value;
                    break;
            }

            return value;
        }

        this.set = function (name, value, isNotFire) {

            var arr = name.split(":");

            var key = arr[0];

            var ConfigObject = jui.include("app.config." + key);
            var config = arr[1];

            var configInfo = ConfigObject.settings[config];

            data[key] = data[key] || {};
            var oldValue = data[key][config];
            data[key][config] = this.casting(value, configInfo);

            if (!isNotFire) {
                this.dispatch(name, data[key][config], oldValue);
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

            console.log(name, value);

            for(var i = 0, len = events.length; i < len; i++) {
                events[i].call(app, value, oldValue);
            }
        }

        this.import = function (json) {

            Object.keys(json).forEach(function(key) {
                self.set(key, json[key], true);
            })
        }

        this.export = function () {
            return data;
        }
    };

    return ApplicationConfig;
});