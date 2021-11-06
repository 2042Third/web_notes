/*
cc20_multi.cpp

pdm/Personal Data Management system is a encrypted and multiplatform data searching, building, archiving tool.
This is the encryption core module for pdm.

author:     Yi Yang
            5/2021
*/

#ifndef CC20_MULTI_CPP
#define CC20_MULTI_CPP

#include "cc20_dev.hpp"
#include "cc20_multi.h"
#include "cc20_parts.h"
#include "sha3.h"
#include <numeric>
#include <unistd.h>
#include <math.h>
#ifndef SINGLETHREADING
#include <thread>
#endif

using namespace std;

void enc_writing(string oufile_name);
void enc_writing_nw();
void multi_enc_pthrd(int thrd);
void multi_enc_pthrd_nw(int thrd);
void set_thread_arg(unsigned long int thrd, uint8_t* np,unsigned long int tracker,unsigned long int n, unsigned long int tn,uint8_t* line,uint32_t count, Cc20 * ptr);
       

int ENABLE_SHA3_OUTPUT = 1;

const int BLOCK_SIZE = 4608000;
/* Invariant: BLOCK_SIZE % 64 == 0
                                 115200, 256000, 576000, 1152000,2304000,4608000,6912000,9216000 ...
                                 Block size*/

const int THREAD_COUNT = 2; // Make sure to change the header file's too.

const int PER_THREAD_BACK_LOG = 0; // This is not enabled.

uint32_t folow[THREAD_COUNT][17]; // A copy of a state.

// Statically allocates, and uses BLOCK_SIZE*THREAD_COUNT of memory. 
char thread_track[THREAD_COUNT][BLOCK_SIZE] = {{0}};

long int writing_track[THREAD_COUNT]; // Tells the writer thread how much to read; should only be different on the last block.

unsigned char *linew; // Tracks all the input

int progress_bar[THREAD_COUNT];

int DISPLAY_PROG =0;

//unsigned long int arg_track[THREAD_COUNT][6];
cc20_parts arg_track[THREAD_COUNT];
/* Passes arguments into threads. (NOW DEPRECATED)
                                       arg_track[THREAD_COUNT][0] ---> Thread number
                                       arg_track[THREAD_COUNT][1] ---> NOT USED
                                       arg_track[THREAD_COUNT][2] ---> NOT USED
                                       arg_track[THREAD_COUNT][3] ---> Remaining plain size
                                       arg_track[THREAD_COUNT][4] ---> NOT USED*/

SHA3 hashing; // A rolling hash of the input data.

Cc20 * arg_ptr[THREAD_COUNT]; // Parent pointers for each thread.

#ifndef SINGLETHREADING
thread threads[THREAD_COUNT]; // Threads
#endif
int final_line_written = 0; // Whether or not the fianl line is written

/*
    XOR's two objects begaining at s1's off for n.
    And beginging at s2's 0 for n.

*/

template < typename NU >
  void set_xor(NU * s1, NU * s2, std::ofstream s3, unsigned int n, unsigned int off) {
    for (unsigned int i = 0; i < n; i++) {
      s3 << s1[i + off] ^ s2[i];
    }
  }

/*
    Given nonce is already set, one_block takes the thrd number and the block count and 
    modifies nex[thrd] for the next block of chacha20.

    This doesn't track whether or not the count is increamented; thus, to ensure security
    please increament the count before passing it into one_block

*/

void Cc20::one_block(int thrd, uint32_t count) {
  cy[thrd][12] = count;
  memcpy(folow[thrd], cy[thrd], sizeof(uint32_t) * 16);
  #ifdef ROUNDCOUNTTWLV
  for (unsigned int i = 0; i < 6; i++) tworounds(folow[thrd]); // 8 rounds
  #else
  for (unsigned int i = 0; i < 10; i++) tworounds(folow[thrd]); // 20 rounds
  #endif
  set_conc(cy[thrd], folow[thrd], 16);
  endicha(this -> nex[thrd], cy[thrd]);
}



/**
 *
 * Creates one thread for writing and THREAD_COUNT threads for calculating the
 * cypher text. It also handles disk mapping for reading, and opens oufile for
 * writing. After, it will dispatch threads when there are vacancy in threads[].
 * Returns when all plain is read, and all threads are joined.
 *
 * @param buf input buffer
 * @param outstr output buffer
 * @param input_length input string length
**/

