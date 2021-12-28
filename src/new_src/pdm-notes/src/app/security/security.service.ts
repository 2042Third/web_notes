import { Injectable } from '@angular/core';
import {pdm_root} from '../vars/globals';
import { Observable, BehaviorSubject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { environment } from "../../environments/environment";


// declare var Module: any;
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  module: any
  private a:string
  wasmReady = new BehaviorSubject<boolean>(false)

  constructor() {
    this.instantiateWasm('wasm/notes.wasm');
    //debug
    this.a = "1234";
  }

  public enc(input: string): string{
  return this.module.loader_check(this.a,input)
  }

  private async instantiateWasm(url: string){
    // fetch the wasm file
    const wasmFile = await fetch(url);

    // convert it into a binary array
    const buffer = await wasmFile.arrayBuffer();
    const binary = new Uint8Array(buffer);

    // create module arguments
    // including the wasm-file
    const moduleArgs = {
      wasmBinary: binary,
      onRuntimeInitialized: () => {
        console.log("compiletely loaded");
      }
    };

    // instantiate the module
    this.module = Module(moduleArgs);
  }

}
