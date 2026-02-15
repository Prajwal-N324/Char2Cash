import { useState, useEffect, useCallback } from "react";

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export const Captcha = ({ onVerify }: CaptchaProps) => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  // Memoize the generator so it doesn't trigger unnecessary re-renders in the parent
  const generateCaptcha = useCallback(() => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; 
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(result);
    setInput(""); 
    // We notify the parent that the current input is no longer valid
    onVerify(false); 
  }, [onVerify]);

  // Initial generation
  useEffect(() => {
    generateCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount to prevent loops

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setInput(val);
    
    // Only check if the user has typed exactly 6 characters
    if (val.length === 6) {
      if (val === code) {
        onVerify(true);
      } else {
        // Instant feedback: refresh on failure
        generateCaptcha();
      }
    } else {
      // If they backspace or change, it's not verified
      onVerify(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border-2 border-dashed border-slate-200 select-none">
        <div className="relative">
          {/* Decorative lines to make it look like a real captcha */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-full h-[1px] bg-slate-900 rotate-3"></div>
            <div className="w-full h-[1px] bg-slate-900 -rotate-3"></div>
          </div>
          <span className="text-2xl font-black tracking-[0.3em] text-slate-600 italic font-mono">
            {code}
          </span>
        </div>
        
        <button 
          type="button" 
          onClick={generateCaptcha}
          className="text-xs font-bold text-green-600 hover:text-green-700 bg-green-50 px-2 py-1 rounded transition-colors"
        >
          Refresh
        </button>
      </div>

      <input
        type="text"
        placeholder="Enter verification code"
        value={input}
        onChange={handleCheck}
        className="w-full p-3 border border-slate-200 rounded-lg text-center font-mono text-lg uppercase focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
        maxLength={6}
        autoComplete="off"
      />
    </div>
  );
};