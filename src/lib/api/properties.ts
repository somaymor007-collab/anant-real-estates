import { supabase } from "../supabase/client";
import { Property } from "@/components/ui/PropertyCard";

export async function getProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching properties:", error);
    // Return empty array or throw error depending on your error handling strategy
    return [];
  }

  // To support testing without a real DB connection, we can return mock data if data is empty
  if (!data || data.length === 0) {
    return getMockProperties();
  }

  return data as Property[];
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching property ${id}:`, error);
    
    // Fallback to mock data
    const mockProps = getMockProperties();
    const mock = mockProps.find(p => p.id === id);
    if (mock) return mock;

    return null;
  }

  return data as Property;
}

// Fallback Mock Data
export function getMockProperties(): Property[] {
  return [
    {
      id: "mock-1",
      title: "The Glass Pavilion",
      description: "An architectural masterpiece featuring floor-to-ceiling glass walls, an infinity pool overlooking the city, and a minimalist design aesthetic that blends seamlessly with the surrounding nature.",
      price: 8500000,
      location: "Beverly Hills, CA",
      beds: 5,
      baths: 6.5,
      sqft: 8200,
      status: "available",
      image_urls: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      ]
    },
    {
      id: "mock-2",
      title: "Slate & Timber Retreat",
      description: "A perfect blend of natural materials and ultra-modern design. This expansive estate features smart home automation, a private wellness center, and a 12-car subterranean garage.",
      price: 12400000,
      location: "Aspen, CO",
      beds: 6,
      baths: 8,
      sqft: 11500,
      status: "available",
      image_urls: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      ]
    },
    {
      id: "mock-3",
      title: "Skyline Penthouse",
      description: "Occupying the entire top floor, this penthouse offers 360-degree views of the skyline. It features a private rooftop terrace, a bespoke Italian kitchen, and a master suite with a dramatic view.",
      price: 15750000,
      location: "Manhattan, NY",
      beds: 4,
      baths: 4.5,
      sqft: 6800,
      status: "sold",
      image_urls: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      ]
    }
  ];
}
