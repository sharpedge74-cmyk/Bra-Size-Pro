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
    const cupIdx = IMRango.calculateCupIndex(bust, underbust);
    const cup = IMRango.getCupForSystem(cupIdx, 'us') || 'AA';
    const rows = IMRango.getData('sizes')?.panty_sizes || [];
    const row = rows.find(r => {
      const min = Number(r.hips_in.split('-')[0]), max = Number(r.hips_in.split('-')[1]);
      return hips >= min && hips <= max;
    }) || rows[rows.length - 1];
    const bottomAlpha = row ? row.label : 'Brand-dependent';
    document.getElementById('set-res-bra').textContent = `${band}${cup}`;
    document.getElementById('set-res-bottom').textContent = bottomAlpha;
    document.getElementById('set-res-tip').textContent = 'The bottom size is based on the supplied hip measurement; bra and bottom pieces can use different sizes.';
    const box = document.getElementById('set-result-box');
    if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
});