import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ArrowRight, CheckCircle2, Brain, Target } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    source: 'Friend',
    aiUsageFreq: 'Daily',
    criticalThinkingLevel: 3,
    dailyGoal: 'Learn something new',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Create initial profile
      onComplete({
        ...formData as UserProfile,
        streak: 0,
        motivationScore: 75, // Initial boost
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-white p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-primary-100">
        
        {/* Progress Bar */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-2 flex-1 rounded-full mx-1 transition-all duration-500 ${i <= step ? 'bg-primary-500' : 'bg-slate-200'}`} />
          ))}
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">
          {step === 1 && "Welcome to Cognitex"}
          {step === 2 && "Your AI Habits"}
          {step === 3 && "Set Your Compass"}
        </h1>
        <p className="text-slate-500 text-center mb-8">
          {step === 1 && "Let's personalize your learning journey."}
          {step === 2 && "How do you currently interact with AI?"}
          {step === 3 && "What is your main focus today?"}
        </p>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">What should we call you?</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
        )}

        {/* Step 2: AI Habits */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">How often do you use AI tools?</label>
              <div className="grid grid-cols-3 gap-2">
                {['Rarely', 'Weekly', 'Daily'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFormData({...formData, aiUsageFreq: opt})}
                    className={`p-2 rounded-lg text-sm font-medium border transition ${formData.aiUsageFreq === opt ? 'bg-primary-100 border-primary-500 text-primary-700' : 'border-slate-200 hover:bg-slate-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Do you question AI answers? (1 = Never, 5 = Always)
              </label>
              <input 
                type="range" min="1" max="5" 
                value={formData.criticalThinkingLevel}
                onChange={(e) => setFormData({...formData, criticalThinkingLevel: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Trust blindly</span>
                <span>Healthy skeptic</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Your Daily Learning Goal</label>
              <textarea 
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-400 outline-none h-24 resize-none"
                placeholder="e.g., Master React Hooks, Write 500 words..."
                value={formData.dailyGoal}
                onChange={(e) => setFormData({...formData, dailyGoal: e.target.value})}
              />
            </div>
          </div>
        )}

        <div className="mt-8">
          <button 
            onClick={handleNext}
            disabled={step === 1 && !formData.name}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-200"
          >
            {step === 3 ? "Start Journey" : "Continue"}
            {step === 3 ? <CheckCircle2 size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
