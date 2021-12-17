SET wdir=../web_notes
SET inc_=%wdir%/pdm-crypt-module/include
SET src_=%wdir%/pdm-crypt-module/clean_src
SET lib_=%wdir%/pdm-crypt-module/lib
SET fs=%src_%/cc20_file.cpp %src_%/cc20_multi.cpp %lib_%/poly1305-donna-master/poly1305-donna.c %lib_%/cpp-mmf/memory_mapped_file.cpp 
SET safety=%lib_%/sha3.cpp -I%lib_% -I%lib_%/poly1305-donna-master/ -I%inc_%
SET args=-s WASM=1 --bind  --std=c++17 -O3 -D LINUX  -D WEB_RELEASE
SET wraps=-D SINGLETHREADING  --no-entry
rem SET wraps=--bind -D SINGLETHREADING
rem SET wraps=--bind -s USE_PTHREADS=1 -pthread -s PTHREAD_POOL_SIZE=3 -D SINGLETHREADING
SET memset= -s ALLOW_MEMORY_GROWTH=1  -s DEMANGLE_SUPPORT=1 -D__EMSCRIPTEN__
em++ %fs% %src_%/empp.cpp %safety%  %args% %wraps% %memset% -o %wdir%\build\notes.js 
