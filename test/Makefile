# Yi Yang, 11/7/2021
src_ = ../safety
fs = $(src_)/cc20_multi.cpp $(src_)/sha3.cpp 
df = -D LINUX -D SINGLETHREADING 
cmpdf = -O2 -g -Wall 

linux:
	clang++ ../src/notes.cpp $(fs) $(df) $(cmpdf) -o safe_test 