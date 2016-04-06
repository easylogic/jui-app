jui.define("app.manager.actionmanager", [], function () {
    var ActionManager = function () {
        var list = [];
        var keys = {};

        this.add = function (name, obj) {
            list.push(obj);
            keys[name] = obj;
        };

        this.get = function (name) {
            return keys[name] || {};
        };

        this.list = function () {
            return list;
        }
    };

    return ActionManager;
});
