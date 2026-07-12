(function() {
  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, c => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
    }[c]));
  }

  function dataCandidates() {
    const urls = [];
    const add = (u) => {
      if (!u) return;
      try {
        const abs = new URL(u, window.location.href).href;
        if (!urls.includes(abs)) urls.push(abs);
      } catch (_) {}
    };
    const scripts = Array.from(document.getElementsByTagName("script"));
    const selfScript = scripts.find(s => s.src && s.src.includes("assets/js/recipe-browser.js"));
    if (selfScript && selfScript.src) add(new URL("../data/recipes.json", selfScript.src).href);
    add("/assets/data/recipes.json");
    add("../../assets/data/recipes.json");
    add("../assets/data/recipes.json");
    add("assets/data/recipes.json");
    return urls;
  }

  async function fetchFirstJson(candidates) {
    const errors = [];
    for (const url of candidates) {
      try {
        const r = await fetch(url, { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return { data: await r.json(), url };
      } catch (e) { errors.push(`${url} → ${e.message}`); }
    }
    throw new Error(errors.join("\n"));
  }

  function list(s) {
    return String(s || "").split("|").map(x => x.trim()).filter(Boolean);
  }

  function sourceLinks(row) {
    const urls = String(row.source_urls || "").split(";").map(s => s.trim());
    const ids = String(row.source_ids || "").split(";").map(s => s.trim()).filter(Boolean);
    return ids.map((id, i) => urls[i]
      ? `<a href="${esc(urls[i])}" target="_blank" rel="noopener">${esc(id)}</a>`
      : `<span class="badge source-id">${esc(id)}</span>`).join(" ");
  }

  function badges(s, cls="") {
    return String(s || "").split(";").map(x => x.trim()).filter(Boolean)
      .map(x => `<span class="badge ${cls}">${esc(x)}</span>`).join(" ");
  }

  function init() {
    const container = document.getElementById("recipe-browser");
    if (!container) return;
    const stageOrder = ["6–8 hó","9–12 hó","12–24 hó","2–4 év","4–6 év"];

    fetchFirstJson(dataCandidates()).then(({data: rows, url}) => {
      if (!Array.isArray(rows) || !rows.length) throw new Error("A recept-adatbázis üres.");
      container.innerHTML = `
        <div class="recipe-controls">
          <label>Keresés
            <input id="rq" type="search" placeholder="pl. vas, lencse, meggy, gyors, hal">
          </label>
          <label>Életkor
            <select id="rstage"><option value="">Összes korcsoport</option></select>
          </label>
          <label>Étkezés
            <select id="rmeal"><option value="">Összes étkezés</option></select>
          </label>
          <label>Textúra
            <select id="rtexture"><option value="">Összes textúra</option></select>
          </label>
          <label>Étrend
            <select id="rdiet"><option value="">Összes étrend</option></select>
          </label>
          <label>Kizárt allergén
            <select id="rexclude"><option value="">Nincs kizárás</option></select>
          </label>
          <label>Címke
            <select id="rtag"><option value="">Összes címke</option></select>
          </label>
          <label class="recipe-check"><input id="rquick" type="checkbox"> Legfeljebb 20 perc</label>
        </div>
        <div class="recipe-summary"><span id="rsummary"></span><br><small>Adatbázis: ${esc(url)}</small></div>
        <div id="rresults" class="recipe-grid"></div>`;

      const uniq = (field, order=null) => {
        let vals = [...new Set(rows.map(r => r[field]).filter(Boolean))];
        vals.sort(order ? (a,b) => (order.indexOf(a)<0?999:order.indexOf(a))-(order.indexOf(b)<0?999:order.indexOf(b)) : (a,b)=>a.localeCompare(b,"hu"));
        return vals;
      };
      const addOpts = (id, vals) => vals.forEach(v => document.getElementById(id).insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`));
      addOpts("rstage", uniq("stage", stageOrder));
      addOpts("rmeal", uniq("meal_type"));
      addOpts("rtexture", uniq("texture"));
      addOpts("rdiet", uniq("diet"));
      const allergens = [...new Set(rows.flatMap(r => String(r.allergens||"").split(";").map(x=>x.trim()).filter(x=>x && x!=="nincs")))].sort((a,b)=>a.localeCompare(b,"hu"));
      addOpts("rexclude", allergens);
      const tags = [...new Set(rows.flatMap(r => String(r.evidence_tags||"").split(";").map(x=>x.trim()).filter(Boolean)))].sort((a,b)=>a.localeCompare(b,"hu"));
      addOpts("rtag", tags);

      function render() {
        const q = document.getElementById("rq").value.trim().toLowerCase();
        const stage = document.getElementById("rstage").value;
        const meal = document.getElementById("rmeal").value;
        const texture = document.getElementById("rtexture").value;
        const diet = document.getElementById("rdiet").value;
        const exclude = document.getElementById("rexclude").value;
        const tag = document.getElementById("rtag").value;
        const quick = document.getElementById("rquick").checked;
        const filtered = rows.filter(r => {
          const hay = Object.values(r).join(" ").toLowerCase();
          const total = Number(r.prep_min||0) + Number(r.cook_min||0);
          const allerg = String(r.allergens||"").split(";").map(x=>x.trim());
          return (!q || hay.includes(q)) &&
                 (!stage || r.stage===stage) &&
                 (!meal || r.meal_type===meal) &&
                 (!texture || r.texture===texture) &&
                 (!diet || r.diet===diet) &&
                 (!exclude || !allerg.includes(exclude)) &&
                 (!tag || String(r.evidence_tags||"").includes(tag)) &&
                 (!quick || total<=20);
        });
        document.getElementById("rsummary").textContent = `${filtered.length} recept / ${rows.length} összesen`;
        document.getElementById("rresults").innerHTML = filtered.map(r => `
          <article class="recipe-card">
            <h3>${esc(r.title)}</h3>
            <div class="recipe-meta">${esc(r.stage)} · ${esc(r.meal_type)} · ${esc(r.texture)} · ${esc(r.diet)} · ${esc(r.prep_min)}+${esc(r.cook_min)} perc</div>
            <p>${badges(r.evidence_tags)}</p>
            <p><strong>Táplálkozási fókusz:</strong> ${esc(r.nutrition_focus)}</p>
            <p><strong>Vasforrás:</strong> ${esc(r.iron_source)} · <strong>Fehérje:</strong> ${esc(r.protein_source)}</p>
            <p><strong>Allergének:</strong> ${esc(r.allergens)} · <strong>Hozzáadott cukor:</strong> ${esc(r.added_sugar)} · <strong>Hozzáadott só:</strong> ${esc(r.added_salt)}</p>
            <details open><summary>Hozzávalók és elkészítés</summary>
              <ul>${list(r.ingredients).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
              <p>${esc(r.steps)}</p>
            </details>
            <details><summary>Textúra és biztonság</summary>
              <p><strong>Textúra:</strong> ${esc(r.texture_notes)}</p>
              <p><strong>Biztonság:</strong> ${esc(r.safety_notes)}</p>
            </details>
            <details><summary>Családi adaptáció és tárolás</summary>
              <p>${esc(r.family_adaptation)}</p>
              <p><strong>Fagyasztható:</strong> ${esc(r.freezer_ok)} · <strong>Nagyobb adagban készíthető:</strong> ${esc(r.batch_ok)}</p>
            </details>
            <details><summary>Forrásalap</summary><p class="source-links">${sourceLinks(r)}</p></details>
          </article>`).join("") || '<p>Nincs találat. Próbálj kevesebb szűrőt.</p>';
      }
      ["rq","rstage","rmeal","rtexture","rdiet","rexclude","rtag","rquick"].forEach(id => {
        document.getElementById(id).addEventListener("input", render);
        document.getElementById(id).addEventListener("change", render);
      });
      render();
    }).catch(err => {
      container.innerHTML = `<p><strong>Nem sikerült betölteni a recept-adatbázist.</strong></p><pre style="white-space:pre-wrap">${esc(err.message)}</pre><p>Futtasd: <code>python scripts\\build_data.py</code>, és ellenőrizd a <code>docs/assets/data/recipes.json</code> fájlt.</p>`;
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
