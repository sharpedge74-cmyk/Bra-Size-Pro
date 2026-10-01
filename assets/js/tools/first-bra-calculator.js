/**
 * First Bra / Beginner Sizing Logic
 * Uses the same measurement calculation as the main calculator.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('first-bra-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const underbust = parseFloat(document.getElementById('fb-underbust').value);
    const bust = parseFloat(document.getElementById('fb-bust').value);
    if (!Number.isFinite(underbust) || !Number.isFinite(bust) || underbust <= 0 || bust < underbust) {
      alert('Please enter valid measurements.');
      return;
    }
    const band = IMRango.calculateBand(underbust);
    const cupIdx = IMRango.calculateCupIndex(bust, underbust);
    const cup = IMRango.getCupForSystem(cupIdx, 'us') || 'AA';
    let style = 'A soft, wire-free starter style may be easier to adjust for fit.';
    if (cupIdx <= 1) style = 'A soft, wire-free bralette or lightly lined starter style may be suitable.';
    else if (cupIdx >= 4) style = 'A supportive wire-free or bra-sized starter style may provide more room in the cup.';
    document.getElementById('fb-res-size').textContent = `${band}${cup}`;
    document.getElementById('fb-res-style').textContent = style;
    document.getElementById('fb-res-tip').textContent = 'Sizing varies by garment and brand; use the product size chart and reassess fit as measurements change.';
    const box = document.getElementById('first-result-box');
    if (box) { box.style.display = 'block'; box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
});