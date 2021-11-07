/***
 * Yi Yang,
 * 11/7/2021
 * */

#ifndef CC20_SINGLE_THRD_H
#define CC20_SINGLE_THRD_H


#ifdef SINGLETHREADING

#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#endif




class Encry
{
public:
  void cmd_enc(uint8_t* buf, size_t input_length, uint8_t* outstr , std::string text_key);
  void cmd_dec(uint8_t* buf, size_t input_length, uint8_t* outstr , std::string text_key);
};
#endif
#endif