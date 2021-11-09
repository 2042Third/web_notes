"use strict";
$(document).ready(function () {
    Module.onRuntimeInitialized = function () {
        const nByte = 1;
        const text_inp = "this is not a secret, but.";
        let inputVal = (new Uint8Array(text_inp.length + 1));
        let tmp = text_inp.split('').map(letter => letter.charCodeAt(0));
        for (let i = 0; i < text_inp.length; i++) {
            // vec1.push_back(inputVal[i]);
            inputVal[i] = tmp[i];
        }
        const ptr_inp = Module._malloc(text_inp.length * nByte);
        Module.HEAPU8.set(inputVal, ptr_inp / nByte);
        let outVal = (new Uint8Array(text_inp.length + 13));
        const ptr_out = Module._malloc(outVal.length * nByte);
        Module.HEAPU8.set(outVal, ptr_out / nByte);
        let text_key = "1234";
        Module.cmd_enc(ptr_inp, inputVal.length, ptr_out, text_key);
        Module.cmd_enc(ptr_out, inputVal.length + 12, ptr_inp, text_key);
        const resData = Module.HEAPU8.subarray(ptr_inp, ptr_inp + inputVal.length);
        $("#output1").append(resData);
        Module._free(ptr_inp);
        Module._free(ptr_out);
    };
    var data = new FormData();
    data.append('listings', 'files list');
    $('#button1').click(function () {
        var cry = new Module.Cc20();
        let inputVal = document.getElementsByClassName("inputClass2")[0].value;
        let text_key = new String(document.getElementsByClassName("inputClass1")[0].value);
        var input_t = Uint8Array.from(inputVal);
        var outstr = new Uint8Array((inputVal.length + 13) * "");
        var outstr_dec = new Uint8Array((inputVal.length) * "");
        cry.cmd_enc(input_t, inputVal.length, outstr, text_key);
        cry.cmd_dec(outstr, inputVal.length + 12, outstr_dec, text_key);
        $("#output1").append(outstr_dec.toString());
        cry.delete();
    });
});
