

#include <stdio.h>
#include <string>
#include <vector>
#include "../safety/cc20_multi.h"
#include <iostream>

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#include <emscripten/bind.h>
#endif
using namespace std;





void use_vector_string(const std::vector<std::string> &vec) {
    std::cout << "size() = " << vec.size() << ", capacity()=" << vec.capacity() << "\n";
    for (const auto &str : vec) {
        std::cout << "vec[]=|" << str << "|\n";
    }
}
string loader_check(){
  cout<<"Loader check"<<endl;
  return "loaded";
}



#ifdef __EMSCRIPTEN__
EMSCRIPTEN_BINDINGS(raw_pointers) {

  emscripten::register_vector<uint8_t>("CharList");
  emscripten::class_<Cc20>("Cc20")
  .constructor<>()
  .function("cmd_enc", &Cc20::cmd_enc, emscripten::allow_raw_pointers())
  .function("cmd_dec", &Cc20::cmd_dec, emscripten::allow_raw_pointers())
  // .class_function("getStringFromInstance", &MyClass::getStringFromInstance)
  ;
  emscripten::function("loader_check", &loader_check, emscripten::allow_raw_pointers());
  emscripten::function("use_vector_string", &use_vector_string);
}
#endif