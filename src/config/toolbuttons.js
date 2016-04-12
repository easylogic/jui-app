jui.define("app.config.toolbuttons", [], function () {
    var ToolButtonsConfig = {
        title : "ToolButtons Manager",
        description : "Implements ToolButtons Manager",
        settings : {
            "drag.object" : {
              type : 'object',
              default : {}
            },
            "drag.direction" : {
                type : 'string',
                default : "left"
            },
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