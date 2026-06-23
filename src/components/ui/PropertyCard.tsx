"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BedDouble, Bath, Square, MapPin, ArrowUpRight } from "lucide-react";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  status: "available" | "sold";
  image_urls: string[];
}

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link href={`/properties/${property.id}`} className="block group">
        <div className="bg-background border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/5 hover:-translate-y-1.5 relative">
          
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden relative">
            <img
              src={property.image_urls[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Very subtle gradient overlay just for text readability at top/bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              {property.status === "sold" ? (
                <span className="bg-white/80 backdrop-blur-md text-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Sold
                </span>
              ) : (
                <span className="bg-foreground/90 backdrop-blur-md text-background px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Available
                </span>
              )}
            </div>

            {/* Arrow Icon on hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-background text-foreground p-2 rounded-full shadow-md">
                <ArrowUpRight size={16} />
              </div>
            </div>

            {/* Price on image */}
            <div className="absolute bottom-4 left-4">
              <p className="text-2xl font-medium text-white drop-shadow-md">{formatter.format(property.price)}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-foreground mb-1.5 line-clamp-1 group-hover:text-accent transition-colors duration-300">
              {property.title}
            </h3>
            
            <p className="flex items-center gap-1.5 text-foreground-muted text-sm mb-5 font-light">
              <MapPin size={14} className="shrink-0" />
              {property.location}
            </p>

            {/* Specs */}
            <div className="flex items-center justify-between border-t border-border pt-5 text-sm text-foreground-muted">
              <div className="flex items-center gap-2">
                <BedDouble size={16} className="text-foreground/40" />
                <span className="font-medium text-foreground/80">{property.beds}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Bath size={16} className="text-foreground/40" />
                <span className="font-medium text-foreground/80">{property.baths}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Square size={16} className="text-foreground/40" />
                <span className="font-medium text-foreground/80">{property.sqft.toLocaleString()} <span className="text-xs font-light">ft²</span></span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
