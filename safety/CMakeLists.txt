#if (WIN32)
#    include_directories(lib/)
#    link_directories(include/)
#elseif (APPLE)
#    include_directories(lib_mac/)
#    link_directories(include_mac/)
#elseif (UNIX)
#    include_directories(lib_linux/)
#    link_directories(include_linux/)
#endif ()



add_library(cc20_multi
        cc20_multi.h
        cc20_multi.cpp
        cc20_dev.cpp
        cc20_dev.hpp
        pdm-service.hpp
        sha3.cpp
        sha3.h
        cc20_parts.h)
target_compile_options(
        cc20_multi PUBLIC
        -pthread -m64
)
if(WIN32)
    target_compile_definitions(cc20_multi PUBLIC WINDOWS LINUX )
elseif (APPLE)
    target_compile_definitions(cc20_multi PUBLIC MACOS LINUX )
elseif (UNIX)
    target_compile_definitions(cc20_multi PUBLIC LINUX )
endif ()
#target_compile_definitions(cc20_multi PRIVATE LINUX )

target_include_directories(cc20_multi PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})