$( document ).ready(function() {
  $("#output").append("<font color=\"green\">请输入密码和用户名<br></font>");
  var objDiv = document.getElementById("output");
  objDiv.scrollTop = objDiv.scrollHeight;
  $("#send").on("click",function(){
    msg_send();
  })
  $('#someTextBox').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        msg_send();
    }
  });
});

var Module = {
      onRuntimeInitialized: function() {
        var a= Module.loader_check("1234","hello, how are you?");
        console.log("in javascript: "+a);
        var b = Module.loader_out("1234",a);
        console.log("in javascript: "+b);
        
      }
    };

function msg_send(){
  var objDiv = document.getElementById("output");
  var str = $("#input2").val();
  $("#output").append("<font color=\"white\">"+str+"<br></font>");
  objDiv.scrollTop = objDiv.scrollHeight;

}