/**
 * Plus-Size Bra Calculator
 * Uses snug underbust and an average of standing/leaning bust measurements.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('plus-size-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const snug = parseFloat(document.getElementById('ps-snug').value);
    const standing = parseFloat(document.getElementById('ps-standing').value);
    const leaning = parseFloat(document.getElementById('ps-leaning').value);
    if (![snug, standing, leaning].every(Number.isFinite) || snug <= 0 || standing < snug || leaning < snug) {
      alert('Please enter valid measurements.');
      return;
    }
    const band = IMRango.calculateBand(snug);
    const avgBust = (standing + leaning) / 2;
    const cupIdx = IMRango.calculateCupIndex(avgBust, snug);
    const usCup = IMRango.getCupForSystem(cupIdx, 'us') || 'AA';
    const ukCup = IMRango.getCupForSystem(cupIdx, 'uk') || 'AA';
    document.getElementById('ps-res-us').textContent = `${band}${usCup}`;
    document.getElementById('ps-res-uk').textContent = `${band}${ukCup}`;
    document.getElementById('ps-res-notes').textContent = 'Use the resulting size as a starting point and compare the manufacturer’s size chart and garment shape.';
    const box = document.getElementById('plus-result-box');
    if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
});