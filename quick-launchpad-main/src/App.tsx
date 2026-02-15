import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "./lib/firebase"; 
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

// Page Imports
import Index from "./pages/Index";
import Impact from "./pages/Impact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp"; // Added this import
import Learn from "./pages/Learn";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Hidden Firebase Test Function
  const testFirebase = async () => {
    try {
      const docRef = await addDoc(collection(db, "test"), {
        message: "Hello from Char2Cash!",
        timestamp: new Date(),
      });
      alert("Success! Data saved to local emulator. ID: " + docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Firebase Error: Check console.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-green-700 font-bold animate-pulse">Initializing Char2Cash...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/about" element={<About />} />
            
            {/* Authentication Routes */}
            <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <SignIn /> : <Navigate to="/" />} />
            
            {/* Dynamic Registration Route */}
            {/* This matches /signup/farmer and /signup/investor */}
            <Route path="/signup/:role" element={!user ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/register/:role" element={!user ? <SignUp /> : <Navigate to="/" />} />

            {/* Catch-all route for 404s */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        {/* Hidden Test Button */}
        <button 
          onClick={testFirebase} 
          style={{ position: 'fixed', bottom: 10, right: 10, opacity: 0.1, fontSize: '10px' }}
        >
          DB Test
        </button>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;