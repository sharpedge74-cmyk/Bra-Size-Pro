/**
 * First Bra / Teen Beginner Sizing Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('first-bra-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('fb-underbust').value);
    const bust = parseFloat(document.getElementById('fb-bust').value);

    if (!underbust || !bust || bust < underbust) {
      alert('Please enter valid measurements.');
      return;
    }

    const diff = bust - underbust;
    let band = Math.round(underbust);
    if (band % 2 !== 0) band += 1;

    let style = 'Step 1: Seamless Crop Top / Camisole';
    let sizeDesc = `${band}AA / XS`;

    if (diff < 1) {
      style = 'Comfort stretch crop top / seamless starter bralette (zero padding, pure modesty)';
      sizeDesc = `${band}AA (Junior Sizing)`;
    } else if (diff >= 1 && diff < 2) {
      style = 'Soft wireless triangle bra or lightly lined cotton bralette';
      sizeDesc = `${band}A`;
    } else {
      style = 'Flexible wire-free bra with contoured modesty cups';
      const cupIdx = IMRango.calculateCupIndex(bust, underbust);
      sizeDesc = `${band}${IMRango.CUP_ORDER_US[cupIdx]}`;
    }

    document.getElementById('fb-res-size').textContent = sizeDesc;
    document.getElementById('fb-res-style').textContent = style;
    document.getElementById('fb-res-tip').textContent = 'For growing bodies, choose non-wired bras made with breathable modal or organic cotton that stretch naturally.';

    const box = document.getElementById('first-result-box');
    if (box) {
      box.style.display = 'block';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
