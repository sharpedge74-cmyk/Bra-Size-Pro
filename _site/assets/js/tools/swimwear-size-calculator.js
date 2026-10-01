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

    let onePieceSize = 'Size 8 (M)';
    if (band <= 32) onePieceSize = 'Size 4-6 (S)';
    else if (band <= 34) onePieceSize = 'Size 8 (M)';
    else if (band <= 36) onePieceSize = 'Size 10-12 (L)';
    else if (band <= 40) onePieceSize = 'Size 14-16 (XL)';
    else onePieceSize = 'Size 18-20 (2XL)';

    if (torso > 63) {
      onePieceSize += ' [Long Torso Fit Recommended]';
    }

    document.getElementById('sw-res-bikini').textContent = `${band}${cup} (Bra-Sized Top)`;
    document.getElementById('sw-res-onepiece').textContent = onePieceSize;
    document.getElementById('sw-res-tip').textContent = 'Swim fabrics expand approximately 10-15% when submerged in water. Always opt for a snug dry fit.';

    const box = document.getElementById('swimwear-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
