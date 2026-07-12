# Receptadatbázis szerkesztése

A receptek forrásfájlja:

`data/recipes.csv`

Excelben is megnyitható, de mentéskor maradjon **UTF-8 kódolású, pontosvesszővel tagolt CSV**.

## Frissítés

1. adj hozzá vagy módosíts egy sort a `data/recipes.csv` fájlban;
2. futtasd:

```bash
python scripts/build_data.py
```

3. helyi előnézet:

```bash
mkdocs serve
```

GitHubon commit/push után a workflow automatikusan lefuttatja ugyanezt.

## Kötelező mezők

- `id`
- `title`
- `stage`
- `age_min_months`
- `meal_type`
- `texture`
- `ingredients`
- `steps`
- `safety_notes`

Az ID legyen egyedi, például `R051`.

## Fontos szerkesztési szabály

A recept legyen saját megfogalmazású. Könyvből vagy weboldalról ne másolj át teljes receptet. A forrásmező azt jelzi, milyen irányelv vagy elv alapján készült, nem azt, hogy a konkrét recept szó szerint megtalálható ott.
