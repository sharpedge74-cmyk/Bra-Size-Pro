/**
 * Universal Bra Size Calculator Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bra-calculator-form');
  if (!form) return;

  const unitSelect = document.getElementById('calc-unit');
  const systemSelect = document.getElementById('calc-system');
  const resultBox = document.getElementById('calc-result-box');

  const measurementInputs = [
    document.getElementById('underbust-input'),
    document.getElementById('tight-underbust'),
    document.getElementById('bust-input'),
    document.getElementById('leaning-bust')
  ].filter(Boolean);

  const updateMeasurementUnits = (unit, convertValues = false) => {
    const isCm = unit === 'cm';
    measurementInputs.forEach((input) => {
      if (convertValues && input.value !== '') {
        const value = parseFloat(input.value);
        if (Number.isFinite(value)) {
          input.value = (isCm ? value * 2.54 : value / 2.54).toFixed(1).replace(/\.0$/, '');
        }
      }
      input.step = isCm ? '0.5' : '0.25';
    });

    form.querySelectorAll('.calc-input-unit').forEach((label) => {
      label.textContent = isCm ? 'cm' : 'in';
    });
  };

  updateMeasurementUnits(unitSelect?.value || 'inches');
  unitSelect?.addEventListener('change', () => {
    updateMeasurementUnits(unitSelect.value, true);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const unit = unitSelect ? unitSelect.value : 'inches';
    const system = systemSelect ? systemSelect.value : 'us';

    let underbust = parseFloat(document.getElementById('underbust-input').value) || 0;
    let bust = parseFloat(document.getElementById('bust-input').value) || 0;

    // Snug underbust and standing bust are the primary calculation measurements.\n    // Tight-underbust and leaning-bust remain optional fit-reference measurements;\n    // they are not blended into the size calculation without a validated formula.\n\n    if (unit === 'cm') {
      underbust = underbust / 2.54;
      bust = bust / 2.54;
    }

    if (underbust <= 20 || bust <= underbust) {
      alert('Please check your measurements. Bust measurement should be larger than underbust.');
      return;
    }

    const band = IMRango.calculateBand(underbust);
    if (band === null) {
      alert('Please enter an underbust measurement within the calculator reference range (27–51 inches / 68.6–129.5 cm).');
      return;
    }

    const cupIdx = IMRango.calculateCupIndex(bust, underbust, system);
    if (cupIdx === null) {
      alert('Please check your measurements and try again.');
      return;
    }

    const cupLetter = IMRango.getCupForSystem(cupIdx, system);
    if (cupLetter === null) {
      alert('We could not calculate a cup starting point from these measurements.');
      return;
    }

    // Display primary result
    document.getElementById('result-primary-size').textContent = `${band}${cupLetter} (starting point)`;
    document.getElementById('result-system-name').textContent = system.toUpperCase();

    // Calculate regional equivalents
    const usCup = IMRango.getCupForSystem(cupIdx, 'us');
    const ukCup = IMRango.getCupForSystem(cupIdx, 'uk');
    const euCup = IMRango.getCupForSystem(cupIdx, 'eu');
    const auCup = IMRango.getCupForSystem(cupIdx, 'au');
    const bandMap = IMRango.getBandConversions(band);

    document.getElementById('equiv-us').textContent = usCup ? `${band}${usCup}` : '—';
    document.getElementById('equiv-uk').textContent = ukCup ? `${band}${ukCup}` : '—';
    document.getElementById('equiv-eu').textContent = bandMap?.eu && euCup ? `${bandMap.eu}${euCup}` : '—';
    document.getElementById('equiv-au').textContent = bandMap?.au && auCup ? `${bandMap.au}${auCup}` : '—';

    // Sister sizes
    const sisters = IMRango.getSisterSizes(band, cupIdx, system);
    document.getElementById('sister-tighter').textContent = sisters.tighterBand || 'N/A';
    document.getElementById('sister-looser').textContent = sisters.looserBand || 'N/A';

    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Save to localStorage
    IMRango.saveValue('last_bra_calculation', { band, cupIdx, system });
  });
});
