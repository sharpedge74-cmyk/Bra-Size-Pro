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
    if (band === null) {
      alert('Please enter a snug underbust measurement within the calculator reference range (27–51 inches / 68.6–129.5 cm).');
      return;
    }

    // Use the standing bust as the primary calculation measurement, matching
    // the site's general calculator. The leaning measurement remains a useful
    // fit reference but is not blended into an unsupported formula.
    const cupIdx = IMRango.calculateCupIndex(standing, snug, 'us');
    const usCup = IMRango.getCupForSystem(cupIdx, 'us');
    const ukCup = IMRango.getCupForSystem(cupIdx, 'uk');
    if (usCup === null || ukCup === null) {
      alert('We could not calculate a cup starting point from these measurements.');
      return;
    }
    document.getElementById('ps-res-us').textContent = `${band}${usCup} (starting point)`;
    document.getElementById('ps-res-uk').textContent = `${band}${ukCup} (starting point)`;
    document.getElementById('ps-res-notes').textContent = 'Use the resulting size as a starting point and compare the manufacturer’s size chart and garment shape.';
    const box = document.getElementById('plus-result-box');
    if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
});