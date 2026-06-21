
function parseCSV(text) {
  const rows = [];
  let row = [], cur = '', q = false;
  for (let i=0; i<text.length; i++) {
    const c = text[i], n = text[i+1];
    if (c === '"' && q && n === '"') { cur += '"'; i++; continue; }
    if (c === '"') { q = !q; continue; }
    if (c === ',' && !q) { row.push(cur); cur=''; continue; }
    if ((c === '
' || c === '') && !q) {
      if (cur || row.length) { row.push(cur); rows.push(row); row=[]; cur=''; }
      if (c === '' && n === '
') i++;
      continue;
    }
    cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  const header = rows.shift();
  return rows.map(r => Object.fromEntries(header.map((h,i)=>[h, r[i] || ''])));
}

document.addEventListener('DOMContentLoaded', async () => {
  const mount = document.getElementById('activity-search');
  if (!mount) return;
  const prefix = window.location.pathname.split('/03_tevekenysegek/')[0];
  const response = await fetch(prefix + '/data/activities.csv');
  const items = parseCSV(await response.text());
  const ages = [...new Set(items.map(x=>x.age))];
  const domains = [...new Set(items.map(x=>x.domain))];
  mount.innerHTML = `
    <div id="activity-controls">
      <input id="q" placeholder="Keresés: pl. érzelem, öntés, matematika...">
      <select id="age"><option value="">Minden életkor</option>${ages.map(a=>`<option>${a}</option>`).join('')}</select>
      <select id="domain"><option value="">Minden terület</option>${domains.map(d=>`<option>${d}</option>`).join('')}</select>
    </div>
    <div id="activity-count"></div>
    <div id="activity-results"></div>`;
  const render = () => {
    const q = document.getElementById('q').value.toLowerCase();
    const age = document.getElementById('age').value;
    const domain = document.getElementById('domain').value;
    const filtered = items.filter(x => (!age || x.age === age) && (!domain || x.domain === domain) && (!q || Object.values(x).join(' ').toLowerCase().includes(q)));
    document.getElementById('activity-count').textContent = `${filtered.length} tevékenység`;
    document.getElementById('activity-results').innerHTML = filtered.map(x => `
      <div class="activity-card">
        <h3>${x.title}</h3>
        <p class="activity-meta"><span class="badge">${x.age}</span><span class="badge">${x.domain}</span><span class="badge">${x.place}</span><span class="badge">${x.prep_time}</span></p>
        <p><strong>Bevezetés:</strong> ${x.intro}</p>
        <p><strong>Felnőtt szerepe:</strong> ${x.adult_role}</p>
        <p><strong>Könnyítés / nehezítés:</strong> ${x.easier} → ${x.harder}</p>
        <p><strong>Montessori / fejlődési fókusz:</strong> ${x.montessori}</p>
        <p><strong>Források:</strong> ${x.source_ids}</p>
      </div>`).join('');
  };
  ['q','age','domain'].forEach(id => document.getElementById(id).addEventListener('input', render));
  render();
});
