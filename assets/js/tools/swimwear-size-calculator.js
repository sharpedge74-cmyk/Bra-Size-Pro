/**
 * Swimwear Size Calculator (Bikini Tops & One-Pieces)
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('swimwear-calc-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('sw-underbust').value);
    const bust = parseFloat(document.getElementById('sw-bust').value);
    const torso = parseFloat(document.getElementById('sw-torso').value) || 60; // diagonal torso loop

    if (!underbust || !bust) {
      alert('Please provide underbust and bust measurements.');
      return;
    }

    const band = IMRango.calculateBand(underbust);
    const cupIdx = IMRango.calculateCupIndex(bust, underbust);
    const cup = IMRango.CUP_ORDER_US[cupIdx] || 'C';

    let onePieceSize = 'Brand-dependent';
    if (torso > 63) {
      onePieceSize = 'Brand-dependent — check long-torso options';
    }

    document.getElementById('sw-res-bikini').textContent = `${band}${cup} (Bra-Sized Top)`;
    document.getElementById('sw-res-onepiece').textContent = onePieceSize;
    document.getElementById('sw-res-tip').textContent = 'Use the bra-sized result as a starting point. For one-pieces, compare your bust, waist, hip, and torso measurements with the manufacturer’s current chart.';

    const box = document.getElementById('swimwear-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
