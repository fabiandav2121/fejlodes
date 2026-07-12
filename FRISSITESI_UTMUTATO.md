# Frissítési útmutató – v1.5

## Elméleti szöveg módosítása

A `docs/` alatti megfelelő `.md` fájlt szerkeszd, majd commit/push.

## Tevékenység hozzáadása

Szerkeszd a `data/activities.csv` fájlt.

## Recept hozzáadása

Szerkeszd a `data/recipes.csv` fájlt. Új ID például: `R051`.

A helyi JSON-frissítéshez:

```bash
python scripts/build_data.py
```

A GitHub Actions ezt push után automatikusan lefuttatja.

## GitHubon

```bash
git add .
git commit -m "v1.5 étkezés modul"
git push
```

A könyvek teljes fájljait ne töltsd fel a public repóba.
