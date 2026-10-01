/**
 * Matching Set Calculator Logic (Bra + Panty Set Coordination)
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('matching-set-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('set-underbust').value);
    const bust = parseFloat(document.getElementById('set-bust').value);
    const hips = parseFloat(document.getElementById('set-hips').value);

    if (!underbust || !bust || !hips) {
      alert('Please fill out all measurements.');
      return;
    }

    const band = IMRango.calculateBand(underbust);
    const cupIdx = IMRango.calculateCupIndex(bust, underbust);
    const cup = IMRango.CUP_ORDER_US[cupIdx] || 'C';

    let bottomAlpha = 'M';
    if (hips < 36) bottomAlpha = 'XS';
    else if (hips < 38) bottomAlpha = 'S';
    else if (hips < 40) bottomAlpha = 'M';
    else if (hips < 43) bottomAlpha = 'L';
    else if (hips < 46) bottomAlpha = 'XL';
    else bottomAlpha = '2XL';

    document.getElementById('set-res-bra').textContent = `${band}${cup}`;
    document.getElementById('set-res-bottom').textContent = bottomAlpha;
    document.getElementById('set-res-tip').textContent = 'Most high-end lingerie retailers sell bras and panties as separate mix-and-match pieces, allowing you to coordinate exact proportions.';

    const box = document.getElementById('set-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
