# Fejlődési és tevékenységi tudástár

Ez a tudástár egy **családi, gyakorlati használatra készült 0–6 éves útiterv**. Nem tudományos publikáció és nem diagnosztikai eszköz. A cél:

- legyen érthető elméleti háttér a gyerekneveléshez;
- legyen gyorsan kereshető, részletes benti/kinti tevékenységtár;
- a Montessori-szemlélet megjelenjen, de ne dogmatikusan;
- a tartalom könnyen frissíthető legyen.

## Gyors indulás

- **Napi használatra:** [Tevékenységkereső](03_tevekenysegek/kereso.md)
- **Életkor szerint:** [Életkori áttekintés](02_eletkorok/index.md)
- **Elméleti háttér:** [Elméleti háttér](01_elmeleti_hatter/index.md)
- **Frissítés:** [Szerkesztés és frissítés](03_tevekenysegek/szerkesztes.md)

## Mi változott a v1.0-ban?

- A tevékenységek **adatbázisból** futnak: `data/activities.csv` → `docs/assets/data/activities.json`.
- A webes kereső ténylegesen ezt a JSON-adatbázist tölti be.
- A „észrevételek” modul kikerült.
- A használat nem GitHub Pages-központú: helyben futtatható MkDocs-oldal, amely később bármilyen statikus tárhelyre publikálható.
- A tevékenységtár bővült: **130 részletes tevékenység**, köztük Lovevery/Panda/Lalo jellegű fejlődési játékok, Montessori classroom inspirációk és otthoni practical life adaptációk.

!!! note "Fontos"
    A konkrét márkás játékokat nem vásárlási ajánlásként használtuk, hanem ötletforrásként: milyen képességet céloznak, milyen életkorra időzítik, és hogyan lehet ezt otthon, egyszerűbb eszközökkel megvalósítani.


## v1.3 állapot

A v1.3 frissítésben három új Montessori-könyv alapján bővült a tudástár. A tevékenységkereső jelenleg 168 tevékenységet tartalmaz, köztük több új practical life, szenzoros, nyelvi, matematikai, geometriai és önállóságot támogató otthoni adaptációt.

Új elméleti oldalak:

- [Montessori eredeti forrásokból: otthoni fordítás](01_elmeleti_hatter/montessori_eredeti_forrasok.md)
- [Montessori elemi kitekintés](01_elmeleti_hatter/montessori_elemi_kitekintes.md)


## v1.4 állapot

A v1.4 frissítésben három Simone Davies/Junnifa Uzodike könyv alapján bővült a tudástár:

- *The Montessori Baby*
- *The Montessori Toddler*
- *The Montessori Child*

A tevékenységkereső jelenleg **224 tevékenységet** tartalmaz. Az új elemek főként a 0–12 hónapos baba-szakaszt, a 12–36 hónapos practical life és self-care tevékenységeket, valamint a 3–6 éves önállóságot, családi ritmust, társas-morális fejlődést és „going out” előkészítést erősítik.

Új elméleti oldal:

- [Simone Davies könyvek otthon](01_elmeleti_hatter/simone_davies_konyvek.md)


## v1.5 – Étkezés modul

A tudástár új, adatbázis-alapú étkezési modult kapott:

- [Receptkereső](05_etkezes/receptkereso.md) 50 induló recepttel;
- 6 hónapos kortól 6 éves korig életkor-, textúra-, étrend- és allergénszűrés;
- külön oldalak a reszponzív etetésről, textúrákról, vasról, allergénekről, fulladásbiztonságról, válogatósságról és BLW/BLISS-ről;
- a receptek saját megfogalmazású családi adaptációk, és a `data/recipes.csv` adatbázisból futnak.

**Gyors link:** [Étkezés és receptek](05_etkezes/index.md)
