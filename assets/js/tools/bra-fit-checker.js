/**
 * Bra Fit Checker — symptom-based fit guidance.
 * This is a fit-reference tool, not a medical diagnostic.
 */
document.addEventListener('DOMContentLoaded', () => {
  const symptomSelect = document.getElementById('fit-symptom-select');
  const currentBandInput = document.getElementById('current-band');
  const currentCupSelect = document.getElementById('current-cup');
  const diagnoseBtn = document.getElementById('diagnose-btn');
  const resultCard = document.getElementById('diagnosis-result');
  if (!diagnoseBtn) return;

  diagnoseBtn.addEventListener('click', () => {
    const symId = symptomSelect.value;
    const band = parseInt(currentBandInput.value, 10);
    const cup = currentCupSelect.value;
    const symptomsData = IMRango.getData('symptoms') || [];
    const symptom = symptomsData.find(s => s.id === symId);

    IMRango.clearError(diagnoseBtn);

    if (!symptom || !Number.isFinite(band) || band < 28 || band > 50 || band % 2 !== 0) {
      IMRango.showError(diagnoseBtn, 'Please select a fit symptom and enter an even band size from 28 to 50.');
      return;
    }

    document.getElementById('diag-title').textContent = symptom.title;
    document.getElementById('diag-cause').textContent = symptom.cause;
    document.getElementById('diag-fix').textContent = symptom.fix;

    const next = nextCup(cup), prev = prevCup(cup);
    let recommendation = symptom.fix;
    if (symId === 'band_rides_up') {
      recommendation = next !== cup
        ? `As a fit experiment, compare ${band}${cup} with ${band - 2}${next} if a smaller band is available.`
        : 'Compare a smaller available band while keeping equivalent cup volume where possible.';
    } else if (symId === 'band_digs_painfully') {
      recommendation = `Check the band with the cups positioned correctly. If the band feels comfortable when the cups are excluded, compare the same band with a larger cup such as ${band}${next}.`;
    } else if (symId === 'quad_boob_spillage' || symId === 'wires_poking_breast' || symId === 'gore_floating') {
      recommendation = next !== cup
        ? `Compare ${band}${cup} with the next cup volume, ${band}${next}. Cup shape and wire width also affect this fit.`
        : 'Consider a larger cup volume or a different cup shape/wire width.';
    } else if (symId === 'cup_gaping_wrinkling') {
      recommendation = prev !== cup
        ? `If the band is secure, compare ${band}${cup} with ${band}${prev}, or try a different cup shape.`
        : 'If the band is secure, try a smaller cup volume or a different cup shape.';
    }

    document.getElementById('diag-recommendation').textContent = recommendation;
    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  function nextCup(c) {
    const idx = IMRango.CUP_ORDER_US.indexOf(c);
    return idx >= 0 && idx < IMRango.CUP_ORDER_US.length - 1 ? IMRango.CUP_ORDER_US[idx + 1] : c;
  }
  function prevCup(c) {
    const idx = IMRango.CUP_ORDER_US.indexOf(c);
    return idx > 0 ? IMRango.CUP_ORDER_US[idx - 1] : c;
  }
});