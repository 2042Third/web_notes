

#include <stdio.h>
#include <string>
#include <vector>
#include "../safety/cc20_multi.h"
#include <iostream>

using namespace std;

void set_up(vector<uint8_t>* buf, string inp){
  for(char a:inp){
    buf->push_back((uint8_t)a);
  }
}

int main(int argc, char** argv){
  Cc20* enc = new Cc20();
  string key = "1234";
  string input="this is a secret,password:1234.";
  vector<uint8_t>* buf = new vector<uint8_t>();
  vector<uint8_t>* outstr = new vector<uint8_t>();
  buf->reserve(input.size()+1);
  set_up(buf,input);
  outstr->reserve(input.size()+13);
  // DE=0;
  enc->cmd_enc(buf->data(),input.size(),outstr->data(),key);
  cout<<"Encryption complete: ";
  cout<<(char*)outstr->data()<<endl;
  enc->cmd_dec(outstr->data(),input.size()+12,buf->data(),key);
  cout<<"Decryption complete: ";
  cout<<(char*)buf->data()<<endl;
  delete(buf);
  delete(outstr);
  delete(enc);
}

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