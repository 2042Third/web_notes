import { Component } from "@angular/core";
import { EmscriptenWasmComponent } from "../emscripten-wasm.component";

interface MyEmscriptenModule extends EmscriptenModule {
  loader_check(a:string,inp: string): string;
}

type none_init_msg = {
  msg: string;
  u1: string;
  u2: string;
  a:string;
};

@Component({
  selector: 'security-cc20',
  templateUrl: './cc20.component.html',
  styleUrls: ['./cc20.component.scss']
})
export class Cc20Component extends EmscriptenWasmComponent<MyEmscriptenModule> {
  a:string="1234";
  loaded:boolean=false;
  constructor() {
    super("Cc20Module", "notes.js");
  }
  encry(inp: string):string {
    return this.module.loader_check(this.a,inp);
  }
  msg='';
  term='';

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
    if(this.module==null){
      return "unable to encrypt!"
    }
    return this.module.loader_check(this.a,inp);
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
        msg:    this.enc(msg.msg)
      }
    );
    return a;
  }
}
