let math;
// Let's create a function called loadWebAssembly that converts given file into binary array buffer.
function loadWebAssembly(fileName) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer)) // Buffer converted to Web Assembly 
    .then(module => {return new WebAssembly.Instance(module) }); // Instance of Web assmebly module is returened 
};   

//We call the function for math.wasm for the given Instance. 
loadWebAssembly('math.wasm')
  .then(instance => {
   
  }); 