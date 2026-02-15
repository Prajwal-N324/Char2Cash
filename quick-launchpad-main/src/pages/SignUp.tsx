import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  createUserWithEmailAndPassword,
  PhoneAuthProvider,
  updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

const SignUp = () => {
  const navigate = useNavigate();
  const { role } = useParams(); 
  const [step, setStep] = useState<"details" | "otp">("details");
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    fullName: ""
  });
  
  const [verificationId, setVerificationId] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const setupRecaptcha = () => {
    // Configures the invisible reCAPTCHA widget
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
  };

  const handleRegisterInitiate = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    if (!appVerifier) {
      toast.error("Security check failed to load. Please refresh.");
      return;
    }

    try {
      // Sends SMS via Firebase
      const confirmation = await signInWithPhoneNumber(auth, formData.phone, appVerifier);
      setVerificationId(confirmation.verificationId);
      setStep("otp");
      toast.success("OTP sent successfully!");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to send SMS";
      toast.error(message);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = undefined;
      }
    }
  };

  const verifyOtpAndCreateAccount = async () => {
    try {
      // 1. Validate the OTP code using the verificationId
      const credential = PhoneAuthProvider.credential(verificationId, otpCode);
      
      // 2. Create the Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: formData.fullName });

      // 3. Save Role and Details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phone,
        fullName: formData.fullName,
        role: role, 
        createdAt: new Date()
      });

      toast.success(`Welcome to Char2Cash, ${formData.fullName}!`);
      navigate("/");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Verification failed";
      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50">
      {/* Required placeholder for the reCAPTCHA widget */}
      <div id="recaptcha-container"></div> 
      
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-2 capitalize">{role} Sign Up</h2>
        <p className="text-center text-slate-500 mb-6 italic">Secure verification required</p>
        
        {step === "details" ? (
          <form onSubmit={handleRegisterInitiate} className="space-y-4">
            <Input placeholder="Full Name" required onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
            <Input placeholder="Username" required onChange={(e) => setFormData({...formData, username: e.target.value})} />
            <Input type="email" placeholder="Email Address" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <Input type="tel" placeholder="Phone (e.g., +919999988888)" required onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <Input type="password" placeholder="Password" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
            
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-12">Get OTP</Button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-slate-500">Enter the 6-digit code sent to {formData.phone}</p>
            <Input 
              placeholder="000000" 
              className="text-center text-2xl tracking-widest h-14" 
              maxLength={6}
              onChange={(e) => setOtpCode(e.target.value)} 
            />
            <Button onClick={verifyOtpAndCreateAccount} className="w-full bg-green-600 hover:bg-green-700 h-12 font-bold">Verify & Register</Button>
            <button onClick={() => setStep("details")} className="mt-4 text-xs text-slate-400 underline block mx-auto">Edit details</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;