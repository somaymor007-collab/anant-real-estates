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
      {/* Minimalist Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

        {/* Left Column — Text & CTA */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 text-foreground uppercase tracking-[0.25em] font-medium text-xs mb-8 px-4 py-2 rounded-full border border-border bg-surface">
              Curated Luxury Living
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-8 text-foreground"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find Your <br />
            <span className="font-semibold text-foreground">Sanctuary</span>
          </motion.h1>

          <motion.p
            className="text-foreground-muted font-light text-lg md:text-xl leading-relaxed max-w-lg mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover an exclusive collection of architecturally significant homes. 
            Luxury, redefined for the most discerning buyers.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-foreground/90 transition-all duration-300 shadow-xl shadow-foreground/10 group"
            >
              Explore Properties
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-full font-medium hover:bg-surface hover:border-foreground/20 transition-all duration-300"
            >
              Contact Advisory
            </Link>
          </motion.div>

          {/* Quick Stats Row */}
          <motion.div
            className="flex items-center gap-10 mt-16 pt-10 border-t border-border"
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
                <p className="text-3xl font-light text-foreground">{stat.value}</p>
                <p className="text-xs text-foreground-muted uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column — Hero Image */}
        <motion.div
          className="relative hidden lg:block h-full flex flex-col justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-foreground/5">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
              alt="Luxury Property"
              className="w-full h-full object-cover"
            />
            
            {/* Minimalist Floating Badge */}
            <motion.div
              className="absolute bottom-8 left-8 glass-dark p-6 rounded-2xl max-w-[240px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <p className="text-xs text-white/70 mb-2 uppercase tracking-widest">Featured</p>
              <p className="text-xl font-medium text-white mb-1">The Glass Pavilion</p>
              <p className="text-sm text-white/90">Beverly Hills, CA</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Search / Filter Bar */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto w-full px-6 pb-12 mt-12 lg:mt-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center gap-4 shadow-lg shadow-foreground/5">
          {/* Location */}
          <div className="flex-1 flex items-center gap-4 px-5 py-3 rounded-xl bg-background border border-border hover:border-foreground/20 transition-colors">
            <MapPin className="text-foreground-muted shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-xs text-foreground-muted mb-1 uppercase tracking-wider font-medium">Location</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Beverly Hills, NYC..."
                className="bg-transparent text-foreground font-medium text-sm w-full outline-none placeholder:text-foreground-muted/50 placeholder:font-light"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex-1 flex items-center gap-4 px-5 py-3 rounded-xl bg-background border border-border hover:border-foreground/20 transition-colors">
            <Home className="text-foreground-muted shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-xs text-foreground-muted mb-1 uppercase tracking-wider font-medium">Type</p>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="bg-transparent text-foreground font-medium text-sm w-full outline-none appearance-none cursor-pointer"
              >
                <option value="">Any Type</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
                <option value="mansion">Mansion</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex-1 flex items-center gap-4 px-5 py-3 rounded-xl bg-background border border-border hover:border-foreground/20 transition-colors">
            <DollarSign className="text-foreground-muted shrink-0" size={20} />
            <div className="flex-1">
              <p className="text-xs text-foreground-muted mb-1 uppercase tracking-wider font-medium">Budget</p>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-transparent text-foreground font-medium text-sm w-full outline-none appearance-none cursor-pointer"
              >
                <option value="">Any Budget</option>
                <option value="1m">Under $1M</option>
                <option value="5m">$1M – $5M</option>
                <option value="10m">$5M – $10M</option>
                <option value="10m+">$10M+</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-foreground text-background font-medium px-10 py-5 rounded-xl hover:bg-foreground/90 transition-all duration-300 shadow-md shadow-foreground/10 shrink-0"
          >
            <Search size={20} />
            <span className="hidden md:inline">Search</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
