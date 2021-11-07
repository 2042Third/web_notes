
$( document ).ready(function() {
    Module.onRuntimeInitialized= function() {
        
        var vec1 = new Module.CharList();
        var vec2 = new Module.CharList();


        let text_inp= "this is not a secret, but.";
        let inputVal = Uint8Array.from(text_inp);
        let text_key = "1234";
        let inputKey = Uint8Array.from(text_key);
        for (let i=0; i< text_inp.length ;i++) {
          vec1.push_back(inputVal[i]);
        }
        for (let i=0; i< text_key.length ;i++) {
          vec2.push_back(inputKey[i]);
        }


        var enc = new Module.Cc20();

        Console.log( Module.use_vector_string(vec1));


        // String input_t = Array.from(inputVal);
        // var outstr = new Array((inputVal.length+13)*"");
        // var outstr_dec = new Array((inputVal.length)*"");
        // enc.cmd_enc(input_t,inputVal.length,outstr,text_key);
        // enc.cmd_enc(outstr,inputVal.length+12,outstr_dec,text_key);
        // $("#output1").append(Module.loader_check());
        enc.delete();
        vec.delete();
    }

    var data = new FormData();
    data.append('listings','files list');
    
    $('#button1').click(function() {

       let inputVal = document.getElementsByClassName("inputClass2")[0].value;
      let text_key = document.getElementsByClassName("inputClass1")[0].value;
      var input_t = Array.from(inputVal);
      var outstr = new Array((inputVal.length+13)*"");
      var outstr_dec = new Array((inputVal.length)*"");
      Module.cmd_enc(input_t,inputVal.length,outstr,text_key);
      Module.cmd_enc(outstr,inputVal.length+12,outstr_dec,text_key);
      $("#output1").append(outstr_dec.toString());
    });


});