void Cc20::rd_file_encr(uint8_t * buf, uint8_t* outstr, size_t input_length) {
  unsigned long int n = 0;
  hashing = SHA3();
  uint8_t * data;
  uint8_t * line;
// cout<<"input length: "<<input_length<<endl;
  if(!DE)data = buf;
  else data = (uint8_t*)buf+12;
  line = data;
  long int tn = 0;
  n = input_length;
  unsigned int ttn = input_length;
  uint32_t count = 0;
  for (long & writingTrack : writing_track) {
    writingTrack = 0;
  }
  long int tracker = 0;
  long int np = 0, tmpn = np % THREAD_COUNT;
  linew=(unsigned char*)outstr+12;
  if(DE){
   std::cout<<"Decryption selected"<<endl;
    ttn-=12;
    n-=12;
    linew=(unsigned char*)outstr;
    // line=data+12;
  }
#ifndef SINGLETHREADING

  thread progress;
  if (DISPLAY_PROG){
    for (int & bar : progress_bar){
      bar = 0;
    }
    progress = thread(display_progress,ttn);
  }
#endif
#ifdef SINGLETHREADING
  set_thread_arg(np % THREAD_COUNT, linew, tracker, ttn, 0, line, count, this);
#endif
#ifndef SINGLETHREADING
  set_thread_arg(np % THREAD_COUNT, linew, tracker, n, 0, line, count, this);
  threads[np % THREAD_COUNT] = thread(multi_enc_pthrd, tmpn);
  np++;

  for (unsigned long int k = 0; k < ((unsigned long int)(ttn / 64) + 0); k++) { // If leak, try add -1

    if (n >= 64) {
      tracker += 64;

      if (tn % (BLOCK_SIZE) == 0 && (k != 0)) {
        if (threads[np % THREAD_COUNT].joinable()) {
         #ifdef VERBOSE
         cout << "[main] Possible join, waiting " <<np % THREAD_COUNT<< endl;
         #endif
          threads[np % THREAD_COUNT].join();
        }
        set_thread_arg(np % THREAD_COUNT, linew+tn, tracker, n, tn, line + tn, count + 1, this);
        threads[np % THREAD_COUNT] = thread(multi_enc_pthrd, np % THREAD_COUNT);

        tracker = 0;
        np++;
      }
    } else {
      if (threads[np % THREAD_COUNT].joinable() && final_line_written != 1) {
         #ifdef VERBOSE
         cout << "[main] Last Possible join, waiting " <<np % THREAD_COUNT<< endl;
         #endif
        threads[np % THREAD_COUNT].join();
      }
      set_thread_arg(np % THREAD_COUNT, linew+tn, tracker, n, tn, line + tn, count + 1, this);
      threads[np % THREAD_COUNT] = thread(multi_enc_pthrd, np % THREAD_COUNT);
    }
    count += 1;
    n -= 64;
    tn += 64;
  }
#else
  multi_enc_pthrd(tmpn);
#endif


#ifndef SINGLETHREADING
  for (int i = 0; i < THREAD_COUNT; i++) {
    if (threads[i].joinable()){
       threads[i].join();

    }
  }
#endif

  if (ENABLE_SHA3_OUTPUT){
    if(!DE)
      hashing.add(line,ttn );
    else
      hashing.add(linew,ttn );
  }

  if(DE){
    outstr[input_length-12]='\0';
  }
  else {
    outstr[input_length+12]='\0';
  }

  if(!DE){
    for (unsigned int i=0;i<12;i++)
      outstr[i] = this->nonce_orig[i];
  }
#ifndef SINGLETHREADING
  if(DISPLAY_PROG){
    if (progress.joinable())
      progress.join();
  }
#endif
}
/**
 * Displays progress
 * 
 * */
void display_progress(unsigned int n) {
  unsigned int current=0;
  unsigned int acum=0;
  unsigned int res =50;
  cout<<endl;
  while(current<res){
    acum=0;
    if(((float)accumulate(progress_bar,progress_bar+THREAD_COUNT,acum)/n) *res>=current || n<10000){
      current++;
      cout<<"-"<<flush;
    }
    usleep(10000);
  }
  cout<<"100%"<<endl;
}



/**
    Sets arguments in arg_track for threads.

*/

void set_thread_arg(unsigned long int thrd, uint8_t* linew1, unsigned long int tracker, unsigned long int n, unsigned long int tn, uint8_t * line, uint32_t count, Cc20 * ptr) {
  arg_track[thrd].thrd = thrd;
  arg_track[thrd].line = linew1;
  arg_track[thrd].n = n;

  arg_track[thrd].line = line;
  arg_track[thrd].count = count;
  arg_ptr[thrd] = ptr;
}

