jui.define("app.config.toolbuttons", [], function () {
    var ToolButtonsConfig = {
        title : "ToolButtons Manager",
        description : "Implements ToolButtons Manager",
        settings : {
            "left" : {
                type : "array",
                default: [],
                order : 0
            },
            "right" : {
                type : "array",
                default: [],
                order : 0
            },
            "top" : {
                type : "array",
                default: [],
                order : 0
            },
            "bottom" : {
                type : "array",
                default: [],
                order : 0
            }
        }
    };

    return ToolButtonsConfig;
});