/**
 * Bra Size to Measurements Reverse Lookup
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reverse-lookup-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const band = parseInt(document.getElementById('input-band').value, 10);
    const cup = document.getElementById('input-cup').value;
    const unit = document.getElementById('input-unit').value || 'inches';

    const cupIdx = IMRango.CUP_ORDER_US.indexOf(cup);
    const diff = cupIdx >= 0 ? cupIdx : 3;

    let targetUnderbustMin = band - 1;
    let targetUnderbustMax = band + 1;
    let targetBustMin = band + diff - 0.5;
    let targetBustMax = band + diff + 0.5;

    if (unit === 'cm') {
      targetUnderbustMin = Math.round(targetUnderbustMin * 2.54);
      targetUnderbustMax = Math.round(targetUnderbustMax * 2.54);
      targetBustMin = Math.round(targetBustMin * 2.54);
      targetBustMax = Math.round(targetBustMax * 2.54);
    }

    const unitStr = unit === 'cm' ? 'cm' : 'in';

    document.getElementById('res-underbust-range').textContent = `${targetUnderbustMin} - ${targetUnderbustMax} ${unitStr}`;
    document.getElementById('res-bust-range').textContent = `${targetBustMin} - ${targetBustMax} ${unitStr}`;
    document.getElementById('res-difference').textContent = `${unit === 'cm' ? Math.round(diff * 2.54) + ' cm' : diff + ' inches'}`;

    const resBox = document.getElementById('reverse-result-box');
    if (resBox) {
      resBox.style.display = 'block';
      resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
