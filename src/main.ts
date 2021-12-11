$( document ).ready(function() {
  $("#output").append("<font color=\"green\">请输入密码和用户名<br></font>");
  var objDiv = document.getElementById("output");
  objDiv.scrollTop = objDiv.scrollHeight;
  $("#send").on('click',function(){
    msg_send();
  })
  
  
  $('#input2').on('keypress',function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == 13){
        msg_send();
    }
  });


  // var ws = new WebSocket("ws://pdmchatclient.com:9990/chat");
  // console.log("Created socket");
  // ws.onopen = function() {
  //   var data = new FormData();
  //     data.append('chatreg',"chatreg");
  //     $.ajax( {
  //         url: '../Upload',
  //         type: 'POST',
  //         data: data,
  //         processData: false,
  //         contentType: false,
  //         success: function(data) {
  //             var response = jQuery.parseJSON(data);
  //             if(response.code == "success") {
  //                 console.log("Success!");
  //             } else if(response.code == "failure") {
  //                 console.log(response.err);
  //             }
  //             // getList(response);
  //         }
  //     } );
  //   // Web Socket is connected, send data using send()
  //   ws.send("Message to send");
  //   alert("Message is sent...");
  // };

  // ws.onmessage = function (evt) { 
  //   var received_msg = evt.data;
  //   alert("Message is received...");
  // };

  // ws.onclose = function() { 
    
  //   // websocket is closed.
  //   alert("Connection is closed..."); 
  // };
});

var Module = {
      onRuntimeInitialized: function() {
        // var a= Module.loader_check("1234","hello, how are you?");
        // console.log("in javascript: "+a);
        // var b = Module.loader_out("1234",a);
        // console.log("in javascript: "+b);
        $('#input1').val('');
        $('#input3').val('');
        
      }
    };

function msg_send(){
  var a = $("#input3").val();
  var b = $("#input1").val();
  if(a=="" || b==""){
    alert("请输入密码和用户名");
    return;
  }
  var objDiv = document.getElementById("output");
  var str = $("#input2").val();
  var encd= Module.loader_check(a,str);
  console.log("cypher:"+encd);
  var decd = Module.loader_out(a,encd);
  $("#outpZ ut").append("<font color=\"white\">"
    +Module.get_hash(str)+"<br>"
    +encd+"<br>"
    +"password: "+a+"<br>"
    +decd+"<br></font>");
  objDiv.scrollTop = objDiv.scrollHeight;
  $('#input2').val('');
}