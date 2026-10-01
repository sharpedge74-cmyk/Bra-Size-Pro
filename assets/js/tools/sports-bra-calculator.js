/**
 * Sports Bra Calculator Logic (Encapsulation vs Compression)
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sports-bra-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('sb-underbust').value);
    const bust = parseFloat(document.getElementById('sb-bust').value);
    const impact = document.getElementById('sb-impact').value; // low, medium, high

    if (!underbust || !bust || bust <= underbust) {
      alert('Please enter valid underbust and bust measurements.');
      return;
    }

    const band = IMRango.calculateBand(underbust);
    const cupIdx = IMRango.calculateCupIndex(bust, underbust);
    const cup = IMRango.CUP_ORDER_US[cupIdx] || 'C';

    let style = '';
    let alphaSize = 'M';
    if (band <= 32) alphaSize = cupIdx > 3 ? 'S-D+' : 'S';
    else if (band <= 36) alphaSize = cupIdx > 3 ? 'M-D+' : 'M';
    else if (band <= 40) alphaSize = cupIdx > 3 ? 'L-D+' : 'L';
    else alphaSize = 'XL+';

    if (impact === 'high' || cupIdx >= 4) {
      style = 'Encapsulation with underwire or molded individual cups (such as Panache Sport or Shock Absorber)';
    } else if (impact === 'medium') {
      style = 'Hybrid encapsulation-compression with racerback construction';
    } else {
      style = 'Compression crop or soft wireless seamless bralette';
    }

    document.getElementById('sb-res-bra-size').textContent = `${band}${cup}`;
    document.getElementById('sb-res-alpha-size').textContent = alphaSize;
    document.getElementById('sb-res-style').textContent = style;
    document.getElementById('sb-res-impact').textContent = `${impact.toUpperCase()} Impact Activity`;

    const box = document.getElementById('sports-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
