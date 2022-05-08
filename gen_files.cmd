@ECHO OFF
setlocal ENABLEDELAYEDEXPANSION
set out=

FOR /F %%i in (.\build_files.txt) do set out=!out!%%i 
echo %out%

rem set out=%out:~0-1%
rem echo %out%