/**
 * Men's Bra / Chest Support Calculator
 * Uses the same measurement-based starting point as the general bra calculator.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('mens-bra-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('mb-underbust').value);
    const bust = parseFloat(document.getElementById('mb-bust').value);
    const torsoType = document.getElementById('mb-torso').value;
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
    document.getElementById('mb-res-size').textContent = `${band}${cup} (starting point)`;
    document.getElementById('mb-res-style').textContent = torsoType === 'broad'
      ? 'A wide-band or wire-free style may be worth comparing; fit depends on garment construction.'
      : 'Compare wire-free, supportive, or compression styles according to comfort and garment construction.';
    const box = document.getElementById('mens-result-box');
    if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
});