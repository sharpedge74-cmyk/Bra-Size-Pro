/**
 * Maternity & Nursing Bra Calculator
 * Provides a current-measurement starting size without predicting pregnancy-related body changes.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('maternity-calc-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('mat-underbust').value);
    const bust = parseFloat(document.getElementById('mat-bust').value);
    const stage = document.getElementById('mat-stage').value;
    if (!Number.isFinite(underbust) || !Number.isFinite(bust) || underbust <= 0 || bust < underbust) {
      alert('Please enter valid measurements.');
      return;
    }
    const band = IMRango.calculateBand(underbust);
    const cupIdx = IMRango.calculateCupIndex(bust, underbust);
    const cup = IMRango.getCupForSystem(cupIdx, 'us') || 'AA';
    const stageAdvice = {
      t1: 'Use your current measurements as the starting size and choose an adjustable band or nursing-friendly style if you expect measurements to change.',
      t2: 'Use your current measurements as the starting size; leave room for normal measurement changes by choosing adjustable construction.',
      t3: 'Use your current measurements as the starting size and prioritize adjustable fit rather than adding an assumed cup or band increase.',
      postpartum: 'Use your current measurements and prioritize adjustable cups/bands; sizing can change after delivery, so remeasure when needed.'
    };
    document.getElementById('mat-res-size').textContent = `${band}${cup}`;
    document.getElementById('mat-res-advice').textContent = stageAdvice[stage] || stageAdvice.postpartum;
    const box = document.getElementById('maternity-result-box');
    if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
});