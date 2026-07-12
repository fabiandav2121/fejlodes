# Változások – v1.5

- Új **Étkezés** főmenü 13 oldallal.
- 50 recept a `data/recipes.csv` adatbázisban.
- Új, valóban adatbázisból működő receptkereső.
- Szűrés életkor, étkezéstípus, textúra, étrend, allergénkizárás, címke és elkészítési idő szerint.
- Minden receptnél: hozzávalók, elkészítés, táplálkozási fókusz, vas- és fehérjeforrás, allergének, textúra, biztonság és családi adaptáció.
- Új étkezési források a `data/sources.csv` fájlban.
- A `scripts/build_data.py` már a recepteket is ellenőrzi és JSON-ná alakítja.
- A központi forráslista automatikusan generálódik a `data/sources.csv` fájlból.
- A GitHub Actions workflow változatlanul automatikusan felépíti és publikálja az oldalt.
