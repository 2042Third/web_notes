

var Module = {
      onRuntimeInitialized: function() {
        var a= Module.loader_check("1234","hello, how are you?");
        console.log(a);
        var b = Module.loader_out("1234",a);
        console.log(b);

      }
    };