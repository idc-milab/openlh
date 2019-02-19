@echo off
cd uploads
if exist coords\%1.coords (
    echo %1.coords already exists.
) else (
    magick convert %1 -colorspace RGB -depth 8 txt: | FINDSTR /V "#FFFFFF" | for /f "tokens=1 delims=:" %%i in ('more') do @echo %%i >> coords\temp.%1.coords
    more +1 coords\temp.%1.coords >> coords\%1.coords
    del coords\temp.%1.coords
)
cd ..
echo done