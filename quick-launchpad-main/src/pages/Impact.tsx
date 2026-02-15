import { motion } from "framer-motion";
import { BarChart3, Globe, Leaf, Shield, TrendingUp, Users, Flame, Sprout } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const impactStats = [
  { icon: Flame, value: "45,200", label: "Tons CO₂ Avoided", sub: "From residue burning prevention", color: "text-destructive" },
  { icon: Sprout, value: "12,580", label: "Tons Carbon Sequestered", sub: "Through biochar conversion", color: "text-primary" },
  { icon: Users, value: "3,247", label: "Active Farmers", sub: "Contributing to sustainability", color: "text-leaf" },
  { icon: TrendingUp, value: "₹8.52 Cr", label: "Total Farmer Payouts", sub: "Direct income to rural households", color: "text-accent" },
  { icon: Globe, value: "1,850", label: "Carbon Verification Units", sub: "CVUs generated & verified", color: "text-primary" },
  { icon: Shield, value: "100%", label: "Transparent Ledger", sub: "All transactions publicly verifiable", color: "text-leaf" },
];

const recentTransactions = [
  { id: "TXN-24891", farmer: "Rajesh Kumar", type: "Residue Pickup", qty: "2.5 tons", amount: "₹12,500", date: "14 Feb 2026", status: "Verified" },
  { id: "TXN-24890", farmer: "Priya Devi", type: "Biochar Purchase", qty: "500 kg", amount: "₹8,200", date: "14 Feb 2026", status: "Delivered" },
  { id: "TXN-24889", farmer: "Suresh Yadav", type: "Residue Pickup", qty: "4.0 tons", amount: "₹20,000", date: "13 Feb 2026", status: "Processing" },
  { id: "TXN-24888", farmer: "Anita Sharma", type: "Biochar Purchase", qty: "1 ton", amount: "₹15,800", date: "13 Feb 2026", status: "Verified" },
  { id: "TXN-24887", farmer: "Mohan Singh", type: "Residue Pickup", qty: "3.2 tons", amount: "₹16,000", date: "12 Feb 2026", status: "Verified" },
];

const Impact = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Impact Dashboard</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A transparent hub for real-time data on carbon savings, farmer payouts, and sustainability metrics. Crucial for investor verification and CSR compliance.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-16">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <stat.icon className={`h-7 w-7 mb-3 ${stat.color}`} />
              <p className="font-display text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm font-semibold text-foreground mt-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Transaction ledger */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">Recent Transactions</h2>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-semibold text-foreground">ID</th>
                    <th className="text-left p-4 font-semibold text-foreground">Farmer</th>
                    <th className="text-left p-4 font-semibold text-foreground">Type</th>
                    <th className="text-left p-4 font-semibold text-foreground">Quantity</th>
                    <th className="text-left p-4 font-semibold text-foreground">Amount</th>
                    <th className="text-left p-4 font-semibold text-foreground">Date</th>
                    <th className="text-left p-4 font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-mono text-xs text-muted-foreground">{tx.id}</td>
                      <td className="p-4 text-foreground">{tx.farmer}</td>
                      <td className="p-4 text-foreground">{tx.type}</td>
                      <td className="p-4 text-foreground">{tx.qty}</td>
                      <td className="p-4 font-semibold text-foreground">{tx.amount}</td>
                      <td className="p-4 text-muted-foreground">{tx.date}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tx.status === "Verified" ? "bg-primary/10 text-primary" :
                          tx.status === "Delivered" ? "bg-accent/10 text-accent" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Impact;
