/**
 * Consent-gated third-party scripts, read through the Shopify Customer Privacy API.
 *
 * Any analytics or marketing script added to the theme (for example in a Custom Liquid
 * section) must be written as an inert placeholder:
 *
 *   <script type="text/plain" data-consent="analytics" data-src="https://example.com/tag.js"></script>
 *   <script type="text/plain" data-consent="marketing">console.log('runs after consent');</script>
 *
 * The browser does not run `type="text/plain"`, so nothing loads until the visitor's consent
 * allows that category. Then the placeholder is swapped for a real <script> (data-src becomes
 * src, other attributes are copied). Allowed categories: analytics, marketing, preferences.
 *
 * Shopify's own pixels, and apps that use the Customer Privacy API, handle consent themselves
 * and do not need this.
 *
 * This file also reveals the "Cookie preferences" button in the Legal links block once
 * Shopify's cookie banner is on the page, so visitors can change their choice later.
 */

/** @type {Record<string, (privacy: any) => boolean>} */
const CONSENT_CHECKS = {
  analytics: (privacy) => privacy.analyticsProcessingAllowed(),
  marketing: (privacy) => privacy.marketingAllowed(),
  preferences: (privacy) => privacy.preferencesProcessingAllowed(),
};

/** Swap every placeholder whose category is now allowed for a real script. */
function activateAllowedScripts() {
  const privacy = window.Shopify?.customerPrivacy;
  if (!privacy) return;

  /** @type {NodeListOf<HTMLScriptElement>} */
  const placeholders = document.querySelectorAll('script[type="text/plain"][data-consent]');

  for (const placeholder of placeholders) {
    const isAllowed = CONSENT_CHECKS[placeholder.dataset.consent ?? ''];
    if (!isAllowed || !isAllowed(privacy)) continue;

    const script = document.createElement('script');
    for (const { name, value } of placeholder.attributes) {
      if (name === 'type' || name === 'data-consent') continue;
      script.setAttribute(name === 'data-src' ? 'src' : name, value);
    }
    script.text = placeholder.text;
    placeholder.replaceWith(script);
  }
}

/**
 * Show the "Cookie preferences" button once Shopify's cookie banner API exists.
 * The banner loads on its own schedule, so check a few times before giving up;
 * without the banner the button stays hidden rather than doing nothing when clicked.
 */
function revealCookiePreferences(attemptsLeft = 20) {
  if (typeof window.privacyBanner?.showPreferences === 'function') {
    for (const item of document.querySelectorAll('[data-cookie-preferences]')) {
      if (item instanceof HTMLElement) item.hidden = false;
    }
    return;
  }
  if (attemptsLeft > 0) setTimeout(() => revealCookiePreferences(attemptsLeft - 1), 500);
}

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  if (!event.target.closest('[data-cookie-preferences] button')) return;
  window.privacyBanner?.showPreferences();
});

// Fired by Shopify when the visitor accepts, declines or changes their choice.
document.addEventListener('visitorConsentCollected', activateAllowedScripts);

window.Shopify?.loadFeatures?.([{ name: 'consent-tracking-api', version: '0.1' }], (error) => {
  if (error) return;
  activateAllowedScripts();
});

revealCookiePreferences();
