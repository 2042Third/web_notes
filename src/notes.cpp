

#include <stdio.h>
#include <string>
#include <vector>
#include "../safety/cc20_multi.h"
#include <iostream>
#include <sstream>
#include <stdlib.h>

using namespace std;

void set_up(vector<char>& buf, string inp){
  for(char a:inp){
    buf.push_back((uint8_t)a);
  }
}


void use_vector_string(const std::vector<std::string> &vec) {
    std::cout << "size() = " << vec.size() << ", capacity()=" << vec.capacity() << "\n";
    for (const auto &str : vec) {
        std::cout << "vec[]=|" << str << "|\n";
    }
}
string loader_check(std::string key, std::string input)
{
  vector<char> buf; //= new vector<uint8_t>();
  vector<char> outstr;// = new vector<uint8_t>();
  buf.reserve(input.size() + 1);
  set_up(buf, input);
  outstr.reserve(input.size() + 13);
  cmd_enc((uint8_t *)((&buf)->data()), input.size(), (uint8_t *)((&outstr)->data()), key);
  cout << "Encryption complete: " << endl;
  char outarr[(input.size() + 14)*3]; // do the web array
  std::ostringstream outt;
  size_t ac=0;
  for (int i = 0; i < input.size()+12; i++)
  {
    printf("%03d ", (uint8_t)outstr[i]);
    sprintf(outarr + ac, "%03d", (uint8_t)outstr[i]);
    ac+=3;
  }
  sprintf(outarr + ac, "%03d000", 0);
  string str = outarr;
  return str;
}

string cvrt(string a, size_t b){
  string o="";
  for (int i=0; i<b; i++){
    char t[3];
    t[0] = a[i*3 + 0];
    t[1] = a[i * 3 + 1];
    t[2] = a[i * 3 + 2];
    // t[3] = '\0';
    
    uint8_t oi = atoi(t);
    // cout<<"("<<t<<")"<<oi;
    o=o+(char)oi;
  }

  cout<<endl;
  return o;
}

string loader_out(std::string key, std::string inputi)
{
  vector<char> buf;    //= new vector<uint8_t>();
  vector<char> outstr; // = new vector<uint8_t>();
  size_t inpsize = (inputi.size()-6)/3;
  // cvrt();
  cout<<"Decryption size: "<<inpsize<<endl;
  string input = cvrt(inputi, inpsize);
  buf.reserve(inpsize + 1);
  set_up(buf, input);
  outstr.reserve(inpsize - 10);
  cmd_dec((uint8_t *)((&buf)->data()), inpsize, (uint8_t *)((&outstr)->data()), key);
  cout << "Decryption complete: " << endl;
  std::ostringstream outt;
  stringstream ss;
  string str="";
  for (int i = 0; i < inpsize - 12; i++)
  {
    printf(" %d", outstr[i]);
    str=str+outstr[i];
  }
  return str;
}

int main(int argc, char **argv)
{
  string k;
  string v;
  cout << "Key: \n";
  getline(cin, k);
  cout << "Value: \n";
  getline(cin, v);
  std::string a = loader_check(k, v);
  std::cout<<"\nWe got: "<<a<<std::endl;
  std::string b = loader_out(k, a);
  std::cout << "\nDec we got: " << b << std::endl;
}
#ifdef __EMSCRIPTEN__
EMSCRIPTEN_BINDINGS(raw_pointers) {

  emscripten::register_vector<uint8_t>("CharList");
  emscripten::class_<Cc20>("Cc20")
      .constructor<>()
      .function("str_enc", &Cc20::cmd_enc, emscripten::allow_raw_pointers())
      .function("str_dec", &Cc20::cmd_dec, emscripten::allow_raw_pointers())
      // .class_function("getStringFromInstance", &MyClass::getStringFromInstance)
      ;
  emscripten::function("loader_check", &loader_check, emscripten::allow_raw_pointers());
  emscripten::function("use_vector_string", &use_vector_string);
}
#endif