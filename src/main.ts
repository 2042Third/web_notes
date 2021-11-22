$( document ).ready(function() {
  $("#output").append("<font color=\"green\">请输入密码和用户名<br></font>");
  var objDiv = document.getElementById("output");
  objDiv.scrollTop = objDiv.scrollHeight;
});

var Module = {
      onRuntimeInitialized: function() {
        var a= Module.loader_check("1234","hello, how are you?");
        console.log("in javascript: "+a);
        var b = Module.loader_out("1234",a);
        console.log("in javascript: "+b);
        
      }
    };