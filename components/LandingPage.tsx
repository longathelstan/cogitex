import React from 'react';
import { ArrowRight, Brain, Zap, BarChart3, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 h-16 flex items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-200">
            C
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Cognitex</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-primary-600 transition">Features</a>
          <a href="#about" className="hover:text-primary-600 transition">About</a>
          <a href="#community" className="hover:text-primary-600 transition">Community</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center bg-gradient-to-b from-primary-50/50 to-white">
        <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider mb-4 border border-primary-200">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            V2.0 Now Available
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Don't just use AI. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Master your mind.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Cognitex helps you transition from passive AI consumption to active critical thinking. Track your mood, reflect on AI answers, and grow your intellect.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="group relative px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-bold rounded-full transition-all shadow-xl shadow-primary-200 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 font-bold rounded-full border border-slate-200 hover:bg-slate-50 transition shadow-sm">
              View Demo
            </button>
          </div>
        </div>

        {/* Floating UI Elements (Visual Candy) */}
        <div className="mt-16 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start text-left hover:-translate-y-1 transition-transform duration-300">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-4">
              <Brain size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">Mind Mirror</h3>
            <p className="text-sm text-slate-500">Reflect on your daily interactions with AI. Did you question the answer? Did you dig deeper?</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start text-left hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-10">
               <Zap size={100} />
             </div>
            <div className="p-3 bg-orange-50 rounded-2xl text-orange-500 mb-4 relative z-10">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2 relative z-10">Mood Scanner</h3>
            <p className="text-sm text-slate-500 relative z-10">AI-powered analysis of your energy and focus levels to optimize your study sessions.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start text-left hover:-translate-y-1 transition-transform duration-300">
            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600 mb-4">
              <BarChart3 size={24} />
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">Learn Pulse</h3>
            <p className="text-sm text-slate-500">Visual analytics of your critical thinking growth and learning habits over time.</p>
          </div>

        </div>
      </header>
      
      {/* Footer Simple */}
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100 bg-slate-50">
        <p>&copy; 2024 Cognitex Inc. Built for the thinkers of tomorrow.</p>
      </footer>
    </div>
  );
};

export default LandingPage;