"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50 relative group">
          <span className="text-2xl font-bold tracking-wider text-foreground">
            ANANT
          </span>
          <span className="text-2xl font-light text-foreground-muted">ESTATES</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/admin"
            className="text-sm font-semibold bg-foreground text-background px-6 py-2.5 rounded-full hover:bg-foreground/90 transition-all duration-300 shadow-md shadow-foreground/10"
          >
            Admin Panel
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 relative text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 z-40 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-light text-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 px-10 py-3 bg-foreground text-background font-semibold rounded-full hover:bg-foreground/90 transition-all"
            >
              Admin Panel
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
