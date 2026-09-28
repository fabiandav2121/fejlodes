# Fejlődési Tudástár v1.6 – változásnapló és auditjelentés

**Dátum:** 2026. szeptember 27.  **Kiindulás:** az átadott v1.5 ZIP és Deep Research jelentés; azonos tartalmú két feltöltött ZIP.  **Munkamód:** elkülönített helyi munkapéldány; nem történt GitHub push vagy publikálás.

## Elvégzett szakmai változtatások

- A fejlődéstudomány került az első navigációs helyre: 16 új, szülőknek írt témaoldal a kommunikációtól és kapcsolatoktól az alváson, mozgáson és szobatisztaságon át a szakemberhez fordulásig.
- A tíz életkori oldalt újraírtam: tág életkori sávok, hétköznapi lehetőségek, opcionális tevékenységek, készségvesztés és tartós aggály esetén szakemberhez fordulás. A korábbi „öt dolog, amit csináljatok” és konkrét eszközlisták nem jelennek meg fejlődési követelményként.
- A Montessori a pedagógiai alkalmazás helyére került. Az új „Montessori és a bizonyítékok” oldal külön kezeli a teljes programok kutatását és az egyedi eszközökre vonatkozó hiányzó bizonyítékot. A `trajectory`, `transporting`, `enclosing`, `rotation` sémákat nem validált diagnosztikai konstruktumként kezeli.
- A régi elméleti oldalak közül hét rövid, óvatosabb összefoglalóra változott; három Montessori-könyves oldal a történeti/pedagógiai értelmezésre szűkült.
- A 224 tevékenységhez külön `evidence_status` és `activity_note` mező került. A kereső a cél helyett „lehetséges gyakorlást” mutat, és az ötletforrásokat elkülöníti a specifikus hatás bizonyítékától. Nyolc csecsemő/kisded tevékenységből eltávolítottam vagy lecseréltem kendőt, apró babot, gyöngyöt, zsinórt, szemcsés anyagot vagy vízzel kapcsolatos veszélyes elrendezést; több vízi tevékenység közvetlen felügyeleti jelzést kapott.
- A forrásadatbázis 49-ről 64 egyedi azonosítóra bővült. A fő új állításoknál DOI vagy hivatalos szervezeti oldal szerepel. A két hiányzó tevékenység-forrásazonosító meglévő kanonikus azonosítóra váltott. A teljes könyvek és PDF-ek nem kerültek a ZIP-be.

## Felhasznált elsődleges projektforrások

Az átadott teljes szövegű PDF-ek eredeti szövegét ellenőriztem az új tartalomhoz: Randolph és mtsai Montessori-szisztematikus áttekintése (`10.1002/cl2.1330`); Madigan és mtsai nyelv és szülői viselkedés (`10.1542/peds.2018-3556`); Jeong és mtsai szülői intervenciók (`10.1371/journal.pmed.1003602`); Flack és mtsai közös olvasás (`10.1037/dev0000512`); Lillard és mtsai szerepjáték (`10.1037/a0029321`); Skene és mtsai guided play (`10.1111/cdev.13730`); Hewitt és mtsai hason töltött idő (`10.1542/peds.2019-2168`); Mrad és mtsai szobatisztaság (`10.1016/j.jpurol.2021.05.010`); Bakermans-Kranenburg és mtsai kötődési intervenciók (`10.1037/0033-2909.129.2.195`); WHO 2019 fizikai aktivitás/alvás irányelv; AAP 2022 biztonságos alvás és AAP játék/fegyelmezés dokumentumai; a 2026-os alvásintervenciós áttekintés és a 2020-as végrehajtófunkció-tréning áttekintés. A CDC aktuális mérföldkőoldalát a projektforrások mellett közvetlenül ellenőriztem. A Deep Research jelentés forrástérkép volt; a régi hivatkozási tokenjeit nem másoltam át.

**Bizonyítéki határ:** nem olvastam végig tételesen a négy teljes handbook-kötetet és mind a 24 feltöltött PDF minden fejezetét. A fentiek célzottan, a módosított állításokhoz kerültek ellenőrzésre. A könyvek bibliográfiai adatai és az egyes régi állítások oldalszintű visszakötése további munka.

