"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$(document).ready(function () {
    (() => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('notes.wasm');
        const file = yield response.arrayBuffer();
        const wasm = yield WebAssembly.instantiate(file);
        var a = wasm.loader_check("1234", "12345");
        var b = wasm.loader_out("1234", a);
        //   const nByte = 1;
        //   const text_inp = "this is not a secret, but.";
        //   let inputVal = (new Uint8Array(text_inp.length + 1)); 
        //   let tmp = text_inp.split('').map(letter => letter.charCodeAt(0));
        //   for (let i = 0; i < text_inp.length; i++) {
        //     // vec1.push_back(inputVal[i]);
        //     inputVal[i] = tmp[i];
        //   }
        //   const ptr_inp = wasm._malloc(text_inp.length * nByte);
        //   Module.HEAPU8.set(inputVal, ptr_inp / nByte);
        //   let outVal = (new Uint8Array(text_inp.length + 13));
        //   const ptr_out = Module._malloc(outVal.length * nByte);
        //   Module.HEAPU8.set(outVal, ptr_out / nByte);
        //   let text_key = "1234";
        //   Module.cmd_enc(ptr_inp, inputVal.length, ptr_out, text_key);
        //   Module.cmd_dec(ptr_out, inputVal.length+12, ptr_inp, text_key);
        //   const resData = Module.HEAPU8.subarray(ptr_inp, ptr_inp + inputVal.length);
        //   $("#output1").append(resData);
        //   Module._free(ptr_inp);
        //   Module._free(ptr_out);
        // var data = new FormData();
        // data.append('listings', 'files list');
    }))();
});
