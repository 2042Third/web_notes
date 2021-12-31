import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
export const WS_ENDPOINT = environment.WB_SOCKS;

@Injectable({
  providedIn: 'root'
})
export class WebsockService {
  private socket$: WebSocketSubject<any>| WebSocket;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));
  public isActive:boolean=false;
  public connect(): void {

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);

    }
    this.socket$.onopen = function () {
    };

    this.socket$.onclose = function () {
    };
  }

  private getNewWebSocket() {
    return webSocket(WS_ENDPOINT);
  }
  sendMessage(msg: any) {
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete();
  }

}
