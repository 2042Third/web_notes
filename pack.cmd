jar -tvf ../web_notes.war %('dir /s /b | findstr /v ".git"')%
rem %(dir /s /b | findstr /v ".git")%