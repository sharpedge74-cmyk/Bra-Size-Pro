/**
 * Bra Fit Checker Diagnostic Logic
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
    const band = parseInt(currentBandInput.value, 10) || 34;
    const cup = currentCupSelect.value || 'C';

    const symptomsData = IMRango.getData('symptoms') || [];
    const symptom = symptomsData.find(s => s.id === symId);

    if (!symptom) {
      alert('Please select a fit symptom to diagnose.');
      return;
    }

    document.getElementById('diag-title').textContent = symptom.title;
    document.getElementById('diag-cause').textContent = symptom.cause;
    document.getElementById('diag-fix').textContent = symptom.fix;

    // Suggest adjusted size based on symptom
    let recommendation = '';
    if (symId === 'band_rides_up') {
      recommendation = `Try sister-sizing from ${band}${cup} to ${band - 2}${nextCup(cup)} for a snugger, load-bearing band.`;
    } else if (symId === 'band_digs_painfully') {
      recommendation = `Test your band on backward. If it is comfortable, keep band ${band} and increase your cup to ${nextCup(cup)} or ${nextCup(nextCup(cup))}.`;
    } else if (symId === 'quad_boob_spillage' || symId === 'wires_poking_breast') {
      recommendation = `Increase cup volume immediately: try ${band}${nextCup(cup)} or ${band}${nextCup(nextCup(cup))}.`;
    } else if (symId === 'cup_gaping_wrinkling') {
      recommendation = `Check band tightness first. If band is snug, try a lower cup volume like ${band}${prevCup(cup)} or an unlined balcony cut.`;
    } else if (symId === 'gore_floating') {
      recommendation = `Center gore needs more room: try ${band}${nextCup(cup)} so wires can frame the sternum without floating.`;
    } else {
      recommendation = symptom.fix;
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
