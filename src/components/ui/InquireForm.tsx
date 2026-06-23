"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/api/inquiries";
import { motion } from "framer-motion";

interface InquireFormProps {
  propertyId: string;
}

export default function InquireForm({ propertyId }: InquireFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      property_id: propertyId,
      user_name: formData.get("user_name") as string,
      user_email: formData.get("user_email") as string,
      user_phone: formData.get("user_phone") as string,
      message: formData.get("message") as string,
    };

    try {
      await submitInquiry(data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 rounded-2xl text-center"
      >
        <h3 className="text-2xl font-light mb-4">Thank You</h3>
        <p className="text-muted-foreground font-light text-sm">
          Your inquiry has been received. Our concierge team will contact you shortly to arrange a private viewing.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="glass p-8 rounded-2xl">
      <h3 className="text-2xl font-light mb-6">Schedule a Private Viewing</h3>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="user_name" className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            required
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="user_email" className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            required
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="user_phone" className="block text-sm font-medium mb-2">Phone (Optional)</label>
          <input
            type="tel"
            id="user_phone"
            name="user_phone"
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none"
            placeholder="I am interested in this property and would like to schedule a viewing..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-foreground text-background py-4 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Inquire Now"}
        </button>
      </form>
    </div>
  );
}
