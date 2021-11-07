$( document ).ready(function() {
    Module.onRuntimeInitialized= function() {
        
        var vec = new Module.CharList();



        let inputVal = new String("this is not a secret, but.");
        let text_key = "1234";
        for (let character of inputVal) {
          vec.push_back((char)character);
        }
        var enc = new Module.Cc20();

        Console.log( Module.use_vector_string(vec));


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