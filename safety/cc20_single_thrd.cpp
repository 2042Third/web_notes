
/**
 * Yi Yang
 * 11/7/2021
 * */

#ifndef CC20_SINGLE_THRD_CPP
#define CC20_SINGLE_THRD_CPP

#ifdef SINGLETHREADING


#include <stdio.h>
#include <iostream>
#include <string>
#include <vector>

// #include "cc20_dev.hpp"
#include "cc20_single_thrd.h"

#include "cc20_multi.h"
#include "sha3.h"

#ifndef BYTES_DEFINED
#define BYTES_DEFINED
typedef std::vector<uint8_t> Bytes;
#endif

using namespace std;

/**
   * Init encryption.
   * 
   * This version of pdm-crypt interfaces within memory, which means 
   * entire file will be read before the encryption. 
   * Thus, this version is not recommended for large files (more than half 
   * of your computer's memory).
   * For a memory effecient version, please use a history version (that version 
   * uses at most ~320 mb for an arbitrary-size file).
   * 
   * @param infile_name input file name
   * @param oufile_name output file name
   * @param nonce the nonce of this encryption
   * 
   * */
  void Encry::cmd_enc(uint8_t* buf, size_t input_length, uint8_t* outstr , string text_key){
    cout<<"[cc20_multi] encryption start."<<endl;
    Bytes cur;
    init_byte_rand_cc20(cur,12);
    string text_nonce = btos(cur);
    Cc20 cry_obj;
    cry_obj.DE=0;
    Bytes key;
    Bytes nonce;

    SHA3 key_hash;
    for (unsigned int i=0;i<2;i++)
      key_hash.add(stob(text_key).data(),text_key.size());
    uint8_t line1[13]={0};
    if(cry_obj.DE){
      for (unsigned int i=0;i<12;i++)
        line1[i]=(buf[i]);
      text_nonce=(char*)line1;
    }
    if (text_nonce.size() != 0) {
      text_nonce = pad_to_key((string) text_nonce, 12);
    }

    // Timer
    cry_obj.set_vals((uint8_t*)text_nonce.data(), (uint8_t *)key_hash.getHash().data());

    if(cry_obj.DE){
      std::cout<<"Decryption message received "<<std::endl;
      cry_obj.rd_file_encr(buf,outstr, input_length);

    }
    else {
      std::cout<<"Encryption message received "<<std::endl;
      cry_obj.rd_file_encr(buf, outstr, input_length);
    }

  }

  void Encry::cmd_dec(uint8_t* buf, size_t input_length, uint8_t* outstr , string text_key){
    cout<<"[cc20_multi] decryption start."<<endl;
    
    Bytes cur;
    init_byte_rand_cc20(cur,12);
    string text_nonce = btos(cur);
    Cc20 cry_obj;
    Bytes key;
    Bytes nonce;
    cry_obj.DE=1;
    SHA3 key_hash;
    for (unsigned int i=0;i<2;i++)
      key_hash.add(stob(text_key).data(),text_key.size());
    uint8_t line1[13]={0};
    if(cry_obj.DE){
      for (unsigned int i=0;i<12;i++)
        line1[i]=(buf[i]);
      text_nonce=(char*)line1;
    }
    if (text_nonce.size() != 0) {
      text_nonce = pad_to_key((string) text_nonce, 12);
    }

    // Timer
    cry_obj.set_vals((uint8_t*)text_nonce.data(), (uint8_t *)key_hash.getHash().data());

    if(cry_obj.DE){
      std::cout<<"Decryption message received "<<std::endl;
      cry_obj.rd_file_encr(buf,outstr, input_length);

    }
    else {
      std::cout<<"Encryption message received "<<std::endl;
      cry_obj.rd_file_encr(buf, outstr, input_length);
    }

  }
#endif
#endif
