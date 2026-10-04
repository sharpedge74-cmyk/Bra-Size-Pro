/**
 * Shapewear Size Calculator
 * Selects the smallest alpha size whose hip and waist ranges both contain the measurements.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('shapewear-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const waist = parseFloat(document.getElementById('sh-waist').value);
    const hips = parseFloat(document.getElementById('sh-hips').value);
    const compression = document.getElementById('sh-level').value;
    IMRango.clearError(form);

    if (!Number.isFinite(waist) || !Number.isFinite(hips) || waist <= 0 || hips <= 0) {
      IMRango.showError(form, 'Please enter valid waist and hip measurements.');
      return;
    }
    const rows = IMRango.getData('sizes')?.panty_sizes || [];
    const parseRange = (value) => {
      const parts = String(value).split('-').map(Number);
      return parts.length === 2 && parts.every(Number.isFinite) ? parts : null;
    };

    const row = rows.find(r => {
      const waistRange = parseRange(r.waist_in);
      const hipRange = parseRange(r.hips_in);
      return waistRange && hipRange &&
        waist >= waistRange[0] && waist <= waistRange[1] &&
        hips >= hipRange[0] && hips <= hipRange[1];
    });

    if (!row) {
      const waistMatch = rows.some(r => {
        const range = parseRange(r.waist_in);
        return range && waist >= range[0] && waist <= range[1];
      });
      const hipMatch = rows.some(r => {
        const range = parseRange(r.hips_in);
        return range && hips >= range[0] && hips <= range[1];
      });

      document.getElementById('sh-res-size').textContent =
        waistMatch && hipMatch ? 'Check manufacturer chart' : 'Outside reference range';
      document.getElementById('sh-res-rule').textContent =
        waistMatch && hipMatch
          ? 'Your waist and hip measurements fall into different reference sizes. Check the specific garment chart rather than forcing one size.'
          : 'Your measurements fall outside this reference chart. Check the specific garment chart before choosing a size.';
    } else {
      document.getElementById('sh-res-size').textContent = row.label;
    }
    document.getElementById('sh-res-level').textContent = `${compression.toUpperCase()} Compression`;
    document.getElementById('sh-res-rule').textContent = 'Use the manufacturer’s measurement chart for the selected compression garment. Do not assume that a compression level changes the labeled size.';
    const box = document.getElementById('shapewear-result-box');
    if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
});