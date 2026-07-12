from pathlib import Path
import csv, json

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
OUT = ROOT / "docs" / "assets" / "data"
OUT.mkdir(parents=True, exist_ok=True)


def read_csv(path: Path):
    text = path.read_text(encoding="utf-8-sig")
    if not text.strip():
        return []
    candidates = []
    for delim in [";", ",", "\t"]:
        rows = list(csv.DictReader(text.splitlines(), delimiter=delim))
        if rows:
            cols = len([c for c in rows[0].keys() if c])
            candidates.append((cols, rows))
    if not candidates:
        return []
    rows = max(candidates, key=lambda x: x[0])[1]
    return [{(k or "").strip(): (v.strip() if isinstance(v, str) else v) for k, v in r.items() if k} for r in rows]


def write_json(name, rows):
    p = OUT / name
    p.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Frissítve: {p} ({len(rows)} sor)")


def validate(rows, required, label):
    if not rows:
        raise SystemExit(f"HIBA: a {label} adatbázis üres vagy nem olvasható.")
    missing = [c for c in required if c not in rows[0]]
    if missing:
        raise SystemExit(f"HIBA: hiányzó kötelező oszlop(ok) a {label} adatbázisban: {', '.join(missing)}")
    ids = [r.get("id", "") for r in rows]
    duplicates = sorted({x for x in ids if x and ids.count(x) > 1})
    if duplicates:
        raise SystemExit(f"HIBA: duplikált ID-k a {label} adatbázisban: {', '.join(duplicates)}")


def write_sources_markdown(rows):
    target = ROOT / "docs" / "04_forrasok" / "forraslista.md"
    lines = [
        "# Forráslista",
        "",
        "A forráslista a `data/sources.csv` fájlból generálódik. A típus megmutatja, hogy elsődleges tudományos forrásról, hivatalos irányelvről, feltöltött könyvről vagy gyakorlati inspirációról van-e szó.",
        "",
    ]
    for r in rows:
        sid = r.get("id", "")
        title = r.get("title", sid)
        typ = r.get("type", "")
        url = r.get("url", "")
        note = r.get("note", "")
        lines += [f"## {sid}", "", f"**{title}**  ", f"Típus: `{typ}`  "]
        if url.startswith("http"):
            lines.append(f"URL: {url}  ")
        elif url:
            lines.append(f"Helyi forrás: {url}  ")
        if note:
            lines += ["", note]
        lines.append("")
    lines += [
        "## Megjegyzés a feltöltött könyvekhez",
        "",
        "A feltöltött könyvek teljes fájljai nem kerülnek a public GitHub repóba. A tudástárban csak saját összefoglalók, adaptációk és bibliográfiai hivatkozások szerepelnek.",
        "",
    ]
    target.write_text("\n".join(lines), encoding="utf-8")
    print(f"Frissítve: {target} ({len(rows)} forrás)")


def main():
    activities = read_csv(DATA / "activities.csv")
    recipes = read_csv(DATA / "recipes.csv")
    sources = read_csv(DATA / "sources.csv")

    validate(activities, ["id", "title", "age_range", "area", "location"], "tevékenység")
    validate(recipes, ["id", "title", "stage", "age_min_months", "meal_type", "texture", "ingredients", "steps", "safety_notes"], "recept")

    write_json("activities.json", activities)
    write_json("recipes.json", recipes)
    write_json("sources.json", sources)
    write_sources_markdown(sources)


if __name__ == "__main__":
    main()
