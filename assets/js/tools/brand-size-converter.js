/**
 * Brand Size Converter Logic
 * Converts the baseline US cup to the target brand's stated sizing system.
 * Brand-specific fit notes are presented separately; they do not alter the calculated size.
 */
document.addEventListener('DOMContentLoaded', () => {
  const brandSelect = document.getElementById('target-brand');
  const baseBandInput = document.getElementById('base-band');
  const baseCupSelect = document.getElementById('base-cup');
  const convertBtn = document.getElementById('convert-brand-btn');
  const resultCard = document.getElementById('brand-result-card');
  if (!convertBtn) return;

  convertBtn.addEventListener('click', () => {
    const brandId = brandSelect.value;
    const band = parseInt(baseBandInput.value, 10);
    const cup = baseCupSelect.value;
    const brands = IMRango.getData('brands') || [];
    const brand = brands.find(b => b.id === brandId);

    if (!brand || !Number.isFinite(band) || band < 28 || band > 50 || band % 2 !== 0) {
      alert('Please enter a valid even band size from 28 to 50 and select a brand.');
      return;
    }

    const cupIdx = IMRango.CUP_ORDER_US.indexOf(cup);
    if (cupIdx < 0) {
      alert('Please select a valid baseline cup.');
      return;
    }

    const targetSystem = brand.sizing_system || 'us';
    const recommendedCup = IMRango.getCupForSystem(cupIdx, targetSystem) || cup;
    const recommendedBand = band;
    const fitAdvice = `The calculated size is the ${targetSystem.toUpperCase()}-system equivalent. Brand-specific fit can vary by style, fabric, and cut, so use the brand's product chart to confirm before ordering.`;

    document.getElementById('brand-res-name').textContent = brand.name;
    document.getElementById('brand-res-size').textContent = `${recommendedBand}${recommendedCup}`;
    document.getElementById('brand-res-system').textContent = targetSystem.toUpperCase();
    document.getElementById('brand-res-notes').textContent = brand.notes || '';
    document.getElementById('brand-res-advice').textContent = fitAdvice;

    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});