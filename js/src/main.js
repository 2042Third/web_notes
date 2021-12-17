"use strict";
$(document).ready(function () {
    $("#output").append("<font color=\"green\">请输入密码和用户名<br></font>");
    var objDiv = document.getElementById("output");
    objDiv.scrollTop = objDiv.scrollHeight;
    $("#send").on('click', function () {
        msg_send();
    });
    $('#input2').on('keypress', function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) {
            msg_send();
        }
    });
});
var Module = {
    onRuntimeInitialized: function () {
        // var a= Module.loader_check("1234","hello, how are you?");
        // console.log("in javascript: "+a);
        // var b = Module.loader_out("1234",a);
        // console.log("in javascript: "+b);
        $('#input1').val('');
        $('#input3').val('');
    }
};
function msg_send() {
    var a = $("#input3").val();
    var b = $("#input1").val();
    if (a == "" || b == "") {
        alert("请输入密码和用户名");
        return;
    }
    var objDiv = document.getElementById("output");
    var str = $("#input2").val();
    var encd = Module.loader_check(a, str);
    console.log("cypher: " + encd);
    var decd = Module.loader_out(a, encd);
    $("#output").append("<font color=\"white\">"
        + Module.get_hash(str) + "<br>"
        + encd + "<br>"
        + "password: " + a + "<br>"
        + decd + "<br></font>");
    objDiv.scrollTop = objDiv.scrollHeight;
    $('#input2').val('');
}
