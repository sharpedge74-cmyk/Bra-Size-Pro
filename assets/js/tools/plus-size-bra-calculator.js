/**
 * Plus Size Bra Calculator Logic (Bands 38+, Cups DD to O)
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('plus-size-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const loose = parseFloat(document.getElementById('ps-loose').value) || 0;
    const snug = parseFloat(document.getElementById('ps-snug').value) || 0;
    const tight = parseFloat(document.getElementById('ps-tight').value) || 0;
    const standing = parseFloat(document.getElementById('ps-standing').value) || 0;
    const leaning = parseFloat(document.getElementById('ps-leaning').value) || 0;

    if (!snug || !standing) {
      alert('Please fill in at least snug underbust and standing bust.');
      return;
    }

    // In plus sizes, back tissue compression requires a firm band anchor
    let band = Math.round(snug);
    if (band % 2 !== 0) band -= 1; // plus size fitters often find firm band better than loose
    if (tight && snug - tight > 3) {
      // significant squish factor, round to tightest comfortable band
      band = Math.round(snug - 1);
      if (band % 2 !== 0) band -= 1;
    }

    // Average bust measurement with leaning projection
    const avgBust = leaning ? (standing + leaning * 2) / 3 : standing;
    const cupIdx = IMRango.calculateCupIndex(avgBust, snug);

    const usCup = IMRango.CUP_ORDER_US[cupIdx] || 'DD';
    const ukCup = IMRango.CUP_ORDER_UK[cupIdx] || 'E';

    document.getElementById('ps-res-us').textContent = `${band}${usCup}`;
    document.getElementById('ps-res-uk').textContent = `${band}${ukCup}`;
    document.getElementById('ps-res-notes').textContent = 'UK sizing brands (Elomi, Sculptresse, Goddess) offer broader underwires and deeper projection designed for curves.';

    const box = document.getElementById('plus-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
