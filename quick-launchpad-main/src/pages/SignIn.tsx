import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Path points to components/auth/Captcha.tsx
import { Captcha } from "../components/auth/Captcha";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { auth, db } from "../lib/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const SignIn = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"farmer" | "investor">("farmer");
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Investor Security Guard
    if (userType === "investor" && !isCaptchaVerified) {
      toast.error("Security verification required. Please enter the correct captcha.");
      return;
    }

    try {
      let emailToAuth = identifier;

      // 1. Resolve Username or Phone to Email via Firestore
      if (!identifier.includes("@")) {
        const isPhone = /^\+?[1-9]\d{1,14}$/.test(identifier);
        const fieldToQuery = isPhone ? "phoneNumber" : "username";
        
        const q = query(collection(db, "users"), where(fieldToQuery, "==", identifier));
        const snap = await getDocs(q);
        
        if (snap.empty) {
          toast.error(`${fieldToQuery} not found. Please register first.`);
          return;
        }
        emailToAuth = snap.docs[0].data().email;
      }

      if (loginMethod === "password") {
        await signInWithEmailAndPassword(auth, emailToAuth, password);
        toast.success(`Welcome back to Char2Cash!`);
        navigate("/");
      } else {
        // Farmer OTP Trigger
        toast.info("Sending OTP to your registered device...");
      }
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Authentication failed. Please check your credentials.";
  toast.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-green-800">Char2Cash</h2>
          <p className="text-slate-400 text-sm">Empowering Sustainable Agriculture</p>
        </div>

        {/* ROLE SELECTOR */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          {(["farmer", "investor"] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                setUserType(role);
                setLoginMethod("password"); 
                setIsCaptchaVerified(false);
              }}
              className={`flex-1 py-2 text-sm font-semibold capitalize rounded-lg transition-all ${
                userType === role ? "bg-white text-green-700 shadow-sm" : "text-slate-400"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Identity</label>
            <Input
              type="text"
              placeholder="Username, Email, or Phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          {loginMethod === "password" && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* INVESTOR ONLY: CAPTCHA */}
          {userType === "investor" && (
            <div className="pt-2 animate-in fade-in slide-in-from-top-2">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Security Check</label>
              <Captcha onVerify={(isValid: boolean) => setIsCaptchaVerified(isValid)} />
            </div>
          )}

          {/* FARMER ONLY: OTP TOGGLE */}
          {userType === "farmer" && (
            <button
              type="button"
              onClick={() => setLoginMethod(loginMethod === "password" ? "otp" : "password")}
              className="text-sm text-green-600 font-medium hover:underline block mx-auto"
            >
              {loginMethod === "password" ? "Switch to OTP Login" : "Login with Password"}
            </button>
          )}

          <Button
            type="submit"
            disabled={userType === "investor" && !isCaptchaVerified}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12"
          >
            {loginMethod === "otp" ? "Get Verification Code" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;