"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, MapPin, Home, DollarSign } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (propertyType) params.set("type", propertyType);
    if (priceRange) params.set("price", priceRange);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background pt-20">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

        {/* Left Column — Text & CTA */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 text-accent uppercase tracking-[0.25em] font-semibold text-xs mb-6 px-3 py-1 rounded-full border border-accent/30 bg-accent/10">
              ✦ Premium Real Estate
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find Your <br />
            <span className="text-gradient-gold">Dream Home</span> <br />
            <span className="font-light text-foreground-muted text-4xl md:text-5xl lg:text-6xl">With Anant</span>
          </motion.h1>

          <motion.p
            className="text-foreground-muted font-light text-lg leading-relaxed max-w-lg mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover an exclusive collection of architecturally significant homes, 
            curated for the most discerning buyers. Luxury, redefined.
          </motion.p>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 bg-accent text-black px-8 py-4 rounded-full font-semibold hover:bg-accent-bright transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 group"
            >
              Explore Properties
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 glass border border-white/10 text-white px-8 py-4 rounded-full font-medium hover:border-accent/40 transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Quick Stats Row */}
          <motion.div
            className="flex items-center gap-8 mt-14 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {[
              { value: "150+", label: "Properties Sold" },
              { value: "99%", label: "Client Satisfaction" },
              { value: "12+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-accent">{stat.value}</p>
                <p className="text-xs text-foreground-muted uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column — Hero Image */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-full aspect-[3/4] max-h-[600px]">
            {/* Main image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden glow-gold">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
                alt="Luxury Property"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating Price Badge */}
            <motion.div
              className="absolute bottom-6 left-6 glass border border-white/10 p-4 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <p className="text-xs text-foreground-muted mb-1 uppercase tracking-widest">Starting From</p>
              <p className="text-2xl font-bold text-accent">$2.4M</p>
              <p className="text-xs text-foreground-muted mt-1">Beverly Hills, CA</p>
            </motion.div>

            {/* Floating Rating Badge */}
            <motion.div
              className="absolute top-6 right-6 glass border border-white/10 p-3 rounded-2xl flex items-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <span className="text-accent text-lg">★★★★★</span>
              <div>
                <p className="text-xs font-semibold text-white">5.0 Rating</p>
                <p className="text-xs text-foreground-muted">Verified</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Search / Filter Bar */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="glass border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Location */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/3">
            <MapPin className="text-accent shrink-0" size={18} />
            <div className="flex-1">
              <p className="text-xs text-foreground-muted mb-0.5 uppercase tracking-wider">Location</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Beverly Hills, NYC..."
                className="bg-transparent text-white text-sm w-full outline-none placeholder:text-foreground-muted/50"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/3">
            <Home className="text-accent shrink-0" size={18} />
            <div className="flex-1">
              <p className="text-xs text-foreground-muted mb-0.5 uppercase tracking-wider">Type</p>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="bg-transparent text-white text-sm w-full outline-none appearance-none"
              >
                <option value="" className="bg-surface">Any Type</option>
                <option value="villa" className="bg-surface">Villa</option>
                <option value="penthouse" className="bg-surface">Penthouse</option>
                <option value="mansion" className="bg-surface">Mansion</option>
                <option value="apartment" className="bg-surface">Apartment</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/3">
            <DollarSign className="text-accent shrink-0" size={18} />
            <div className="flex-1">
              <p className="text-xs text-foreground-muted mb-0.5 uppercase tracking-wider">Budget</p>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-transparent text-white text-sm w-full outline-none appearance-none"
              >
                <option value="" className="bg-surface">Any Budget</option>
                <option value="1m" className="bg-surface">Under $1M</option>
                <option value="5m" className="bg-surface">$1M – $5M</option>
                <option value="10m" className="bg-surface">$5M – $10M</option>
                <option value="10m+" className="bg-surface">$10M+</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-accent text-black font-bold px-8 py-4 rounded-xl hover:bg-accent-bright transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 shrink-0"
          >
            <Search size={18} />
            <span className="hidden md:inline">Search</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
