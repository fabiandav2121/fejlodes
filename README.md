# Fejlődési, tevékenységi és étkezési tudástár v1.8

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

A v1.8 mappa **tartalmát** töltsd fel a repo gyökerébe a meglévő fájlok fölé, majd commit/push. A workflow újragenerálja a JSON-adatokat és a weboldalt.

A feltöltött könyv-PDF/EPUB/MOBI fájlokat ne tedd fel public repóba.

## v1.8 szakmai frissítés

A fejlődéstudományi témák és az életkori oldalak új szöveget kaptak. A régi elméleti oldalak történeti ötletanyagként megmaradtak, teljes tételes auditjuk a jelentésben nyitott feladat. A tevékenységek bizonyítéki címkét és általános biztonsági megjegyzést kaptak; ezek nem helyettesítik az egyedi, életkorra és eszközre szabott felülvizsgálatot. Lásd `AUDIT_REPORT_v1_6.md`.

## v1.8: tevékenység audit

A `data/activity_audit.csv` és az `AKTIVITAS_AUDIT_v1_7.md` kártyánként sorolja a konkrét problémákat. A tevékenységkeresőben szűrhetők az auditjelzések. A jelzések még nem jelentik minden kártya teljes javítását.

## v1.8: a jelzett kártyák pontosítása

A v1.7-ben megjelölt 206 tevékenységhez célzott javítás készült. A régi probléma, a módosítás és a jelenlegi biztonsági feltétel a `data/activity_corrections.csv` és az `AKTIVITAS_JAVITASOK_v1_8.md` fájlban követhető. A kereső a javított változatot és a korábbi jelzést külön mutatja.
