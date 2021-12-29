import { Component, OnInit } from '@angular/core';
import { Cc20Component } from './../../security/cc20/cc20.component';
// import { Cc20Component } from "src/app/security/security.module";

type none_init_msg = {
  msg: string;
  u1: string;
  u2: string;
  a:string;
};

@Component({
  selector: 'platform-userio',
  templateUrl: './userio.component.html',
  styleUrls: ['./userio.component.scss']
})
export class UserioComponent implements OnInit {
  msg='';
  term='';
  private en?:Cc20Component;

  constructor(
    ) {
      this.en = new Cc20Component();
    }

  ngOnInit() {
  }
  handleSubmit(e){
    this.msg_send();
    this.msg='';
  }

  handleKeyUp(e){
    if(e.keyCode === 13){
      this.msg_send();
      this.msg='';
    }
  }
  public enc (inp:string){
    if(this.en==null){
      return "unable to encrypt!"
    }
    return this.en.encry(inp);
  }

  private msg_send(){

    const mp : none_init_msg = {
        msg: this.msg,
        u1:  "user1" ,
        u2:  "user2" ,
        a: "1234"
      };
    this.term+=(this.msg_init(mp));
  }

  private msg_init<String>(msg:none_init_msg ){
    var a = "";
    a = JSON.stringify(
      {
        type:    "msg",
        // p2phash:    Module.pp_hash(msg.u1,msg.u2),
        // sender:     Module.get_hash(msg.u1),
        // receiver:   Module.get_hash(msg.u2),
        // msghash:    Module.get_hash(msg.msg),
        msg:        this.enc(msg.msg)
      }
    );
    return a;
  }

}
