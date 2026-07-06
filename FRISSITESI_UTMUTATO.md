# Frissítési útmutató v1.4

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

## v1.4 új forrásai

- `SIMONE_BABY` – Simone Davies & Junnifa Uzodike: *The Montessori Baby*
- `SIMONE_TODDLER` – Simone Davies: *The Montessori Toddler*
- `SIMONE_CHILD` – Simone Davies & Junnifa Uzodike: *The Montessori Child*

## v1.4 tartalmi változások

- A tevékenység-adatbázis 168-ról 224 sorra bővült.
- Új elméleti oldal: `docs/01_elmeleti_hatter/simone_davies_konyvek.md`.
- Frissültek az életkori oldalak v1.4 könyvfrissítés blokkal.
- A kereső forrásmegjelenítése javult: ha egy forrás feltöltött könyv, URL nélkül is látszik a forrás-ID.

## Fontos

A `docs/assets/data/*.json` generált fájl. Kézzel ne szerkeszd, mert a következő `build_data.py` futtatás felülírja.

A feltöltött EPUB/PDF/MOBI könyveket ne tedd fel public GitHub repóba. A repóba csak a saját összefoglalók és tevékenység-adaptációk kerüljenek.
