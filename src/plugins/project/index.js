jui.define("app.plugins.project", [], function () {
    var ProjectPlugin = function (app) {

        this.namespace = "project";

        this.init(app);

        this.panel("tree", {
            title : "Project",
            description : "",
            icon : ""
        });

        this.panel("grunt", {
            title : "Grunt",
            index: 1,
            description : "",
            icon : ""
        });

        app.config.push("toolbuttons:left", { panel : this.getName("tree"), index : 0 });
        app.config.push("toolbuttons:left", { panel : this.getName("tree"), index : 0 });
        app.config.push("toolbuttons:left", { panel : this.getName("tree"), index : 0 });

        app.config.push("toolbuttons:right", { panel : this.getName("tree"), index : 0 });
        app.config.push("toolbuttons:right", { panel : this.getName("tree"), index : 0 });
        app.config.push("toolbuttons:right", { panel : this.getName("tree"), index : 0 });

    };

    return ProjectPlugin;
}, "app.plugin.core");
