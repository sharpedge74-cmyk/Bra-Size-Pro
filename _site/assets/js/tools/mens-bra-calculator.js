/**
 * Men's Bra Calculator Logic (Gynecomastia, Broad Torso, Shallow Tissue)
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('mens-bra-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('mb-underbust').value);
    const bust = parseFloat(document.getElementById('mb-bust').value);
    const torsoType = document.getElementById('mb-torso').value; // broad, athletic, slender

    if (!underbust || !bust || bust <= underbust) {
      alert('Please enter valid measurements.');
      return;
    }

    // Male chests have wider sternums and shallower, wider root tissue
    const band = IMRango.calculateBand(underbust);
    let diff = bust - underbust;
    // Adjust down 0.5" for shallow wide tissue distribution to avoid cup gapping
    if (torsoType === 'broad') diff = Math.max(0, diff - 0.5);

    const cupIdx = Math.round(diff);
    const cup = IMRango.CUP_ORDER_US[cupIdx] || 'AA';

    document.getElementById('mb-res-size').textContent = `${band}${cup}`;
    document.getElementById('mb-res-style').textContent = 'Look for wireless bralettes, wide wings, shallow balcony cuts, or athletic compression vests.';

    const box = document.getElementById('mens-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
