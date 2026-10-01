/**
 * Sports Bra Calculator
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sports-bra-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('sb-underbust').value);
    const bust = parseFloat(document.getElementById('sb-bust').value);
    const impact = document.getElementById('sb-impact').value;
    if (!Number.isFinite(underbust) || !Number.isFinite(bust) || underbust <= 0 || bust < underbust) {
      alert('Please enter valid measurements.');
      return;
    }
    const band = IMRango.calculateBand(underbust);
    if (band === null) {
      alert('Please enter an underbust measurement within the calculator reference range (27–51 inches / 68.6–129.5 cm).');
      return;
    }
    const cupIdx = IMRango.calculateCupIndex(bust, underbust, 'us');
    const cup = IMRango.getCupForSystem(cupIdx, 'us');
    if (cup === null) {
      alert('We could not calculate a cup starting point from these measurements.');
      return;
    }
    const style = impact === 'high'
      ? 'Look for a sports bra with secure encapsulation or well-engineered compression and adjustable straps.'
      : impact === 'medium'
        ? 'Look for a stable compression or encapsulation design with secure straps.'
        : 'A lighter-support compression or wireless design may be suitable.';
    document.getElementById('sb-res-bra-size').textContent = `${band}${cup} (starting point)`;
    document.getElementById('sb-res-alpha-size').textContent = 'Brand-dependent';
    document.getElementById('sb-res-style').textContent = style;
    document.getElementById('sb-res-impact').textContent = `${impact.toUpperCase()} IMPACT ACTIVITY`;
    const box = document.getElementById('sports-result-box');
    if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
});