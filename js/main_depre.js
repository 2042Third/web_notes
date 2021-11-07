
$( document ).ready(function() {
    Module.onRuntimeInitialized= function() {
        
        var vec1 = new Module.CharList();
        var vec2 = new Module.CharList();


        let text_inp= new String("this is not a secret, but.");
        let inputVal = Uint8Array.from(text_inp);
        let text_key = new String("1234");
        let inputKey = Uint8Array.from(text_key);
        for (let i=0; i< text_inp.length ;i++) {
          vec1.push_back(inputVal[i]);
        }
        for (let i=0; i< text_key.length ;i++) {
          vec2.push_back(inputKey[i]);
        }


        var enc = new Module.Cc20();

        Module.use_vector_string(vec1);
        Module.use_vector_string(vec2);


        // String input_t = Array.from(inputVal);
        // var outstr = new Array((inputVal.length+13)*"");
        // var outstr_dec = new Array((inputVal.length)*"");
        // enc.cmd_enc(input_t,inputVal.length,outstr,text_key);
        // enc.cmd_enc(outstr,inputVal.length+12,outstr_dec,text_key);
        $("#output1").append(Module.loader_check());
        enc.delete();
        vec1.delete();
        vec2.delete();
    }

    var data = new FormData();
    data.append('listings','files list');
    
    $('#button1').click(function() {

        var cry = new Module.Cc20();

        let inputVal = document.getElementsByClassName("inputClass2")[0].value;
        let text_key = new String(document.getElementsByClassName("inputClass1")[0].value);
        var input_t = Uint8Array.from(inputVal);
        var outstr = new Uint8Array((inputVal.length+13)*"");
        var outstr_dec = new Uint8Array((inputVal.length)*"");
        cry.cmd_enc(input_t,inputVal.length,outstr,text_key);
        cry.cmd_dec(outstr,inputVal.length+12,outstr_dec,text_key);
        $("#output1").append(outstr_dec.toString());
        cry.delete();
    });


});