/**
 * A worker thread that calculates the cc20 encrypted string given a input string
 * for a given string length.
 *
 * @param thrd thread count, which thread is this out of all the threads
 *
 * **/
void multi_enc_pthrd(int thrd) {
  unsigned long int tracker = 0; // Used
  unsigned long int n = arg_track[thrd].n; // Used--
  uint8_t * line = arg_track[thrd].line; // Used--
  uint32_t count = arg_track[thrd].count; // Used --
  Cc20 * ptr = arg_ptr[thrd];

  #ifdef VERBOSE
          cout<<"[calc] "<<thrd<<" locks, starting write, "<<n/64<<" it "<<ceil(n / 64.0) << endl;
  #endif

  #ifndef SINGLETHREADING
  for (unsigned long int k = 0; k < BLOCK_SIZE / 64; k++) 
  #else
 
  for (unsigned long int k = 0; k < ceil(n / 64.0); k++) 
  #endif
  {
    ptr -> one_block((int) thrd, (int) count);
    #ifdef VERBOSE
      cout<<"[calc] "<<thrd<<" 1 iteration, current size "<<n << endl;
    #endif
    if (n >= 64) {
      for (unsigned long int i = 0; i < 64; i++) {
        #ifdef VERBOSE
        cout<<"[calc] in early loop"<< endl;
        #endif
        linew[i + tracker] = (char)(line[i + tracker] ^ ptr -> nex[thrd][i]);
      }
      #ifdef VERBOSE
        cout<<"[calc] in loop"<< endl;
      #endif
      tracker += 64;
      #ifndef SINGLETHREADING
      if (tracker >= (BLOCK_SIZE))  // Notifies the writing tread when data can be read
      #else
      if (tracker >= (n))  // Notifies the writing tread when data can be read
      #endif
      {
        writing_track[thrd] = tracker;
        tracker = 0;
        #ifdef VERBOSE
          cout<<"[calc] "<<thrd<<" returning lock, calling write, size "<<writing_track[thrd] << endl;
        #endif
      }
    } else {
      #ifdef VERBOSE
        cout<<"[calc] in last loop "<< line<< endl;
      #endif
      for (unsigned int i = 0; i < n; i++) {
      #ifdef VERBOSE
        cout<<"[calc] in loop "<< i<< endl;
      #endif
        linew[i+tracker] = (char)(line[i + tracker] ^ ptr -> nex[thrd][i]);
      }
      #ifdef VERBOSE
        cout<<"[calc] in last loop mid"<< endl;
      #endif
      tracker += n;
      writing_track[thrd] = tracker; // Notifies the writing tread when data can be read
      #ifdef VERBOSE
        cout<<"[calc] in last loop end"<< endl;
      #endif
      break;
    }
    count += 1;
    n -= 64;
    if(DISPLAY_PROG)progress_bar[thrd]+=64;
  }
  #ifdef VERBOSE
          cout<<"[calc] "<<thrd<<" unlocks " << endl;
  #endif
}

/**
 * Sets the information of the encryption before the encryption begins.
 *
 * @param nonce nonce, should be randomly generated. Or never be used.
 * @param key key
 *
 * **/
void Cc20::set_vals(uint8_t * nonce, uint8_t * key) {
  this -> nonce = nonce;
  copy(nonce,nonce+12,this -> nonce_orig );
  this -> count = 0;
  for (unsigned int i = 0; i < THREAD_COUNT; i++) {
    // this -> cy[i][0] = 0x617178e5;
    // this -> cy[i][1] = 0xb72c676e;
    // this -> cy[i][2] = 0x79e2ad32;
    // this -> cy[i][3] = 0x6b246574;

    this -> cy[i][0] = 0x61707865;
    this -> cy[i][1] = 0x3320646e;
    this -> cy[i][2] = 0x79622d32;
    this -> cy[i][3] = 0x6b206574;

    expan(this -> cy[i], 13, this -> nonce, 3);
    expan(this -> cy[i], 4, key, 8);
  }
}

void Cc20::endicha(uint8_t * a, uint32_t * b) {
  for (unsigned int i = 0; i < 16; i++) {
    U32T8_S(a + 4 * i, b[i]);
  }
}

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
void cmd_enc(uint8_t* buf, size_t input_length, uint8_t* outstr , string text_key){
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

void cmd_dec(uint8_t* buf, size_t input_length, uint8_t* outstr , string text_key){
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