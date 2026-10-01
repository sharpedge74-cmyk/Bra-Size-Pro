/**
 * Maternity & Nursing Bra Calculator Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('maternity-calc-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('mat-underbust').value);
    const bust = parseFloat(document.getElementById('mat-bust').value);
    const trimester = document.getElementById('mat-stage').value; // t1, t2, t3, postpartum

    if (!underbust || !bust || bust <= underbust) {
      alert('Please enter valid measurements.');
      return;
    }

    let band = IMRango.calculateBand(underbust);
    let cupIdx = IMRango.calculateCupIndex(bust, underbust);

    let advice = '';
    if (trimester === 't1' || trimester === 't2') {
      advice = 'Your rib cage will expand by roughly 1 band size as the diaphragm shifts. Buy bras that fit on the tightest hook today so you can loosen them later.';
    } else if (trimester === 't3') {
      // Near due date: prepare for milk coming in (+1 to 2 cup sizes)
      cupIdx = Math.min(IMRango.CUP_ORDER_US.length - 1, cupIdx + 1);
      advice = 'At late pregnancy, your ribcage is at maximum width. Postpartum, your ribcage contracts while your breast tissue expands by 1-2 cup sizes when milk arrives.';
    } else {
      // Postpartum nursing
      advice = 'Choose flexible drop-down cups with soft-stretch fabrics to adapt between nursing sessions and engorgement.';
    }

    const cup = IMRango.CUP_ORDER_US[cupIdx] || 'D';

    document.getElementById('mat-res-size').textContent = `${band}${cup}`;
    document.getElementById('mat-res-advice').textContent = advice;

    const box = document.getElementById('maternity-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
