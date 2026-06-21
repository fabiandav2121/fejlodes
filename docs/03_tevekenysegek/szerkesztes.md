# Szerkesztés és frissítés

## Mit szerkessz?

A tevékenységek fő adatbázisa:

```text
data/activities.csv
```

Ezt Excelben is meg tudod nyitni, de mentéskor érdemes **CSV UTF-8** formátumban visszamenteni.

## Frissítés menete

1. Nyisd meg a `data/activities.csv` fájlt.
2. Adj hozzá új sort vagy módosíts meglévőt.
3. Futtasd:

```bat
python scripts/build_data.py
```

4. Indítsd újra vagy frissítsd a helyi oldalt:

```bat
mkdocs serve
```

A kereső a `docs/assets/data/activities.json` fájlból dolgozik, ezért a CSV módosítása után ezt a JSON-t kell újragenerálni.

## Mit ne szerkessz kézzel?

Általában ne szerkeszd a `docs/assets/data/activities.json` fájlt közvetlenül, mert a script felülírja.

## Excel szerepe

Az Excel-verzió áttekintésre és kényelmes böngészésre készült. A webes kereső forrása viszont a CSV/JSON adatbázis.


## CSV megnyitása Excelben

A v1.1-ben a `data/activities.csv` Excel-barát formátumú: pontosvesszős elválasztású és UTF-8 BOM-os. Magyar Windows/Excel alatt dupla kattintással általában jól nyílik. Ha mégsem, Excelben: **Adatok → Szövegből/CSV-ből**, majd válaszd a `65001: Unicode (UTF-8)` kódolást és a `;` elválasztót.
