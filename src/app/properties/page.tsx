import { getProperties } from "@/lib/api/properties";
import PropertyGallery from "@/components/ui/PropertyGallery";

export const revalidate = 60;

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
          Exclusive <span className="font-semibold text-accent">Listings</span>
        </h1>
        <p className="text-muted-foreground font-light max-w-2xl">
          Explore our hand-picked selection of the most prestigious properties on the market.
        </p>
      </div>
      
      <PropertyGallery initialProperties={properties} />
    </div>
  );
}
