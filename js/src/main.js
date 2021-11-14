"use strict";
var Module = {
    onRuntimeInitialized: function () {
        var a = Module.loader_check("1234", "hello, how are you?");
        console.log("in javascript: " + a);
        var b = Module.loader_out("1234", a);
        console.log("in javascript: " + b);
    }
};
