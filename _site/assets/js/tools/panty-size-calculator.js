/**
 * Panty Size Calculator Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('panty-calc-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const unit = form.querySelector('.measurement-unit-select')?.value || 'inches';
    let waist = parseFloat(document.getElementById('panty-waist').value);
    let hips = parseFloat(document.getElementById('panty-hips').value);

    IMRango.clearError(form);

    if (!Number.isFinite(waist) || !Number.isFinite(hips) || waist <= 0 || hips <= 0) {
      IMRango.showError(form, 'Please enter valid positive waist and hip measurements.');
      return;
    }

    if (unit === 'cm') {
      waist /= 2.54;
      hips /= 2.54;
    }

    const rows = IMRango.getData('sizes')?.panty_sizes || [];
    if (!rows.length) {
      IMRango.showError(form, 'Panty size reference data is unavailable. Please try again.');
      return;
    }

    const parseRange = (value) => {
      const parts = String(value).split('-').map(Number);
      return parts.length === 2 && parts.every(Number.isFinite) ? parts : null;
    };

    const matchingRows = rows.filter((row) => {
      const waistRange = parseRange(row.waist_in);
      const hipRange = parseRange(row.hips_in);
      return waistRange && hipRange &&
        waist >= waistRange[0] && waist <= waistRange[1] &&
        hips >= hipRange[0] && hips <= hipRange[1];
    });

    // Hip fit is the primary reference for most panty cuts; waist helps
    // distinguish rows and flags cases where the body proportions differ.
    const hipRows = rows.filter((row) => {
      const range = parseRange(row.hips_in);
      return range && hips >= range[0] && hips <= range[1];
    });

    const result = matchingRows[0];
    if (!result && hipRows.length) {
      document.getElementById('panty-res-alpha').textContent = 'Check manufacturer chart';
      document.getElementById('panty-res-us').textContent = '—';
      document.getElementById('panty-res-uk').textContent = '—';
      document.getElementById('panty-res-eu').textContent = '—';
      const box = document.getElementById('panty-result-box');
      if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      return;
    }
    if (!result) {
      IMRango.showError(form, 'Your measurements fall outside this reference chart. Check the current brand size chart before choosing a size.');
      return;
    }

    document.getElementById('panty-res-alpha').textContent = result.label;
    document.getElementById('panty-res-us').textContent = result.us;
    document.getElementById('panty-res-uk').textContent = result.uk;
    document.getElementById('panty-res-eu').textContent = result.eu;

    const box = document.getElementById('panty-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
