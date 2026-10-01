/**
 * Brand Size Converter Logic
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
    const band = parseInt(baseBandInput.value, 10) || 34;
    const cup = baseCupSelect.value || 'C';

    const brands = IMRango.getData('brands') || [];
    const brand = brands.find(b => b.id === brandId);

    if (!brand) {
      alert('Please select a lingerie brand.');
      return;
    }

    let recommendedBand = band;
    let recommendedCup = cup;
    let fitAdvice = '';

    if (brand.id === 'wacoal') {
      recommendedBand = band; // runs snug
      fitAdvice = 'Wacoal bands run quite firm with zero give. If you hate tight bands, take your sister size with a larger band.';
    } else if (brand.id === 'panache') {
      // Panache uses UK sizing
      fitAdvice = 'Panache is UK sized. For D+ cups, check UK equivalents (e.g., US DDD is UK E; US G is UK F). Highly supportive, firm wing elastic.';
    } else if (brand.id === 'skims') {
      fitAdvice = 'Skims cuts run compressive. Most clients prefer sizing up 1 band size for everyday wear.';
      recommendedBand = band + 2;
    } else if (brand.id === 'victorias-secret') {
      fitAdvice = "Victoria's Secret bands are very stretchy. Ensure you buy the true snug band and start on the loosest hook.";
    } else {
      fitAdvice = `${brand.name} has a ${brand.band_fit.toLowerCase()} band fit and ${brand.cup_depth.toLowerCase()} cups.`;
    }

    document.getElementById('brand-res-name').textContent = brand.name;
    document.getElementById('brand-res-size').textContent = `${recommendedBand}${recommendedCup}`;
    document.getElementById('brand-res-system').textContent = brand.sizing_system.toUpperCase();
    document.getElementById('brand-res-notes').textContent = brand.notes;
    document.getElementById('brand-res-advice').textContent = fitAdvice;

    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
