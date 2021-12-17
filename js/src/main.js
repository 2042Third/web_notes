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
    var a = $("#input3").val(); //user1
    var u2 = $("#input4").val(); //user2
    var b = $("#input1").val();
    if (a == "" || b == "") {
        alert("请输入密码和用户名");
        return;
    }
    var objDiv = document.getElementById("output");
    let str = $("#input2").val();
    var encd = Module.loader_check(b, str);
    console.log("cypher: " + encd);
    var decd = Module.loader_out(b, encd);
    // const mp = new none_init_msg(str,a,u2,b);
    const mp = {
        msg: str,
        u1: a,
        u2: u2,
        a: b
    };
    $("#output").append("<font color=\"white\">"
        + msg_init(mp)
        + "</font>");
    objDiv.scrollTop = objDiv.scrollHeight;
    $('#input2').val('');
}
function msg_init(msg) {
    var a = "";
    a = JSON.stringify({
        p2phash: Module.pp_hash(msg.u1, msg.u2),
        sender: Module.get_hash(msg.u1),
        receiver: Module.get_hash(msg.u2),
        mhash: Module.get_hash(msg.msg),
        msg: Module.loader_check(msg.a, msg.msg)
    });
    return a;
}
