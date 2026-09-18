import Link from "next/link";

export function MobileNav() {
  return (
    <details className="mobile-menu">
      <summary>
        <span className="mobile-menu-label">Menu</span>
        <span className="mobile-menu-icon" aria-hidden="true"><i /><i /><i /></span>
      </summary>
      <div className="mobile-menu-links">
        <Link href="/">Home</Link>
        <Link href="/treatments/">Treatments</Link>
        <Link href="/prices/">Prices</Link>
        <Link href="/about/">About</Link>
        <Link href="/contact/">Contact Jenni</Link>
      </div>
    </details>
  );
}
