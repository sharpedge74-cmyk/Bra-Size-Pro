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
          input.value = (isCm ? value * 2.54 : value / 2.54).toFixed(1).replace(/\\.0$/, '');
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

    // Optional 6-point measurements
    const looseUnder = parseFloat(document.getElementById('loose-underbust')?.value);
    const snugUnder = parseFloat(document.getElementById('snug-underbust')?.value);
    const tightUnder = parseFloat(document.getElementById('tight-underbust')?.value);
    const standingBust = parseFloat(document.getElementById('standing-bust')?.value);
    const leaningBust = parseFloat(document.getElementById('leaning-bust')?.value);
    const lyingBust = parseFloat(document.getElementById('lying-bust')?.value);

    // If 6-point measurements given, calculate refined average
    if (snugUnder && standingBust) {
      underbust = snugUnder;
      // Weighted bust: leaning accounts for projection
      if (leaningBust && lyingBust) {
        bust = (standingBust + leaningBust * 1.5 + lyingBust) / 3.5;
      } else {
        bust = standingBust;
      }
    }

    if (unit === 'cm') {
      underbust = underbust / 2.54;
      bust = bust / 2.54;
    }

    if (underbust <= 20 || bust <= underbust) {
      alert('Please check your measurements. Bust measurement should be larger than underbust.');
      return;
    }

    const band = IMRango.calculateBand(underbust);
    const cupIdx = IMRango.calculateCupIndex(bust, underbust);
    const cupLetter = IMRango.getCupForSystem(cupIdx, system) || 'D';

    // Display primary result
    document.getElementById('result-primary-size').textContent = `${band}${cupLetter}`;
    document.getElementById('result-system-name').textContent = system.toUpperCase();

    // Calculate regional equivalents
    const usCup = IMRango.getCupForSystem(cupIdx, 'us') || 'D';
    const ukCup = IMRango.getCupForSystem(cupIdx, 'uk') || 'D';
    const euCup = IMRango.getCupForSystem(cupIdx, 'eu') || 'D';
    const bandMap = IMRango.getBandConversions(band);

    document.getElementById('equiv-us').textContent = `${band}${usCup}`;
    document.getElementById('equiv-uk').textContent = `${band}${ukCup}`;
    document.getElementById('equiv-eu').textContent = `${bandMap ? bandMap.eu : ''}${euCup}`;
    document.getElementById('equiv-au').textContent = `${bandMap ? Math.max(6, bandMap.au) : ''}${ukCup}`;

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
