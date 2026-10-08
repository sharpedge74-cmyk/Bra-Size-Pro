/**
 * Strapless Bra Size Calculator
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('strapless-bra-calculator-form');
  if (!form) return;

  const unitSelect = document.getElementById('strapless-calc-unit');
  const systemSelect = document.getElementById('strapless-calc-system');
  const underbustInput = document.getElementById('strapless-underbust');
  const bustInput = document.getElementById('strapless-bust');
  const resultBox = document.getElementById('strapless-result-box');

  const updateUnits = (unit, convertValues = false) => {
    const isCm = unit === 'cm';
    [underbustInput, bustInput].forEach((input) => {
      if (convertValues && input.value !== '') {
        const value = parseFloat(input.value);
        if (Number.isFinite(value)) {
          input.value = (isCm ? value * 2.54 : value / 2.54)
            .toFixed(1)
            .replace(/\.0$/, '');
        }
      }
      input.step = isCm ? '0.5' : '0.25';
    });
    form.querySelectorAll('.strapless-input-unit').forEach((label) => {
      label.textContent = isCm ? 'cm' : 'in';
    });
  };

  updateUnits(unitSelect?.value || 'inches');
  unitSelect?.addEventListener('change', () => updateUnits(unitSelect.value, true));

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let underbust = parseFloat(underbustInput.value);
    let bust = parseFloat(bustInput.value);
    const system = systemSelect?.value || 'us';

    IMRango.clearError(form);

    if (!Number.isFinite(underbust) || !Number.isFinite(bust)) {
      IMRango.showError(form, 'Please enter both measurements.');
      return;
    }

    if (unitSelect?.value === 'cm') {
      underbust /= 2.54;
      bust /= 2.54;
    }

    if (underbust <= 20 || bust <= underbust) {
      IMRango.showError(form, 'Please check your measurements. Bust measurement should be larger than underbust.');
      return;
    }

    const band = IMRango.calculateBand(underbust);
    if (band === null) {
      IMRango.showError(form, IMRango.getBandErrorMessage(underbust));
      return;
    }

    const cupIdx = IMRango.calculateCupIndex(bust, underbust, system);
    if (cupIdx === null) {
      IMRango.showError(form, 'Please check your measurements and try again.');
      return;
    }

    const selectedCup = IMRango.getCupForSystem(cupIdx, system);
    if (selectedCup === null) {
      IMRango.showError(form, 'We could not calculate a cup starting point from these measurements.');
      return;
    }

    document.getElementById('strapless-result-size').textContent = `${band}${selectedCup} (starting point)`;
    document.getElementById('strapless-result-system').textContent = system.toUpperCase();

    const usCup = IMRango.getCupForSystem(cupIdx, 'us');
    const ukCup = IMRango.getCupForSystem(cupIdx, 'uk');
    const euCup = IMRango.getCupForSystem(cupIdx, 'eu');
    const auCup = IMRango.getCupForSystem(cupIdx, 'au');
    const bandMap = IMRango.getBandConversions(band);

    document.getElementById('strapless-equiv-us').textContent = usCup ? `${band}${usCup}` : '—';
    document.getElementById('strapless-equiv-uk').textContent = ukCup ? `${band}${ukCup}` : '—';
    document.getElementById('strapless-equiv-eu').textContent = bandMap?.eu && euCup ? `${bandMap.eu}${euCup}` : '—';
    document.getElementById('strapless-equiv-au').textContent = bandMap?.au && auCup ? `${bandMap.au}${auCup}` : '—';

    const sisters = IMRango.getSisterSizes(band, cupIdx, system);
    document.getElementById('strapless-sister-tighter').textContent = sisters.tighterBand || 'N/A';
    document.getElementById('strapless-sister-looser').textContent = sisters.looserBand || 'N/A';

    document.getElementById('strapless-fit-guidance').textContent =
      'The band should sit level and feel secure without painful digging. If it rides up or needs constant pulling down, try the tighter sister size or another strapless design. If it causes discomfort, try the looser sister size or reassess the garment chart and cup fit.';

    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    IMRango.saveValue('last_strapless_bra_calculation', { band, cupIdx, system });
  });
});
