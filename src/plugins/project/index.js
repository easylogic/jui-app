jui.define("app.plugins.project", [], function () {
    var ProjectPlugin = function (app) {

        this.namespace = "project";

        this.init(app);

        this.panel("tree", {
            title : "Project1",
            description : "",
            icon : ""
        });

        this.panel("grunt", {
            title : "Grunt",
            index: 1,
            description : "",
            icon : ""
        });

        app.config.push("toolbuttons:left", this.getName("tree"));
        app.config.push("toolbuttons:left", this.getName("tree"));
        app.config.push("toolbuttons:left", this.getName("tree"));

        app.config.push("toolbuttons:right", this.getName("grunt"));
        app.config.push("toolbuttons:right", this.getName("grunt"));
        app.config.push("toolbuttons:right", this.getName("grunt"));

    };

    return ProjectPlugin;
}, "app.plugin.core");
