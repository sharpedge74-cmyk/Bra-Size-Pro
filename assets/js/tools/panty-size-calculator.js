/**
 * Panty Size Calculator Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('panty-calc-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const waist = parseFloat(document.getElementById('panty-waist').value);
    const hips = parseFloat(document.getElementById('panty-hips').value);

    if (!waist || !hips) {
      alert('Please enter both natural waist and full hip measurements.');
      return;
    }

    // Standard hip-driven panty sizing (hips dictate fit for briefs and boyshorts)
    let size = 'M';
    let usNum = '8-10';
    let ukNum = '12-14';
    let euNum = '40-42';

    if (hips < 36) {
      size = 'XS'; usNum = '0-2'; ukNum = '4-6'; euNum = '32-34';
    } else if (hips < 38) {
      size = 'S'; usNum = '4-6'; ukNum = '8-10'; euNum = '36-38';
    } else if (hips < 40) {
      size = 'M'; usNum = '8-10'; ukNum = '12-14'; euNum = '40-42';
    } else if (hips < 43) {
      size = 'L'; usNum = '12-14'; ukNum = '16-18'; euNum = '44-46';
    } else if (hips < 46) {
      size = 'XL'; usNum = '16-18'; ukNum = '20-22'; euNum = '48-50';
    } else if (hips < 50) {
      size = '2XL'; usNum = '20-22'; ukNum = '24-26'; euNum = '52-54';
    } else {
      size = '3XL'; usNum = '24-26'; ukNum = '28-30'; euNum = '56-58';
    }

    document.getElementById('panty-res-alpha').textContent = size;
    document.getElementById('panty-res-us').textContent = usNum;
    document.getElementById('panty-res-uk').textContent = ukNum;
    document.getElementById('panty-res-eu').textContent = euNum;

    const box = document.getElementById('panty-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
