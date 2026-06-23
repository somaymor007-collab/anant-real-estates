import { getPropertyById, getProperties } from "@/lib/api/properties";
import InquireForm from "@/components/ui/InquireForm";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Square, MapPin } from "lucide-react";
import ImageGallery from "./ImageGallery"; // Client component for image gallery

export const revalidate = 60;

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({
    id: p.id,
  }));
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  // Fix for Next.js 15: await params if it's treated as a promise, but in stable App Router it's an object unless specified differently in newest versions. We will just use it normally, but to be safe with Next 15 `params` might need awaiting.
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      {/* Title & Price */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            {property.status === "sold" && (
              <span className="bg-foreground text-background px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                Sold
              </span>
            )}
            <p className="flex items-center gap-1 text-muted-foreground text-sm uppercase tracking-widest font-medium">
              <MapPin size={16} />
              {property.location}
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">{property.title}</h1>
        </div>
        <div className="text-4xl font-semibold text-accent">
          {formatter.format(property.price)}
        </div>
      </div>

      {/* Image Gallery (Client Component for interactive features) */}
      <ImageGallery images={property.image_urls} />

      {/* Specs & Description & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
        <div className="lg:col-span-2">
          {/* Key Specs */}
          <div className="flex flex-wrap items-center gap-8 py-8 border-y border-border mb-8">
            <div className="flex items-center gap-3">
              <BedDouble className="text-muted-foreground" size={24} />
              <div>
                <p className="text-sm text-muted-foreground font-light">Bedrooms</p>
                <p className="text-xl font-medium">{property.beds}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bath className="text-muted-foreground" size={24} />
              <div>
                <p className="text-sm text-muted-foreground font-light">Bathrooms</p>
                <p className="text-xl font-medium">{property.baths}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Square className="text-muted-foreground" size={24} />
              <div>
                <p className="text-sm text-muted-foreground font-light">Square Feet</p>
                <p className="text-xl font-medium">{property.sqft.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-light mb-6">About the Property</h2>
            <div className="prose prose-lg text-muted-foreground font-light leading-relaxed max-w-none">
              {property.description.split('\n').map((para, idx) => (
                <p key={idx} className="mb-4">{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Form Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            <InquireForm propertyId={property.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
