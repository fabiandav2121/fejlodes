@echo off
setlocal
cd /d "%~dp0"

if not exist .venv (
  echo Python virtualis kornyezet letrehozasa...
  python -m venv .venv
)

call .venv\Scripts\activate

echo Csomagok telepitese/frissitese...
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

echo Adatbazis JSON frissitese...
python scripts\build_data.py

echo MkDocs helyi elonezet inditasa...
echo Nyisd meg: http://127.0.0.1:8000/
python -m mkdocs serve

pause
