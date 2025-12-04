
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import MindMirror from './components/MindMirror';
import LearnPulse from './components/LearnPulse';
import SkillQuest from './components/SkillQuest';
import RiseBoard from './components/RiseBoard';
import CogniAssistant from './components/CogniAssistant';
import { AppView, UserProfile } from './types';
import { LayoutDashboard, Brain, BarChart3, Menu, Gamepad2, Users } from 'lucide-react';

export const App: React.FC = () => {
  // Start at HOME view
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUser(profile);
    setCurrentView(AppView.DASHBOARD);
  };

  const NavItem: React.FC<{ view: AppView; icon: React.ReactNode; label: string }> = ({ view, icon, label }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
        currentView === view 
          ? 'bg-primary-50 text-primary-600 shadow-sm ring-1 ring-primary-200' 
          : 'text-slate-500 hover:bg-white hover:text-slate-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  // 1. Show Landing Page if user is not logged in and current view is HOME
  if (!user && currentView === AppView.HOME) {
    return <LandingPage onStart={() => setCurrentView(AppView.ONBOARDING)} />;
  }

  // 2. Show Onboarding if user is not logged in and view is ONBOARDING
  if (!user || currentView === AppView.ONBOARDING) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // 3. Main App Layout
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-30 h-16 flex items-center px-4 lg:px-8 justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView(AppView.DASHBOARD)}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-200">
            C
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-800">Cognitex</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50">
          <NavItem view={AppView.DASHBOARD} icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem view={AppView.MIND_MIRROR} icon={<Brain size={18} />} label="Mind Mirror" />
          <NavItem view={AppView.SKILL_QUEST} icon={<Gamepad2 size={18} />} label="Skill Quest" />
          <NavItem view={AppView.RISE_BOARD} icon={<Users size={18} />} label="Community" />
          <NavItem view={AppView.LEARN_PULSE} icon={<BarChart3 size={18} />} label="Analytics" />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right">
             <p className="text-xs font-bold text-slate-700">{user.name}</p>
             <p className="text-[10px] text-slate-400 font-medium">Level 3 Scholar</p>
          </div>
          <img 
            src={`https://picsum.photos/seed/${user.name}/200`} 
            alt="Profile" 
            className="w-9 h-9 rounded-full border-2 border-white shadow-sm" 
          />
          <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white border-b border-slate-200 z-20 p-4 space-y-2 lg:hidden shadow-xl">
           <NavItem view={AppView.DASHBOARD} icon={<LayoutDashboard size={18} />} label="Dashboard" />
           <NavItem view={AppView.MIND_MIRROR} icon={<Brain size={18} />} label="Mind Mirror" />
           <NavItem view={AppView.SKILL_QUEST} icon={<Gamepad2 size={18} />} label="Skill Quest" />
           <NavItem view={AppView.RISE_BOARD} icon={<Users size={18} />} label="Community" />
           <NavItem view={AppView.LEARN_PULSE} icon={<BarChart3 size={18} />} label="Analytics" />
        </div>
      )}

      {/* Main Content */}
      <main className="pt-24 px-4 lg:px-8">
        {currentView === AppView.DASHBOARD && <Dashboard user={user} />}
        {currentView === AppView.MIND_MIRROR && <MindMirror />}
        {currentView === AppView.SKILL_QUEST && <SkillQuest />}
        {currentView === AppView.RISE_BOARD && <RiseBoard />}
        {currentView === AppView.LEARN_PULSE && <LearnPulse />}
      </main>

      {/* Cogni Chat */}
      <CogniAssistant />

    </div>
  );
};
