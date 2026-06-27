# Fejlődési és tevékenységi tudástár v1.3

MkDocs Material alapú, kereshető családi tudástár 0-6 éves korig.

## Mi van ebben a verzióban?

- 168 tevékenység a `data/activities.csv` adatbázisban.
- A kereső a `docs/assets/data/activities.json` fájlból dolgozik.
- Három új Montessori-könyv alapján bővített practical life, szenzoros, nyelvi, matematikai és geometriai tevékenységek.
- Két új elméleti oldal: eredeti Montessori-források otthoni fordítása és elemi Montessori-kitekintés.
- GitHub Actions workflow: `.github/workflows/deploy.yml`.

## Helyi indítás

Windows alatt legegyszerűbben:

```
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

Majd böngészőben: `http://127.0.0.1:8000/`

## Frissítés GitHubon

Ha csak tartalmat vagy CSV-t módosítasz, commit és push után a GitHub Actions újraépíti az oldalt.

```bash
git add .
git commit -m "tudástár frissítés"
git push
```

A könyv-PDF/EPUB/MOBI fájlokat ne tedd fel public repóba; csak a saját összefoglalók és hivatkozások kerüljenek a tudástárba.
