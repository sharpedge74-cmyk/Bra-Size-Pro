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
    if (!Number.isFinite(waist) || !Number.isFinite(hips) || waist <= 0 || hips <= 0) {
      alert('Please enter valid waist and hip measurements.');
      return;
    }
    const rows = IMRango.getData('sizes')?.panty_sizes || [];
    const row = rows.find(r => {
      const [wMin,wMax] = r.waist_in.split('-').map(Number);
      const [hMin,hMax] = r.hips_in.split('-').map(Number);
      return waist >= wMin && waist <= wMax && hips >= hMin && hips <= hMax;
    });
    const fallback = rows.find(r => {
      const [hMin,hMax] = r.hips_in.split('-').map(Number);
      return hips >= hMin && hips <= hMax;
    });
    const alpha = (row || fallback)?.label || 'Brand-dependent';
    document.getElementById('sh-res-size').textContent = alpha;
    document.getElementById('sh-res-level').textContent = `${compression.toUpperCase()} Compression`;
    document.getElementById('sh-res-rule').textContent = 'Use the manufacturer’s measurement chart for the selected compression garment. Do not assume that a compression level changes the labeled size.';
    const box = document.getElementById('shapewear-result-box');
    if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
});