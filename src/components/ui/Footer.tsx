"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-block mb-8">
            <span className="text-3xl font-bold tracking-wider text-foreground">ANANT</span>
            <span className="text-3xl font-light text-foreground-muted"> ESTATES</span>
          </Link>
          <p className="text-foreground-muted max-w-md font-light text-base leading-relaxed mb-8">
            Elevating the standard of living through curated, premium real estate. 
            We specialize in finding architecturally significant homes for discerning clients worldwide.
          </p>
          <div className="flex gap-4">
            {["IG", "TW", "LI"].map((s) => (
              <a key={s} href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-xs font-medium text-foreground-muted hover:text-foreground hover:border-foreground/20 transition-all shadow-sm hover:shadow-md">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-medium mb-6 uppercase tracking-widest text-xs text-foreground">Company</h4>
          <ul className="space-y-4">
            {[
              { href: "/properties", label: "Properties" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
              { href: "/admin", label: "Admin" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-light text-foreground-muted flex items-center gap-2 hover:text-foreground transition-colors group">
                  {link.label}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-medium mb-6 uppercase tracking-widest text-xs text-foreground">Contact</h4>
          <ul className="space-y-4 text-sm font-light text-foreground-muted">
            <li>hello@anantestates.com</li>
            <li>+1 (555) 000-0000</li>
            <li>Beverly Hills, CA 90210</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-light text-foreground-muted">
        <p>&copy; {new Date().getFullYear()} Anant Real Estates. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
