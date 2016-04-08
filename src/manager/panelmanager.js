jui.define("app.manager.panelmanager", [], function () {
    var PanelManager = function () {
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

    return PanelManager;
});
