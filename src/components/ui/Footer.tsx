"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-block mb-6">
            <span className="text-3xl font-bold tracking-wider text-white">ANANT</span>
            <span className="text-3xl font-light text-accent"> ESTATES</span>
          </Link>
          <p className="text-foreground-muted max-w-md font-light text-sm leading-relaxed">
            Elevating the standard of living through curated, premium real estate. 
            We specialize in finding architecturally significant homes for discerning clients worldwide.
          </p>
          <div className="flex gap-3 mt-6">
            {["IG", "TW", "LI"].map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-xs font-bold text-foreground-muted hover:text-accent hover:border-accent/30 transition-all">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-6 uppercase tracking-widest text-xs text-accent">Company</h4>
          <ul className="space-y-4">
            {[
              { href: "/properties", label: "Properties" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
              { href: "/admin", label: "Admin" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-light text-foreground-muted flex items-center gap-2 hover:text-white transition-colors group">
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-6 uppercase tracking-widest text-xs text-accent">Contact</h4>
          <ul className="space-y-4 text-sm font-light text-foreground-muted">
            <li>hello@anantestates.com</li>
            <li>+1 (555) 000-0000</li>
            <li>Beverly Hills, CA 90210</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-foreground-muted">
        <p>&copy; {new Date().getFullYear()} Anant Real Estates. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
