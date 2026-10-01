/**
 * Universal Bra Size Calculator Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bra-calculator-form');
  if (!form) return;

  const unitSelect = document.getElementById('calc-unit');
  const systemSelect = document.getElementById('calc-system');
  const resultBox = document.getElementById('calc-result-box');

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
    const cupLetter = (system === 'uk' ? IMRango.CUP_ORDER_UK : (system === 'eu' ? IMRango.CUP_ORDER_EU : IMRango.CUP_ORDER_US))[cupIdx] || 'D';

    // Display primary result
    document.getElementById('result-primary-size').textContent = `${band}${cupLetter}`;
    document.getElementById('result-system-name').textContent = system.toUpperCase();

    // Calculate regional equivalents
    const usCup = IMRango.CUP_ORDER_US[cupIdx] || 'D';
    const ukCup = IMRango.CUP_ORDER_UK[cupIdx] || 'D';
    const euCup = IMRango.CUP_ORDER_EU[cupIdx] || 'D';
    const euBand = Math.round(band * 2.54 / 5) * 5 - 10; // Standard EU band formula

    document.getElementById('equiv-us').textContent = `${band}${usCup}`;
    document.getElementById('equiv-uk').textContent = `${band}${ukCup}`;
    document.getElementById('equiv-eu').textContent = `${Math.max(60, euBand)}${euCup}`;
    document.getElementById('equiv-au').textContent = `${Math.max(6, band - 22)}${ukCup}`;

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
