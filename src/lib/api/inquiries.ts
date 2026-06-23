import { supabase } from "../supabase/client";

export interface InquiryData {
  property_id: string;
  user_name: string;
  user_email: string;
  user_phone?: string;
  message: string;
}

export async function submitInquiry(data: InquiryData) {
  // Try real supabase insert first
  const { error } = await supabase
    .from("inquiries")
    .insert([data]);

  if (error) {
    console.error("Error submitting inquiry to Supabase:", error);
    
    // Check if we are running without actual DB config
    // If it's a fallback scenario, just log and resolve successfully for demo purposes
    if (process.env.NEXT_PUBLIC_SUPABASE_URL === undefined || process.env.NEXT_PUBLIC_SUPABASE_URL === "") {
      console.log("MOCK: Inquiry submitted successfully:", data);
      return { success: true };
    }
    
    throw new Error(error.message);
  }

  return { success: true };
}

export async function getInquiries() {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*, properties(title)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries:", error);
    // Return empty array for fallback
    return [];
  }

  return data;
}
