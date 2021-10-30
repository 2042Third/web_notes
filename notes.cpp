#include <iostream>
#include <string>
#include <vector>
#include "emscripten.h"
#include "safety/cc20_multi.h"

using namespace std;

void set_up(vector<uint8_t>* buf, string inp){
  for(char a:inp){
    buf->push_back((uint8_t)a);
  }
}
int main(){
  cout<<"First note!\n"<<endl;
  string key = "1234";
  string input="this is a secret\npassword:1234\n";
  vector<uint8_t>* buf = new vector<uint8_t>();
  vector<uint8_t>* outstr = new vector<uint8_t>();
  set_up(buf,input);
  // DE=0;
  cmd_enc(buf->data(),input.size()+2,outstr->data(),key);
  cout<<"compile complete: ";
  cout<<(char*)outstr->data()<<endl;
  delete(buf);
  delete(outstr);
}
