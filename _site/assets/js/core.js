/**
 * IMRango Core Client-Side Logic
 */

window.IMRango = (function() {
  const THEME_KEY = 'imrango_theme';
  const STORAGE_PREFIX = 'imrango_data_';

  // Cached data objects parsed from inlined Liquid JSON blocks
  const dataCache = {};

  // Calculator sizing sequences are populated from _data/sizes.yml.
  // Keep the exported arrays mutable so tools using the public API receive
  // the same sizing data as the calculator itself.
  let CUP_ORDER_US = [];
  let CUP_ORDER_UK = [];
  let CUP_ORDER_EU = [];
  let CUP_ORDER_AU = [];

  function initData() {
    ['sizes', 'regions', 'brands', 'symptoms'].forEach(name => {
      const el = document.getElementById(`imrango-data-${name}`);
      if (el) {
        try {
          dataCache[name] = JSON.parse(el.textContent.trim());
        } catch (e) {
          console.warn(`Could not parse data for ${name}`, e);
        }
      }
    });

    const sequences = dataCache.sizes?.calculator_cup_sequences || {};
    CUP_ORDER_US = Array.isArray(sequences.us) ? sequences.us.slice() : [];
    CUP_ORDER_UK = Array.isArray(sequences.uk) ? sequences.uk.slice() : [];
    CUP_ORDER_EU = Array.isArray(sequences.eu) ? sequences.eu.slice() : [];
    CUP_ORDER_AU = Array.isArray(sequences.au) ? sequences.au.slice() : [];
  }

  function getData(name) {
    return dataCache[name] || null;
  }

  function refreshCupOrders() {
    const sequences = dataCache.sizes?.calculator_cup_sequences || {};
    CUP_ORDER_US = Array.isArray(sequences.us) ? sequences.us.slice() : [];
    CUP_ORDER_UK = Array.isArray(sequences.uk) ? sequences.uk.slice() : [];
    CUP_ORDER_EU = Array.isArray(sequences.eu) ? sequences.eu.slice() : [];
    CUP_ORDER_AU = Array.isArray(sequences.au) ? sequences.au.slice() : [];
  }

  function getCupList(system = 'us') {
    switch (system) {
      case 'uk': return CUP_ORDER_UK;
      case 'eu': return CUP_ORDER_EU;
      case 'au': return CUP_ORDER_AU;
      default: return CUP_ORDER_US;
    }
  }

  // Theme Management
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'pinkish';
    applyTheme(savedTheme);

    const toggleBtns = document.querySelectorAll('[data-theme-toggle]');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'pinkish';
        const next = current === 'pinkish' ? 'emerald' : 'pinkish';
        applyTheme(next);
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const labels = document.querySelectorAll('.theme-label');
    labels.forEach(label => {
      label.textContent = theme === 'pinkish' ? 'Rose Theme' : 'Emerald Theme';
    });
  }

  // Mobile navigation
  function initMobileNavigation() {
    const toggle = document.getElementById('mobile-nav-toggle');
    const nav = document.getElementById('site-navigation');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      const nextState = !open;
      toggle.setAttribute('aria-expanded', String(nextState));
      toggle.setAttribute('aria-label', nextState ? 'Close menu' : 'Open menu');
      nav.classList.toggle('is-open', nextState);
    });

    nav.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        nav.classList.remove('is-open');
      });
    });
  }

  // Clear User Data
  function initClearData() {
    const btns = document.querySelectorAll('[data-clear-data]');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Clear all your saved measurements and calculator inputs?')) {
          clearAllUserData();
        }
      });
    });
  }

  function clearAllUserData() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    document.querySelectorAll('form').forEach(f => f.reset());
    const results = document.querySelectorAll('.sizing-result-box');
    results.forEach(r => r.style.display = 'none');
    document.querySelectorAll('[role="alert"].calculator-alert').forEach(el => el.remove());
    alert('Your saved measurements have been cleared.');
  }

  function saveValue(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {}
  }

  function loadValue(key) {
    try {
      const v = localStorage.getItem(STORAGE_PREFIX + key);
      return v ? JSON.parse(v) : null;
    } catch (e) {
      return null;
    }
  }

  // Band calculation: direct snug underbust rounded to the nearest even value.
  // The accepted measurement range is derived from the first/last band rows
  // in _data/sizes.yml rather than duplicated in this file.
  function calculateBand(underbustInches) {
    const value = Number(underbustInches);
    const bands = dataCache.sizes?.bands || [];
    if (!Number.isFinite(value) || !bands.length) return null;

    const minInput = Number(bands[0].underbust_inches_min);
    const maxInput = Number(bands[bands.length - 1].underbust_inches_max);
    const maxBand = Number(bands[bands.length - 1].us_uk);

    if (!Number.isFinite(minInput) || !Number.isFinite(maxInput) || !Number.isFinite(maxBand)) return null;
    if (value < minInput || value > maxInput) return null;

    let rounded = Math.round(value);
    if (rounded % 2 !== 0) {
      rounded += 1;
    }
    return Math.min(rounded, maxBand);
  }

  function calculateCupIndex(bustInches, underbustInches, system = 'us') {
    const bust = Number(bustInches);
    const underbust = Number(underbustInches);
    const cupList = getCupList(system);
    if (!Number.isFinite(bust) || !Number.isFinite(underbust) || !cupList.length) return null;

    const diff = Math.max(0, bust - underbust);
    const index = Math.round(diff);
    return Math.min(index, cupList.length - 1);
  }

  function getCupForSystem(cupIndex, system = 'us') {
    const cupList = getCupList(system);
    return cupList[cupIndex] || null;
  }

  function getBandConversions(usUkBand) {
    const band = Number(usUkBand);
    if (!Number.isFinite(band)) return null;
    const rows = getData('sizes')?.bands || [];
    const row = rows.find(item => Number(item.us_uk) === band);
    if (!row) return null;
    return { us: band, uk: band, eu: row.eu_jp ?? null, au: row.au ?? null, fr: row.fr ?? null, it: row.it ?? null, jp: row.eu_jp ?? null };
  }

  function getSisterSizes(band, cupIndex, system = 'us') {
    const numericBand = Number(band);
    const numericCupIndex = Number(cupIndex);
    const cupList = getCupList(system);
    const sisters = { tighterBand: null, looserBand: null };

    if (!Number.isFinite(numericBand) || !Number.isInteger(numericCupIndex) || !cupList.length) return sisters;
    if (numericBand >= 30 && numericCupIndex < cupList.length - 1) {
      sisters.tighterBand = `${numericBand - 2}${cupList[numericCupIndex + 1]}`;
    }
    if (numericBand <= 48 && numericCupIndex > 0 && numericCupIndex < cupList.length) {
      sisters.looserBand = `${numericBand + 2}${cupList[numericCupIndex - 1]}`;
    }
    return sisters;
  }

  function initMeasurementUnits() {
    document.querySelectorAll('[data-measurement-unit-form]').forEach(form => {
      const unitSelect = form.querySelector('.measurement-unit-select');
      const inputs = Array.from(form.querySelectorAll('.measurement-input'));
      if (!unitSelect || !inputs.length) return;

      const updateUnits = (unit, convertValues = false) => {
        const toCm = unit === 'cm';
        inputs.forEach(input => {
          if (convertValues && input.value !== '') {
            const value = parseFloat(input.value);
            if (Number.isFinite(value)) {
              input.value = (toCm ? value * 2.54 : value / 2.54).toFixed(1).replace(/\.0$/, '');
            }
          }
          input.step = toCm ? '0.5' : '0.25';
        });
        form.querySelectorAll('.measurement-unit-label').forEach(label => {
          label.textContent = toCm ? 'cm' : 'in';
        });
      };

      updateUnits(unitSelect.value || 'inches');
      unitSelect.addEventListener('change', () => updateUnits(unitSelect.value, true));

      form.addEventListener('submit', () => {
        if (unitSelect.value !== 'cm') return;
        const displayedValues = inputs.map(input => input.value);
        inputs.forEach(input => {
          const value = parseFloat(input.value);
          if (Number.isFinite(value)) input.value = value / 2.54;
        });
        queueMicrotask(() => {
          inputs.forEach((input, index) => { input.value = displayedValues[index]; });
        });
      }, true);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initData();
    refreshCupOrders();
    initTheme();
    initClearData();
    initMeasurementUnits();
    initMobileNavigation();
  });

  function showError(formOrEl, msg) {
    if (!formOrEl) return;
    const container = formOrEl.closest?.('.calculator-card') || formOrEl.closest?.('form') || formOrEl.parentElement || document.body;
    const resultBox = container.querySelector?.('.sizing-result-box') || document.querySelector('.sizing-result-box');

    let alertEl = container.querySelector?.('[role="alert"].calculator-alert');
    if (!alertEl) {
      alertEl = document.createElement('div');
      alertEl.className = 'calculator-alert';
      alertEl.setAttribute('role', 'alert');
      if (resultBox && resultBox.parentNode) {
        resultBox.parentNode.insertBefore(alertEl, resultBox);
      } else if (formOrEl.parentNode) {
        formOrEl.parentNode.insertBefore(alertEl, formOrEl.nextSibling);
      } else {
        container.appendChild(alertEl);
      }
    }

    alertEl.textContent = msg;

    if (resultBox) {
      resultBox.style.display = 'none';
    }

    alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function clearError(formOrEl) {
    if (!formOrEl) {
      document.querySelectorAll('[role="alert"].calculator-alert').forEach(el => el.remove());
      return;
    }
    const container = formOrEl.closest?.('.calculator-card') || formOrEl.closest?.('form') || formOrEl.parentElement || document.body;
    const alerts = container.querySelectorAll?.('[role="alert"].calculator-alert') || [];
    alerts.forEach(el => el.remove());
  }

  function getBandErrorMessage(underbustInches) {
    const val = Number(underbustInches);
    if (Number.isFinite(val) && val < 27) {
      return "The calculator's reference range starts at 27 in (68.6 cm). For smaller frames, the shopper should use the brand's own youth/training bra chart.";
    }
    return "Please enter an underbust measurement within the calculator reference range (27–51 inches / 68.6–129.5 cm).";
  }

  return {
    getData,
    applyTheme,
    clearAllUserData,
    saveValue,
    loadValue,
    calculateBand,
    calculateCupIndex,
    getSisterSizes,
    get CUP_ORDER_US() { return CUP_ORDER_US; },
    get CUP_ORDER_UK() { return CUP_ORDER_UK; },
    get CUP_ORDER_EU() { return CUP_ORDER_EU; },
    get CUP_ORDER_AU() { return CUP_ORDER_AU; },
    getCupForSystem,
    getBandConversions,
    getCupList,
    showError,
    clearError,
    getBandErrorMessage
  };
})();
