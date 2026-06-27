# Frissítési útmutató v1.3

## Tevékenység hozzáadása

1. Nyisd meg: `data/activities.csv`.
2. Adj hozzá egy új sort pontosvesszős CSV-formátumban.
3. Futtasd helyben, ha előnézetet szeretnél:

```bash
python scripts/build_data.py
python -m mkdocs serve
```

GitHub Pages esetén push után a workflow automatikusan futtatja a `build_data.py` scriptet és újraépíti az oldalt.

## Forrás hozzáadása

1. Nyisd meg: `data/sources.csv`.
2. Adj hozzá új `id`, `title`, `type`, `url`, `note` mezőket.
3. A tevékenységnél a `source_ids` oszlopban hivatkozz az ID-ra.

## v1.3 új forrásai

- `MONTESSORI_METHOD`
- `MONTESSORI_ELEMENTARY`
- `CUSHMAN_BOOK`
- `SELF_DETERMINATION`

## Fontos

A `docs/assets/data/*.json` generált fájl. Kézzel ne szerkeszd, mert a következő `build_data.py` futtatás felülírja.
