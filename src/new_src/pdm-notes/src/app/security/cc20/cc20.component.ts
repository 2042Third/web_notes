import { Component } from "@angular/core";
import { EmscriptenWasmComponent } from "../emscripten-wasm.component";
import { WebsockService } from "src/app/websock/websock.service";
import { catchError, map, Observable, tap } from "rxjs";

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
  liveData:Observable<any>;
  val:string;

  msg='';
  term='';
  constructor(
    private sock: WebsockService,

  ) {
    super("Cc20Module", "notes.js");
    this.liveData = this.sock.messages$.pipe(
      map(rows => rows.data),
      catchError(error => { throw error }),
      tap({
        error: error => console.log('[Live component] Error:', error),
        complete: () => console.log('[Live component] Connection Closed')
      }
      )
    );
    this.val="";
    this.liveData.subscribe(val=>this.term+="<font color=green bold=\"true\">"+val+"\n"+"</font>");
  }
  encry(inp: string):string {
    return this.module.loader_check(this.a,inp);
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
