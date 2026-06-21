(function() {
  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, c => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
    }[c]));
  }

  function getActivityDataCandidates() {
    const urls = [];
    const add = (u) => {
      if (!u) return;
      try {
        const abs = new URL(u, window.location.href).href;
        if (!urls.includes(abs)) urls.push(abs);
      } catch (_) {}
    };

    // MkDocs extra_javascript script absolute URL. This works both locally
    // and under a GitHub Pages/project subpath.
    const scripts = Array.from(document.getElementsByTagName("script"));
    const selfScript = scripts.find(s => s.src && s.src.includes("assets/js/activity-browser.js"));
    if (selfScript && selfScript.src) {
      add(new URL("../data/activities.json", selfScript.src).href);
    }

    // Fallbacks for local MkDocs pages with use_directory_urls on/off.
    add("/assets/data/activities.json");
    add("../../assets/data/activities.json");
    add("../assets/data/activities.json");
    add("assets/data/activities.json");
    return urls;
  }

  async function fetchFirstJson(candidates) {
    const errors = [];
    for (const url of candidates) {
      try {
        const r = await fetch(url, { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        return { data, url };
      } catch (e) {
        errors.push(`${url} → ${e.message}`);
      }
    }
    throw new Error(errors.join("\n"));
  }

  function initActivityBrowser() {
    const container = document.getElementById("activity-browser");
    if (!container) return;

    const ageOrder = ["0-3 hó","3-6 hó","6-9 hó","9-12 hó","12-18 hó","18-24 hó","2-3 év","3-4 év","4-5 év","5-6 év"];

    function uniqueSorted(items, field, order=null) {
      let vals = [...new Set(items.map(x => x[field]).filter(Boolean))];
      if (order) vals.sort((a,b) => {
        const ia = order.indexOf(a), ib = order.indexOf(b);
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
      });
      else vals.sort((a,b) => a.localeCompare(b, "hu"));
      return vals;
    }

    function sourceLinks(row) {
      const urls = String(row.source_urls || "").split(";").map(s => s.trim()).filter(Boolean);
      const ids = String(row.source_ids || "").split(";").map(s => s.trim()).filter(Boolean);
      if (!urls.length) return "—";
      return urls.map((u, i) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(ids[i] || "forrás")}</a>`).join(" ");
    }

    function tagBadges(row) {
      return String(row.evidence_tags || "").split(";").map(s => s.trim()).filter(Boolean).map(t => `<span class="badge">${esc(t)}</span>`).join(" ");
    }

    function render(rows) {
      const q = document.getElementById("q").value.trim().toLowerCase();
      const age = document.getElementById("age").value;
      const area = document.getElementById("area").value;
      const location = document.getElementById("location").value;
      const tag = document.getElementById("tag").value;

      const filtered = rows.filter(r => {
        const hay = Object.values(r).join(" ").toLowerCase();
        const tags = String(r.evidence_tags || "");
        const loc = String(r.location || "");
        return (!q || hay.includes(q)) &&
               (!age || r.age_range === age) &&
               (!area || r.area === area) &&
               (!location || loc.includes(location)) &&
               (!tag || tags.includes(tag));
      });

      document.getElementById("summary").textContent = `${filtered.length} tevékenység találat / ${rows.length} összesen`;

      const html = filtered.map(r => `
        <article class="activity-card">
          <h3>${esc(r.title)}</h3>
          <div class="activity-meta">
            ${esc(r.age_range)} · ${esc(r.area)} · ${esc(r.subarea)} · ${esc(r.location)}
            · előkészítés: ${esc(r.prep_min)} perc · játékidő: ${esc(r.duration_min)} perc
          </div>
          <p><strong>Cél:</strong> ${esc(r.short_goal)}</p>
          <p><strong>Eszköz:</strong> ${esc(r.materials)}</p>
          <details open>
            <summary>Hogyan csináljátok?</summary>
            <p>${esc(r.setup)}</p>
            <p><strong>Felnőtt szerepe:</strong> ${esc(r.adult_role)}</p>
          </details>
          <details>
            <summary>Könnyítés / nehezítés / megfigyelés</summary>
            <p><strong>Könnyítés:</strong> ${esc(r.easier)}</p>
            <p><strong>Nehezítés:</strong> ${esc(r.harder)}</p>
            <p><strong>Figyeld:</strong> ${esc(r.observe)}</p>
          </details>
          <details>
            <summary>Elméleti kapcsolat</summary>
            <p><strong>Montessori:</strong> ${esc(r.montessori_link)}</p>
            <p><strong>Személyiség:</strong> ${esc(r.personality_link)}</p>
            <p>${tagBadges(r)}</p>
            <p class="source-links"><strong>Források:</strong> ${sourceLinks(r)}</p>
          </details>
        </article>
      `).join("");

      document.getElementById("results").innerHTML = html || "<p>Nincs találat. Próbálj kevesebb szűrőt.</p>";
    }

    const candidates = getActivityDataCandidates();
    fetchFirstJson(candidates)
      .then(({data: rows, url}) => {
        if (!Array.isArray(rows) || rows.length === 0) {
          throw new Error("A tevékenység-adatbázis üres.");
        }
        container.innerHTML = `
          <div class="activity-controls">
            <label>Keresés
              <input id="q" type="search" placeholder="pl. öntés, érzelem, labda, szám, kinti">
            </label>
            <label>Életkor
              <select id="age"><option value="">Összes életkor</option></select>
            </label>
            <label>Terület
              <select id="area"><option value="">Összes terület</option></select>
            </label>
            <label>Helyszín
              <select id="location"><option value="">Összes</option><option value="benti">benti</option><option value="kinti">kinti</option></select>
            </label>
            <label>Címke
              <select id="tag"><option value="">Összes címke</option></select>
            </label>
          </div>
          <div class="activity-summary"><span id="summary"></span><br><small>Adatbázis: ${esc(url)}</small></div>
          <div id="results" class="activity-grid"></div>
        `;

        uniqueSorted(rows, "age_range", ageOrder).forEach(v => {
          document.getElementById("age").insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`);
        });
        uniqueSorted(rows, "area").forEach(v => {
          document.getElementById("area").insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`);
        });
        const tags = [...new Set(rows.flatMap(r => String(r.evidence_tags || "").split(";").map(s => s.trim()).filter(Boolean)))].sort((a,b)=>a.localeCompare(b,"hu"));
        tags.forEach(v => {
          document.getElementById("tag").insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`);
        });

        const params = new URLSearchParams(window.location.search);
        if (params.get("age")) document.getElementById("age").value = params.get("age");
        if (params.get("area")) document.getElementById("area").value = params.get("area");
        if (params.get("q")) document.getElementById("q").value = params.get("q");

        ["q","age","area","location","tag"].forEach(id => {
          document.getElementById(id).addEventListener("input", () => render(rows));
          document.getElementById(id).addEventListener("change", () => render(rows));
        });
        render(rows);
      })
      .catch(err => {
        container.innerHTML = `<p><strong>Nem sikerült betölteni a tevékenység-adatbázist.</strong></p><pre style="white-space: pre-wrap;">${esc(err.message)}</pre><p>Ellenőrizd, hogy lefutott-e: <code>python scripts\\build_data.py</code>, és hogy létezik-e: <code>docs/assets/data/activities.json</code></p>`;
        console.error(err);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initActivityBrowser);
  } else {
    initActivityBrowser();
  }
})();
