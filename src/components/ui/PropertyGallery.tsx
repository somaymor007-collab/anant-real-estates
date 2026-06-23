"use client";

import { useState } from "react";
import PropertyCard, { Property } from "./PropertyCard";

export default function PropertyGallery({ initialProperties }: { initialProperties: Property[] }) {
  const [filter, setFilter] = useState("all");
  
  const filtered = initialProperties.filter(p => {
    if (filter === "available") return p.status === "available";
    if (filter === "sold") return p.status === "sold";
    return true;
  });

  return (
    <div>
      <div className="flex gap-4 mb-12 border-b border-border pb-6 overflow-x-auto">
        <button 
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === "all" ? "bg-foreground text-background" : "bg-muted text-foreground hover:bg-border"}`}
        >
          All Properties
        </button>
        <button 
          onClick={() => setFilter("available")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === "available" ? "bg-foreground text-background" : "bg-muted text-foreground hover:bg-border"}`}
        >
          Available Only
        </button>
        <button 
          onClick={() => setFilter("sold")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === "sold" ? "bg-foreground text-background" : "bg-muted text-foreground hover:bg-border"}`}
        >
          Recently Sold
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length > 0 ? (
          filtered.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-muted-foreground font-light">
            No properties found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
