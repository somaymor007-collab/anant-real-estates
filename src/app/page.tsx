import Hero from "@/components/ui/Hero";
import PropertyCard from "@/components/ui/PropertyCard";
import { getProperties } from "@/lib/api/properties";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export const revalidate = 60;

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, Horizon Ventures",
    quote: "Anant Estates found us the perfect penthouse in under two weeks. Their concierge service is truly unmatched.",
    rating: 5,
    avatar: "SM",
  },
  {
    name: "James Whitfield",
    role: "International Investor",
    quote: "The most seamless property acquisition experience I've ever had. Anant's team is knowledgeable, discreet, and professional.",
    rating: 5,
    avatar: "JW",
  },
  {
    name: "Priya Sharma",
    role: "Architect & Developer",
    quote: "Every listing is carefully curated. As an architect, I appreciate their eye for exceptional design and quality.",
    rating: 5,
    avatar: "PS",
  },
];

const stats = [
  { value: "150+", label: "Premium Properties", sub: "Listed this year" },
  { value: "$2.4B", label: "Total Volume", sub: "In closed deals" },
  { value: "99%", label: "Client Satisfaction", sub: "Verified reviews" },
  { value: "12+", label: "Years of Excellence", sub: "In luxury real estate" },
];

export default async function Home() {
  const properties = await getProperties();
  const featuredProperties = properties.filter(p => p.status === "available").slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <Hero />

      {/* ====== FEATURED PROPERTIES ====== */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-border pb-8">
            <div>
              <span className="text-foreground-muted uppercase tracking-[0.3em] font-medium text-xs mb-4 block">
                Featured Listings
              </span>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight text-foreground">
                Exclusive <span className="font-semibold text-foreground">Properties</span>
              </h2>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/70 transition-colors group"
            >
              View All Properties
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section className="py-24 px-6 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <p className="text-5xl md:text-6xl font-light text-foreground mb-4">{stat.value}</p>
              <p className="text-foreground font-medium text-sm mb-1 uppercase tracking-wider">{stat.label}</p>
              <p className="text-foreground-muted text-xs font-light">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== WHY CHOOSE US ====== */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-foreground-muted uppercase tracking-[0.3em] font-medium text-xs mb-6 block">
              The Anant Standard
            </span>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-8">
              Beyond Real Estate. <br />
              <span className="font-semibold italic">A Lifestyle.</span>
            </h2>
            <p className="text-foreground-muted font-light text-xl leading-relaxed mb-12">
              Our exclusive portfolio represents the pinnacle of luxury living. We offer 
              a confidential, unparalleled advisory service for buyers and sellers of the 
              world&apos;s most extraordinary properties.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { title: "Expert Advisory", desc: "Our specialists guide you at every step" },
                { title: "Discreet Service", desc: "Complete privacy and confidentiality" },
                { title: "Global Network", desc: "Access properties across 40+ countries" },
                { title: "White Glove", desc: "Bespoke experience tailored to you" },
              ].map((feature) => (
                <div key={feature.title} className="border-l border-border pl-6">
                  <h4 className="text-foreground font-medium text-base mb-2">{feature.title}</h4>
                  <p className="text-foreground-muted text-sm font-light leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-foreground/5">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80"
                alt="Luxury Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="py-32 px-6 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-foreground-muted uppercase tracking-[0.3em] font-medium text-xs mb-6 block">
              Client Stories
            </span>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-foreground">
              Voices of <span className="font-semibold">Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-background border border-border p-8 rounded-3xl shadow-sm hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={16} className="fill-foreground text-foreground" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-foreground font-light text-base leading-relaxed mb-8 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-foreground font-medium text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">{t.name}</p>
                    <p className="text-foreground-muted font-light text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-foreground-muted uppercase tracking-[0.3em] font-medium text-xs mb-6 block">
            Ready to Begin?
          </span>
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-foreground mb-8">
            Your Perfect Home <br />
            <span className="font-semibold">Awaits You</span>
          </h2>
          <p className="text-foreground-muted font-light text-xl mb-12">
            Schedule a private consultation with our expert advisors today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/properties"
              className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-5 rounded-full font-medium hover:bg-foreground/90 transition-all duration-300 shadow-xl shadow-foreground/10 group"
            >
              Browse Properties
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-border text-foreground px-10 py-5 rounded-full font-medium hover:bg-surface hover:border-foreground/20 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
