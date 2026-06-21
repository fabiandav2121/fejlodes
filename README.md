# Fejlődési és tevékenységi tudástár v1.0

Ez egy MkDocs Material alapú, helyben futtatható családi tudástár.

## Tartalom

- `docs/` – a weboldal Markdown oldalai
- `data/activities.csv` – a tevékenységek fő adatbázisa
- `docs/assets/data/activities.json` – a webes kereső adatbázisa
- `scripts/build_data.py` – CSV → JSON frissítő
- `mkdocs.yml` – MkDocs beállítás
- `START_HELYI_ELO-NEZET.bat` – Windows gyorsindító

## Gyors indítás Windowson

Kattints duplán:

```text
START_HELYI_ELO-NEZET.bat
```

Majd nyisd meg:

```text
http://127.0.0.1:8000/
```

## Fontos

Ez a verzió nem GitHub Pagesre van kihegyezve. Helyben fut, és ha később meg akarjátok osztani, a `mkdocs build` paranccsal előálló `site/` mappa bármilyen statikus tárhelyre feltölthető.


## v1.2 javítás

A Tevékenységkereső adatbetöltése javítva: a JavaScript most a saját betöltési útvonalából számolja ki az `assets/data/activities.json` pontos helyét, ezért működik helyi MkDocs előnézetben és később aloldalon / GitHub Pages jellegű környezetben is.
