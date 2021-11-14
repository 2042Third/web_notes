

var Module = {
      onRuntimeInitialized: function() {
        var a= Module.loader_check("1234","12345");
        var b = Module.loader_out("1234",a);
      }
    };