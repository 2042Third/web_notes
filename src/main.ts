var chat: web_chat;
var cryobj: crypt;

$( document ).ready(function() {
  append_terminal_gr("输入用户名和密码");
  $("#send").on('click',function(){
    if($('#input1').val()!=''){msg_send();}

  })
  $("#button").on('click',function(){
    var a = $("#username").val();//user1
    if(a==""){
      alert("请输入密码和用户名");
      return;
    }
    cryobj = new crypt();
    chat = new web_chat(cryobj.uhash);
    // cryobj.send_regi();
    chat.socket.onmessage = function (incoming) {
      cryobj.parse_new(incoming.data);
    };
  })
  
  $('#msginput').on('keypress',function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == 13){
        if($('#input1').val()!=''){msg_send();}
    }
  });
});
var Module = {
  onRuntimeInitialized: function() {
    $('#input1').val('');
    $('#username').val('');
  }
};
type none_init_msg = {
  msg: string;
  u1: String;
  u2: String;
  a:String;
};

class crypt {
  uhash: string ;
  u1:string;
  realid:string;
  constructor () {
    var tmp:string|undefined|number|string[];
    tmp = '';
    tmp = $("#username").val();
    if(tmp!='' && (typeof tmp === 'string' || tmp instanceof String)){
      this.u1=tmp;
      this.uhash=Module.get_hash(this.u1);
    }

  }

  // public send_regi () {
    
  // }

  private decor <string>(a:string) {
    return Module.loader_out($("#input1").val(),a);
  }

  public parse_new (a:string){
    console.log(a);
    var request = JSON.parse(a);
    switch(request["type"]){
      case "regi_ack":
        append_terminal_gr("服务器已连接！");
        this.realid=request["v1"];
        append_terminal_gr("用户id："+this.realid);
        append_terminal_gr("用户名："+this.u1);
        append_terminal_gr("用户哈希："+request['receiver']);

      break;
      case "msg":
        var receiver:string = request['receiver'];
        var out:string = this.new_recv(request['msg']);
        if(receiver == this.uhash){
          append_terminal_wh(out);
        }
        else {
          append_terminal_gr(out);
        }
      break;
      default: 
        console.log('unknown type message received');
      break;
    }
  }

  private new_recv<string>(a:string){
    var out:string = "";
    out = this.decor(a);
    if(out==''){
      append_terminal_rd("新信息无法解密，密码错误！");
      append_terminal_rd("New message cannot be decrypted, password incorrect!");
    }
    return out;
  }

}
function send_regi(){
    if (chat===null){
    return;
    }
    var rg = JSON.stringify(
        {
        type:    "register",
        sender:     cryobj.uhash,
        receiver:   "",
        v1:"",
        v2:"",
        v3:""
        }
    );
    console.log(rg);
    chat.send(rg);
}
function msg_init<String>(msg:none_init_msg ){
  var a = "";
  a = JSON.stringify(
      {
        p2phash:    Module.pp_hash(msg.u1,msg.u2),
        sender:     Module.get_hash(msg.u1),
        receiver:   Module.get_hash(msg.u2),
        msghash:    Module.get_hash(msg.msg),
        msg:        Module.loader_check(msg.a,msg.msg),
        val:        ""
      }
    );
  return a;
}

function get_from_page<String> (){
return $("#msginput").val();
}

function msg_send(){
  
  const mp : none_init_msg = {
      msg: get_from_page(),
      u1: $("#username").val(),
      u2: $("#username2").val(),
      a: $("#input1").val() 
    };
  chat.send(msg_init(mp));
  clear_input_msg();
}

function clear_input_msg(){
  $('#msginput').val('');
}

function append_terminal_wh (a:String) {
  $("#output").append("<font color=\"white\">"
      +a
      +"</font></br>");
  var objDiv = document.getElementById("output");
  objDiv.scrollTop = objDiv.scrollHeight;
}
function append_terminal_rd (a:String) {
  $("#output").append("<font color=\"red\">"
      +a
      +"</font></br>");
  var objDiv = document.getElementById("output");
  objDiv.scrollTop = objDiv.scrollHeight;
}
function append_terminal_gr (a:String) {
  $("#output").append("<font color=\"green\">"
    +a
    +"</font></br>");
  var objDiv = document.getElementById("output");
  objDiv.scrollTop = objDiv.scrollHeight;
}