## Korrigált állítások és fennmaradó bizonytalanságok

- A régi „a kézmosás egyszerre fejleszti X, Y és Z képességet” típusú oksági megfogalmazások az új fő oldalakból kikerültek. A tevékenység önmagában nem bizonyít specifikus készségnövekedést.
- A reszponzív szülői viselkedés és nyelv kapcsolatánál a megfigyeléses együttjárás és az intervenciós hatás külön szerepel.
- A szerepjáték társas/nyelvi fejlődéshez kapcsolódhat, de nem állítjuk, hogy nélkülözhetetlen okozója.
- A szobatisztaság módszertani összehasonlítása korlátozott; nem adunk egyetlen kötelező kezdési kort.
- A CDC életkori pontjai 75%-os megfigyelési határhoz kötöttek, és nem standardizált diagnosztikai szűrés. Az életkori oldalak nem másolják le checklistként.
- Egyetlen tevékenységrekordhoz tartozó idézett tanulmány sem tekinthető automatikusan az egyedi gyakorlat hatásossági bizonyítékának. A teljes, egyenkénti bizonyítéki osztályozás és minden egyedi biztonsági ellenőrzés **nyitott feladat**.
- Az 50 recept és a meglévő táplálási oldalak megtartva, generálásuk ellenőrizve. A korábbi táplálási kutatás teljes szövege nem volt külön átadva ebben a csomagban; a receptenkénti orvosi, allergén- és fulladásbiztonsági audit nem tekinthető elvégzettnek.

## Technikai QA

- `python scripts/build_data.py`: sikeres; 224 tevékenység, 50 recept és 64 forrás JSON-ba generálva.
- `python -m mkdocs build --strict`: sikeres, 58 generált HTML-oldal.
- A generált HTML helyi linkjeinek és eszközfájljainak statikus ellenőrzése: 0 hiányzó cél.
- Az aktivitás- és receptadatok forrásazonosítóinak halmazellenőrzése: 0 hiányzó azonosító a javítás után.
- A JavaScript szintaktikai ellenőrzése és a ZIP integritásának ellenőrzése az átadás előtt futott.
- **Korlát:** a szűrők, kereső és mobil megjelenés böngészőben végzett, különböző eszközökre kiterjedő felhasználói tesztje nem történt meg. A GitHub Pages éles deployját nem indítottam el.

## SOURCE ACQUISITION – NEXT ROUND

1. Joint attention és gesztusok: friss, teljes szövegű szisztematikus áttekintés a nyelvi és szociális kimenetekről; a jelenlegi témalapon ezért nincs specifikus okozati mechanizmus állítva.
2. Fejlődési szűrés: aktuális AAP/egyéb gyermekgyógyászati irányelv teljes szövege és magyar ellátási útvonal; a CDC lista nem diagnosztikai eszköz.
3. Képernyőhasználat: korszerű AAP/szakmai útmutató és kontextust, tartalmat, életkort elkülönítő friss szisztematikus áttekintés; a meglévő WHO 2019 irányelv nem fedi a teljes médiakérdést.
4. Bölcsődei beszoktatás, testvér érkezése és szeparáció: jó minőségű, közvetlenül alkalmazható longitudinális vagy áttekintő források; e fejezet jelenleg óvatos, általános.
5. Korai matematika, térbeli fejlődés és autonómia: a csomagban már szereplő handbookok releváns fejezeteinek oldalszintű feldolgozása, majd célzott friss áttekintések.
6. A korábban használt táplálási és szobatisztasági kutatási fájlok, ha a rekordok tételes auditja és magyar gyermekgyógyászati adaptálása a következő kör célja.

## Következő szerkesztési feladatok

A 224 tevékenység manuális, egyenkénti biztonsági és forrásminőségi ellenőrzése; a 50 recept és összes táplálási állítás szakértői revíziója; részletesebb topicoldalak különösen közös figyelem, szeparáció és szűrés témában; mobil böngészős QA; minden régi bibliográfiai rekord DOI/URL ellenőrzése. A rövid témalapok első evidence-based vázlatok, nem a teljes többkötetes kézikönyv kimerítő feldolgozásai.
