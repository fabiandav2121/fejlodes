# Helyi használat és megosztás

## Helyi használat

1. Csomagold ki a ZIP-et.
2. Futtasd: `START_HELYI_ELO-NEZET.bat`
3. Böngészőben: `http://127.0.0.1:8000/`

## Tevékenység frissítése

A fő fájl:

```text
data/activities.csv
```

Módosítás után:

```bat
python scripts/build_data.py
```

Majd frissítsd a böngészőt.

## Statikus oldal készítése megosztáshoz

Ha később publikus vagy félig privát oldalt akarsz:

```bat
mkdocs build
```

Ez létrehozza a `site/` mappát. Ezt lehet statikus tárhelyre feltölteni.

## Könyv-PDF-ek

A feltöltött könyv-PDF-eket ne tedd publikus tárhelyre. A tudástár csak saját összefoglalót és forráshivatkozást tartalmazzon.


## v1.2 javítás

A Tevékenységkereső adatbetöltése javítva: a JavaScript most a saját betöltési útvonalából számolja ki az `assets/data/activities.json` pontos helyét, ezért működik helyi MkDocs előnézetben és később aloldalon / GitHub Pages jellegű környezetben is.
