jui.define("app.config.editor", [], function () {
    var EditorConfig = {
        title : "Editor Manager",
        description : "Implements Editor Manager",
        settings : {

            // visible
            "show.left" : {
                type : "boolean",
                default: false,
                order : 0
            },
            "show.right" : {
                type : "boolean",
                default: false,
                order : 0
            },
            "show.top" : {
                type : "boolean",
                default: false,
                order : 0
            },
            "show.bottom" : {
                type : "boolean",
                default: false,
                order : 0
            },

            // size
            "size.left" : {
                type : "number",
                default: 240,
                order : 0
            },
            "size.right" : {
                type : "number",
                default: 240,
                order : 0
            },
            "size.top" : {
                type : "number",
                default: 0,
                order : 0
            },
            "size.bottom" : {
                type : "number",
                default: 240,
                order : 0
            },

            // panels
            "panels.left" : {
                type : "array",
                default: [],
                order : 0
            },
            "panels.right" : {
                type : "array",
                default: [],
                order : 0
            },
            "panels.top" : {
                type : "array",
                default: [],
                order : 0
            },
            "panels.bottom" : {
                type : "array",
                default: [],
                order : 0
            },
            "panels.content" : {
                type : "array",
                default: [],
                order : 0
            }
        }
    };

    return EditorConfig;
});