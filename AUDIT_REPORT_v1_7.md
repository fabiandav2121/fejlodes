# Változásnapló – v1.7

A v1.6-on végzett új szerkesztői ellenőrzés során mind a 224 tevékenység külön auditjelzést kapott az adatbázisban. A részletes, ID szerinti problémalista az `AKTIVITAS_AUDIT_v1_7.md` fájlban, táblázatosan a `data/activity_audit.csv` fájlban található. A jelzések a honlap tevékenységkártyáin is látszanak; a keresőben auditstátusz szerint szűrhetők.

**Eredmény:** 76 biztonsági pontosítást igénylő, 58 egyéb tartalmi pontosítást igénylő, 72 elsősorban forráshivatkozást tisztázandó, 18 ebben a körben külön jelzés nélküli rekord. A számok a kártyákat fedik le, nem az egymást átfedő problémakategóriák darabszámát. A 153 kereskedelmi vagy pedagógiai ötletforrásra vonatkozó jelzés nem általános hibáztatás: a forrásnak a bizonyítéktól eltérő szerepét rögzíti.

Az egyedi fejlesztő hatás igazolatlansága **nem** került minden tevékenységhez külön problémaként. Az általános magyarázat a keresőoldal tetején maradt. A kártyákon konkrétabban az apró vagy leváló tárgyakat, vizes játékot, függő eszközöket és zsinórokat; a korai iskolai teljesítményhez kötött megfigyelést; a kapcsolati tanácsok merev alkalmazását; a szülőre rótt indokolatlan szervezést; és a hivatkozások félreérthető szerepét jelöltük.

A v1.6-ban már átalakított nyolc játék eredeti hivatkozását újra kell egyeztetni. A mostani kör **jelölés és rangsorolás**, nem mind a 206 jelzett kártya végleges javítása vagy eltávolítása. A biztonsági figyelmeztetést nem szabad az eredeti tevékenység automatikus jóváhagyásának tekinteni; a konkrét javítási vagy kivonási döntés a következő kör feladata.

## Ellenőrzés

`python scripts/build_data.py`, `python -m mkdocs build --strict`, JavaScript szintaktikai ellenőrzés, a generált HTML helyi linkjeinek ellenőrzése és a ZIP integritásellenőrzése lefutott. A böngészős felületi QA külön, még nyitott feladat. Publikálás nem történt.
