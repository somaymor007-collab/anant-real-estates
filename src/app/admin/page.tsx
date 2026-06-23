"use client";

import { useEffect, useState } from "react";
import { getProperties } from "@/lib/api/properties";
import { getInquiries } from "@/lib/api/inquiries";
import { Property } from "@/components/ui/PropertyCard";
import { motion } from "framer-motion";
import { LayoutDashboard, MessageSquare, Home, Plus, Settings, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("properties");
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // In a real app, this would use Supabase Auth session checking.
  // We use a simple mock login for demonstration.
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchData() {
        setLoading(true);
        const props = await getProperties();
        const inqs = await getInquiries();
        setProperties(props);
        setInquiries(inqs);
        setLoading(false);
      }
      fetchData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10 rounded-3xl w-full max-w-md border border-border"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light tracking-tight mb-2">Admin Access</h1>
            <p className="text-muted-foreground text-sm font-light">Sign in to manage Anant Real Estates</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input type="email" placeholder="Admin Email" required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none transition-all" />
            </div>
            <div>
              <input type="password" placeholder="Password" required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none transition-all" />
            </div>
            <button type="submit" className="w-full bg-foreground text-background py-4 rounded-lg font-medium hover:bg-accent transition-all duration-300">
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="bg-background border border-border rounded-2xl p-6 sticky top-32 shadow-sm">
            <div className="mb-8 px-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">Dashboard</p>
              <h2 className="text-xl font-light">Anant Admin</h2>
            </div>
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab("properties")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "properties" ? "bg-foreground text-background" : "hover:bg-muted text-foreground"}`}
              >
                <Home size={18} /> Properties
              </button>
              <button 
                onClick={() => setActiveTab("inquiries")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "inquiries" ? "bg-foreground text-background" : "hover:bg-muted text-foreground"}`}
              >
                <MessageSquare size={18} /> Inquiries
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-muted text-foreground">
                <Settings size={18} /> Settings
              </button>
            </nav>
            <div className="mt-12 pt-6 border-t border-border">
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
            </div>
          ) : activeTab === "properties" ? (
            <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border flex justify-between items-center bg-muted/10">
                <h3 className="text-xl font-medium">Property Listings</h3>
                <button className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-accent transition-colors">
                  <Plus size={16} /> Add Property
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/30 text-muted-foreground uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-medium">Property</th>
                      <th className="px-6 py-4 font-medium">Location</th>
                      <th className="px-6 py-4 font-medium">Price</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {properties.map(property => (
                      <tr key={property.id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4 font-medium">{property.title}</td>
                        <td className="px-6 py-4 text-muted-foreground">{property.location}</td>
                        <td className="px-6 py-4">${property.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${property.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {property.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-accent hover:underline text-sm font-medium">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/10">
                <h3 className="text-xl font-medium">Customer Inquiries</h3>
              </div>
              <div className="divide-y divide-border">
                {inquiries.length > 0 ? inquiries.map((inq, idx) => (
                  <div key={idx} className="p-6 hover:bg-muted/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-foreground">{inq.user_name}</h4>
                      <span className="text-xs text-muted-foreground">{new Date(inq.created_at || Date.now()).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{inq.user_email} • {inq.user_phone}</p>
                    <div className="bg-muted/30 p-4 rounded-lg text-sm text-foreground/80 font-light border border-border/50">
                      {inq.message}
                    </div>
                    {inq.properties?.title && (
                      <p className="text-xs text-accent mt-4 font-medium">
                        Interested in: {inq.properties.title}
                      </p>
                    )}
                  </div>
                )) : (
                  <div className="p-12 text-center text-muted-foreground font-light">
                    No inquiries found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
