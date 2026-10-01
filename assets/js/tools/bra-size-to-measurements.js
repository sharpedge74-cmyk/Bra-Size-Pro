/**
 * Bra Size to Measurements Reverse Lookup
 * Returns measurement ranges as estimates, not exact body dimensions.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reverse-lookup-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const band = parseInt(document.getElementById('input-band').value, 10);
    const cup = document.getElementById('input-cup').value;
    const unit = document.getElementById('input-unit').value || 'inches';
    const cupIdx = IMRango.CUP_ORDER_US.indexOf(cup);

    if (!Number.isFinite(band) || band < 28 || band > 50 || band % 2 !== 0 || cupIdx < 0) {
      alert('Please enter a valid band and cup size.');
      return;
    }

    const diff = cupIdx;
    const targetUnderbustMin = band - 1;
    const targetUnderbustMax = band + 1;
    const targetBustMin = band + diff - 0.5;
    const targetBustMax = band + diff + 0.5;

    const values = unit === 'cm'
      ? [targetUnderbustMin, targetUnderbustMax, targetBustMin, targetBustMax].map(v => Math.round(v * 2.54))
      : [targetUnderbustMin, targetUnderbustMax, targetBustMin, targetBustMax];

    const unitStr = unit === 'cm' ? 'cm' : 'in';
    document.getElementById('res-underbust-range').textContent = `${values[0]} - ${values[1]} ${unitStr}`;
    document.getElementById('res-bust-range').textContent = `${values[2]} - ${values[3]} ${unitStr}`;
    document.getElementById('res-difference').textContent = unit === 'cm'
      ? `${Math.round(diff * 2.54)} cm`
      : `${diff} inches`;

    const resBox = document.getElementById('reverse-result-box');
    if (resBox) {
      resBox.style.display = 'block';
      resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});