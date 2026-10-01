/**
 * BraSizePRO Ad Management & Non-Intrusive Ad Slots
 */

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Mobile bottom closable ad handler
    var closeBtn = document.getElementById('close-mobile-ad');
    var mobileAd = document.getElementById('mobile-bottom-ad');
    if (closeBtn && mobileAd) {
      closeBtn.addEventListener('click', function() {
        mobileAd.classList.add('is-hidden');
        sessionStorage.setItem('BraSizePRO_mobile_ad_closed', '1');
      });

      if (sessionStorage.getItem('BraSizePRO_mobile_ad_closed') === '1') {
        mobileAd.classList.add('is-hidden');
      }
    }

    // Lazy ad initialization if live ad network tags are provided
    var adContainers = document.querySelectorAll('.ad-container');
    if (adContainers.length > 0) {
      // In production, instantiate Google AdSense or Prebid bidder here
    }
  });
})();
