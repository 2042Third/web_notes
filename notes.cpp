

#include <stdio.h>
#include <string>
#include <vector>
#include "safety/cc20_multi.h"
#include <iostream>

using namespace std;

void set_up(vector<uint8_t>* buf, string inp){
  for(char a:inp){
    buf->push_back((uint8_t)a);
  }
}

int main(int argc, char** argv){
  cout<<"First note!\n"<<endl;
  string key = "1234";
  string input="this is a secret,password:1234.";
  vector<uint8_t>* buf = new vector<uint8_t>();
  vector<uint8_t>* outstr = new vector<uint8_t>();
  buf->reserve(input.size()+1);
  set_up(buf,input);
  outstr->reserve(input.size()+13);
  // DE=0;
  cmd_enc(buf->data(),input.size(),outstr->data(),key);
  cout<<"Encryption complete: ";
  cout<<(char*)outstr->data()<<endl;
  cmd_dec(outstr->data(),input.size()+12,buf->data(),key);
  cout<<"Decryption complete: ";
  cout<<(char*)buf->data()<<endl;
  delete(buf);
  delete(outstr);
}
#ifdef __EMSCRIPTEN__
EMSCRIPTEN_BINDINGS(raw_pointers) {
  emscripten::function("cmd_enc", &cmd_enc, emscripten::allow_raw_pointers());
  emscripten::function("cmd_dec", &cmd_dec, emscripten::allow_raw_pointers());
}
#endif