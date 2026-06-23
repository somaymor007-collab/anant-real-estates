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
      <section className="py-28 px-6 section-glow">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-accent uppercase tracking-[0.3em] font-semibold text-xs mb-4 block">
                ✦ Featured Listings
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Exclusive <span className="text-gradient-gold">Properties</span>
              </h2>
              <p className="text-foreground-muted font-light mt-3 max-w-md">
                Hand-picked by our experts for discerning buyers who expect nothing but the finest.
              </p>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-accent transition-colors group"
            >
              View All Properties
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <p className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">{stat.value}</p>
              <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
              <p className="text-foreground-muted text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====== WHY CHOOSE US ====== */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-accent uppercase tracking-[0.3em] font-semibold text-xs mb-4 block">
              ✦ The Anant Standard
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Beyond Real Estate. <br />
              <span className="text-gradient-gold italic">A Lifestyle.</span>
            </h2>
            <p className="text-foreground-muted font-light text-lg leading-relaxed mb-10">
              Our exclusive portfolio represents the pinnacle of luxury living. We offer 
              a confidential, unparalleled advisory service for buyers and sellers of the 
              world's most extraordinary properties.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "Expert Advisory", desc: "Our specialists guide you at every step" },
                { title: "Discreet Service", desc: "Complete privacy and confidentiality" },
                { title: "Global Network", desc: "Access properties across 40+ countries" },
                { title: "White Glove", desc: "Bespoke experience tailored to you" },
              ].map((feature) => (
                <div key={feature.title} className="glass border border-white/8 p-5 rounded-xl hover:border-accent/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-3">
                    <span className="text-accent text-sm">✦</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-foreground-muted text-xs leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glow-gold">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80"
                alt="Luxury Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="py-28 px-6 bg-surface/50 section-glow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-[0.3em] font-semibold text-xs mb-4 block">
              ✦ Client Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Voices of <span className="text-gradient-gold">Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass border border-white/8 p-6 rounded-2xl hover:border-accent/20 transition-all duration-300 group">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-foreground-muted font-light text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 border-t border-white/8 pt-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-foreground-muted text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-accent uppercase tracking-[0.3em] font-semibold text-xs mb-4 block">
            ✦ Ready to Begin?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Your Perfect Home <br />
            <span className="text-gradient-gold">Awaits You</span>
          </h2>
          <p className="text-foreground-muted font-light text-lg mb-10">
            Schedule a private consultation with our expert advisors today.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 bg-accent text-black px-8 py-4 rounded-full font-bold hover:bg-accent-bright transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 group"
            >
              Browse Properties
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 glass border border-white/10 text-white px-8 py-4 rounded-full font-medium hover:border-accent/40 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
