# Fejlődési, tevékenységi és étkezési tudástár v1.5

MkDocs Material alapú, kereshető családi tudástár 0–6 éves korig.

## Tartalom

- 224 tevékenység: `data/activities.csv`
- 50 recept: `data/recipes.csv`
- elméleti és életkori fejezetek
- külön étkezési modul: responsive feeding, textúrák, vas, allergének, biztonság, válogatósság, BLW/BLISS
- GitHub Actions automatikus build és GitHub Pages publikálás

## Helyi indítás

Windows alatt:

```text
START_HELYI_ELO-NEZET.bat
```

Kézzel:

```bash
python -m venv .venv
.venv\Scripts\activate
python -m pip install -r requirements.txt
python scripts\build_data.py
python -m mkdocs serve
```

Majd: `http://127.0.0.1:8000/`

## GitHub-frissítés

A v1.5 mappa **tartalmát** töltsd fel a repo gyökerébe a meglévő fájlok fölé, majd commit/push. A workflow újragenerálja a JSON-adatokat és a weboldalt.

A feltöltött könyv-PDF/EPUB/MOBI fájlokat ne tedd fel public repóba.
