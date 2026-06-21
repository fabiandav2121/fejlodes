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
    # Hungarian Excel often saves semicolon CSV; older files may be comma CSV.
    candidates = []
    for delim in [";", ",", "\t"]:
        rows = list(csv.DictReader(text.splitlines(), delimiter=delim))
        if rows:
            cols = len([c for c in rows[0].keys() if c])
            candidates.append((cols, rows))
    if not candidates:
        return []
    rows = max(candidates, key=lambda x: x[0])[1]
    clean = []
    for r in rows:
        clean.append({(k or "").strip(): (v.strip() if isinstance(v, str) else v) for k, v in r.items() if k})
    return clean


def write_json(name, rows):
    p = OUT / name
    p.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Frissítve: {p} ({len(rows)} sor)")


def main():
    activities = read_csv(DATA / "activities.csv")
    sources = read_csv(DATA / "sources.csv")

    if not activities:
        raise SystemExit("HIBA: a data/activities.csv üres vagy nem olvasható.")
    required = ["id", "title", "age_range", "area", "location"]
    missing = [c for c in required if c not in activities[0]]
    if missing:
        raise SystemExit(f"HIBA: hiányzó kötelező oszlop(ok) az activities.csv-ben: {', '.join(missing)}")
    ids = [r.get("id", "") for r in activities]
    duplicates = sorted({x for x in ids if x and ids.count(x) > 1})
    if duplicates:
        raise SystemExit(f"HIBA: duplikált tevékenység ID-k: {', '.join(duplicates)}")

    write_json("activities.json", activities)
    write_json("sources.json", sources)


if __name__ == "__main__":
    main()
