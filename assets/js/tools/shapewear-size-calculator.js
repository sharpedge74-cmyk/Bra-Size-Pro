/**
 * Shapewear Size Calculator (Bodysuits, Thigh Slimmers, Waist Cinchers)
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('shapewear-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const waist = parseFloat(document.getElementById('sh-waist').value);
    const hips = parseFloat(document.getElementById('sh-hips').value);
    const compression = document.getElementById('sh-level').value; // light, firm, extra-firm

    if (!waist || !hips) {
      alert('Please enter waist and hip measurements.');
      return;
    }

    let alpha = 'M';
    if (hips < 36) alpha = 'XS';
    else if (hips < 38) alpha = 'S';
    else if (hips < 41) alpha = 'M';
    else if (hips < 44) alpha = 'L';
    else if (hips < 47) alpha = 'XL';
    else if (hips < 51) alpha = '2XL';
    else alpha = '3XL';

    let rule = 'NEVER size down in shapewear. Sizing down causes rolling, bulge spills, and poor circulation. The shaping power is already woven into your true size.';

    document.getElementById('sh-res-size').textContent = alpha;
    document.getElementById('sh-res-level').textContent = `${compression.toUpperCase()} Compression`;
    document.getElementById('sh-res-rule').textContent = rule;

    const box = document.getElementById('shapewear-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
