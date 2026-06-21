# Frissítési logika

A tudástár frissíthetősége miatt három réteget érdemes külön kezelni:

| Réteg | Fájlformátum | Mire való? |
|---|---|---|
| Elméleti fejezetek | Markdown `.md` | Olvasható, könyvszerű háttéranyag |
| Tevékenységtár | CSV + Excel | Szűrhető gyakorlati adatbázis |
| Weboldal | MkDocs Material | Kereshető, mobilbarát online könyv |

## Mi az igazság forrása?

A Markdown fájlok és a CSV-k. Az Excel kényelmes nézet, de hosszú távon a CSV-kből érdemes újragenerálni.

## Hogyan frissül?

1. Módosítod a Markdown vagy CSV fájlokat.
2. Commit és push GitHubra.
3. A GitHub Action lefuttatja a MkDocs buildet.
4. A GitHub Pages oldalon frissül a tartalom.
