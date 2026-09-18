export function CookieConsent() {
  return (
    <aside className="cookie-banner" id="analytics-consent" role="dialog" aria-labelledby="analytics-consent-title" aria-describedby="analytics-consent-description" aria-live="polite" hidden>
      <div>
        <strong id="analytics-consent-title">Your privacy choices</strong>
        <p id="analytics-consent-description">Jenergie uses optional Google Analytics cookies to see how people use the website and contact links. Analytics only loads if you allow it. Read Google’s <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</p>
      </div>
      <div className="cookie-actions"><button type="button" data-analytics-choice="denied">Necessary only</button><button className="cookie-accept" type="button" data-analytics-choice="granted">Allow analytics</button></div>
    </aside>
  );
}
