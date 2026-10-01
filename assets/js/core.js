/**
 * IMRango Core Client-Side Logic
 * Precision Intimates Fit Intelligence
 */

window.IMRango = (function() {
  const THEME_KEY = 'imrango_theme';
  const STORAGE_PREFIX = 'imrango_data_';

  // Cached data objects parsed from inlined Liquid JSON blocks
  const dataCache = {};

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
  }

  function getData(name) {
    return dataCache[name] || null;
  }

  // Theme Management
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'pinkish';
    applyTheme(savedTheme);

    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'pinkish';
        const next = current === 'pinkish' ? 'emerald' : 'pinkish';
        applyTheme(next);
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const label = document.getElementById('theme-current-label');
    if (label) {
      label.textContent = theme === 'pinkish' ? 'Rose Theme' : 'Emerald Theme';
    }
  }

  // Clear User Data
  function initClearData() {
    const btn = document.getElementById('clear-my-data-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        if (confirm('Clear all your saved measurements and calculator inputs?')) {
          clearAllUserData();
        }
      });
    }
  }

  function clearAllUserData() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    // Reset all forms in page
    document.querySelectorAll('form').forEach(f => f.reset());
    // Also clear any dynamically generated results
    const results = document.querySelectorAll('.sizing-result-box');
    results.forEach(r => r.style.display = 'none');
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

  // Universal Sizing Physics
  // Band calculation: Standard modern method (direct snug underbust rounded to closest even number)
  function calculateBand(underbustInches) {
    const value = Number(underbustInches);
    if (!Number.isFinite(value) || value < 27 || value > 51) return null;
    let rounded = Math.round(value);
    if (rounded % 2 !== 0) {
      rounded += 1;
    }
    return Math.min(rounded, 50);
  }

  const CUP_ORDER_US = ['AA', 'A', 'B', 'C', 'D', 'DD', 'DDD/F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
  const CUP_ORDER_UK = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'FF', 'G', 'GG', 'H', 'HH', 'J', 'JJ'];
  const CUP_ORDER_EU = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
  const CUP_ORDER_AU = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'FF', 'G', 'GG', 'H'];

  function calculateCupIndex(bustInches, underbustInches, system = 'us') {
    const bust = Number(bustInches);
    const underbust = Number(underbustInches);
    if (!Number.isFinite(bust) || !Number.isFinite(underbust)) return null;

    const diff = Math.max(0, bust - underbust);
    const index = Math.round(diff);
    const cupList = system === 'uk'
      ? CUP_ORDER_UK
      : (system === 'eu' ? CUP_ORDER_EU : (system === 'au' ? CUP_ORDER_AU : CUP_ORDER_US));

    return Math.min(index, cupList.length - 1);
  }

  function getCupForSystem(cupIndex, system = 'us') {
    const cupList = system === 'uk' ? CUP_ORDER_UK : (system === 'eu' ? CUP_ORDER_EU : (system === 'au' ? CUP_ORDER_AU : CUP_ORDER_US));
    return cupList[cupIndex] || null;
  }

  function getBandConversions(usUkBand) {
    const band = Number(usUkBand);
    if (!Number.isFinite(band)) return null;
    const regional = {28:[60,6,75,1],30:[65,8,80,2],32:[70,10,85,3],34:[75,12,90,4],36:[80,14,95,5],38:[85,16,100,6],40:[90,18,105,7],42:[95,20,110,8],44:[100,22,115,9],46:[105,24,120,10],48:[110,26,125,11],50:[115,28,130,12]};
    const row = regional[band];
    return {
      us: band,
      uk: band,
      eu: row ? row[0] : null,
      au: row ? row[1] : null,
      fr: row ? row[2] : null,
      it: row ? row[3] : null,
      jp: row ? row[0] : null
    };
  }

  function getSisterSizes(band, cupIndex, system = 'us') {
    const numericBand = Number(band);
    const numericCupIndex = Number(cupIndex);
    const cupList = system === 'uk'
      ? CUP_ORDER_UK
      : (system === 'eu' ? CUP_ORDER_EU : (system === 'au' ? CUP_ORDER_AU : CUP_ORDER_US));
    const sisters = { tighterBand: null, looserBand: null };

    if (!Number.isFinite(numericBand) || !Number.isInteger(numericCupIndex)) return sisters;
    if (numericBand >= 30 && numericCupIndex >= 0 && numericCupIndex < cupList.length - 1) {
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

      // Existing calculator logic expects inches. Temporarily normalize cm values
      // during submit, then restore the user's displayed unit after all listeners run.
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

  // DOM Content Loaded
  document.addEventListener('DOMContentLoaded', () => {
    initData();
    initTheme();
    initClearData();
    initMeasurementUnits();
  });

  return {
    getData,
    applyTheme,
    clearAllUserData,
    saveValue,
    loadValue,
    calculateBand,
    calculateCupIndex,
    getSisterSizes,
    CUP_ORDER_US,
    CUP_ORDER_UK,
    CUP_ORDER_EU,
    CUP_ORDER_AU,
    getCupForSystem,
    getBandConversions
  };
})();
