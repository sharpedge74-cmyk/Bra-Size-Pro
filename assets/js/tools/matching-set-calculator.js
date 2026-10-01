/**
 * Matching Set Calculator
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('matching-set-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('set-underbust').value);
    const bust = parseFloat(document.getElementById('set-bust').value);
    const hips = parseFloat(document.getElementById('set-hips').value);
    if (![underbust, bust, hips].every(Number.isFinite) || underbust <= 0 || bust < underbust || hips <= 0) {
      alert('Please enter valid measurements.');
      return;
    }
    const band = IMRango.calculateBand(underbust);
    if (band === null) {
      alert('Please enter an underbust measurement within the calculator reference range (27–51 inches).');
      return;
    }
    const cupIdx = IMRango.calculateCupIndex(bust, underbust, 'us');
    if (cupIdx === null) {
      alert('Please check your bust and underbust measurements.');
      return;
    }
    const cup = IMRango.getCupForSystem(cupIdx, 'us');
    if (cup === null) {
      alert('We could not calculate a cup starting point from these measurements.');
      return;
    }
    const rows = IMRango.getData('sizes')?.panty_sizes || [];
    const row = rows.find(r => {
      const parts = String(r.hips_in).split('-').map(Number);
      return parts.length === 2 && parts.every(Number.isFinite) && hips >= parts[0] && hips <= parts[1];
    });
    const bottomAlpha = row ? row.label : 'Outside reference range';
    document.getElementById('set-res-bra').textContent = `${band}${cup} (starting point)`;
    document.getElementById('set-res-bottom').textContent = bottomAlpha;
    document.getElementById('set-res-tip').textContent = 'The bottom size is based on the supplied hip measurement; bra and bottom pieces can use different sizes.';
    const box = document.getElementById('set-result-box');
    if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
});