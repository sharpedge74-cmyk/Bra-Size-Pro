/**
 * First Bra / Beginner Sizing Logic
 * Uses the same measurement calculation as the main calculator.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('first-bra-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('fb-underbust').value);
    const bust = parseFloat(document.getElementById('fb-bust').value);
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
    const style = 'A soft, wire-free starter style may be a comfortable place to begin. Choose based on fit, coverage and personal preference.';
    document.getElementById('fb-res-size').textContent = `${band}${cup} (starting point)`;
    document.getElementById('fb-res-style').textContent = style;
    document.getElementById('fb-res-tip').textContent = 'Sizing varies by garment and brand; use the product size chart and reassess fit as measurements change.';
    const box = document.getElementById('first-result-box');
    if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
});