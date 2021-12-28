import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {EmscriptenWasmComponent} 

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  a:string;
  loaded:boolean=false;

  constructor(private http: HttpClient) {
    this.a = "1234";
  }

  ngOnInit(): void {
    this.instantiateWasm(`${environment.wasmAssetsPath}/notes.wasm`, {}).then((result) => {
      const wasmInstance = result.instance;
      this.loaded = true;
    });
  }

  private instantiateWasm(
    url: string,
    imports?: WebAssembly.Imports
  ): Promise<WebAssembly.WebAssemblyInstantiatedSource> {
    return this.http
      .get(url, { responseType: "arraybuffer" })
      .pipe(mergeMap((bytes) => WebAssembly.instantiate(bytes, imports)))
      .toPromise();
  }

  // private unsubscribeRun() {
  //   if (this.runSubscription) {
  //     this.runSubscription.unsubscribe();
  //   }
  // }

}
