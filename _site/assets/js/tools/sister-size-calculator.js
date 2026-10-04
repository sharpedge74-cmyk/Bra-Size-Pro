/**
 * Sister Size Matrix Calculator
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sister-size-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const band = parseInt(document.getElementById('sister-band').value, 10);
    const cup = document.getElementById('sister-cup').value;
    const system = document.getElementById('sister-system').value || 'us';

    const cups = system === 'uk' ? IMRango.CUP_ORDER_UK : (system === 'eu' ? IMRango.CUP_ORDER_EU : (system === 'au' ? IMRango.CUP_ORDER_AU : IMRango.CUP_ORDER_US));
    const cupIdx = cups.indexOf(cup);

    IMRango.clearError(form);

    if (!Number.isInteger(band) || band < 28 || band > 50 || band % 2 !== 0) {
      IMRango.showError(form, 'Please enter an even band size from 28 to 50.');
      return;
    }

    if (cupIdx === -1) {
      IMRango.showError(form, 'Selected cup not found in chosen system.');
      return;
    }

    // Build sister matrix: -4 (2 cups up), -2 (1 cup up), current, +2 (1 cup down), +4 (2 cups down)
    const sisterRows = [];

    if (band >= 32 && cupIdx + 2 < cups.length) {
      sisterRows.push({ band: band - 4, cup: cups[cupIdx + 2], desc: 'Much tighter band, 2 cup steps up' });
    }
    if (band >= 30 && cupIdx + 1 < cups.length) {
      sisterRows.push({ band: band - 2, cup: cups[cupIdx + 1], desc: 'Snugger band, 1 cup step up — compare if the current band feels too loose' });
    }
    sisterRows.push({ band: band, cup: cups[cupIdx], desc: 'Your current starting size' });
    if (band <= 48 && cupIdx - 1 >= 0) {
      sisterRows.push({ band: band + 2, cup: cups[cupIdx - 1], desc: 'Looser band, 1 cup step down — compare if the current band feels too tight' });
    }
    if (band <= 46 && cupIdx - 2 >= 0) {
      sisterRows.push({ band: band + 4, cup: cups[cupIdx - 2], desc: 'Much looser band, 2 cup steps down' });
    }

    const tbody = document.getElementById('sister-matrix-body');
    if (tbody) {
      tbody.innerHTML = '';
      sisterRows.forEach(item => {
        const tr = document.createElement('tr');
        if (item.band === band) tr.classList.add('current-size-row');
        tr.innerHTML = `
          <td><strong>${item.band}${item.cup}</strong></td>
          <td>${item.band}</td>
          <td>${item.cup}</td>
          <td>${item.desc}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    const box = document.getElementById('sister-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
