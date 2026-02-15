import { motion } from "framer-motion";
import { Leaf, Target, Users, Globe, Heart, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const milestones = [
  { year: "2024", title: "Founded", desc: "BioCharHub launched with a pilot in Karnataka covering 50 farmers." },
  { year: "2025", title: "Series A", desc: "Raised ₹12 Cr in funding. Expanded to 5 states across India." },
  { year: "2026", title: "Scale", desc: "3,200+ farmers onboarded. Processing 1,000+ tons of residue monthly." },
];

const partners = [
  "Indian Carbon Coalition",
  "GreenFuture Ventures",
  "AgriTech Foundation India",
  "CleanAir Initiative",
  "Rural Development Trust",
  "Sustainable Farming Alliance",
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">About BioCharHub</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our mission is to end crop residue burning by creating an economic incentive for farmers while sequestering carbon for a healthier planet.
          </p>
        </motion.div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Our Mission", desc: "Eliminate agricultural residue burning by creating a circular economy where waste becomes wealth." },
              { icon: Heart, title: "Our Values", desc: "Transparency, farmer-first, sustainability. Every transaction is verifiable. Every rupee traceable." },
              { icon: Globe, title: "Our Impact", desc: "Reduced air pollution, enriched farmland, empowered rural communities, and measurable carbon offsets." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">Our Journey</h2>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="font-display text-lg font-bold text-primary">{m.year}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key figures */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 mb-16"
        >
          <h2 className="font-display text-2xl font-bold text-center mb-8">Impact at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "45,000+", label: "Tons CO₂ Avoided" },
              { value: "3,200+", label: "Farmers Empowered" },
              { value: "₹20 Cr+", label: "Funds Raised" },
              { value: "5", label: "States Active" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl md:text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-primary-foreground/70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Partners */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">Our Partners & Investors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {partners.map((p) => (
              <div key={p} className="bg-card border border-border rounded-xl p-4 flex items-center justify-center">
                <span className="text-sm font-medium text-muted-foreground">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default About;
