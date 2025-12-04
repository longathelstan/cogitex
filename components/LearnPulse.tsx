import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BookOpen, Clock, BrainCircuit } from 'lucide-react';

const skillData = [
  { name: 'React', hours: 12, color: '#0ea5e9' },
  { name: 'TypeScript', hours: 8, color: '#6366f1' },
  { name: 'AI Ethics', hours: 5, color: '#ec4899' },
  { name: 'Design', hours: 4, color: '#f59e0b' },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; sub: string }> = ({ title, value, icon, sub }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-slate-50 rounded-2xl text-slate-600">
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <p className="text-xs text-green-500 font-medium mt-1">{sub}</p>
    </div>
  </div>
);

const LearnPulse: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">LearnPulse Analysis</h2>
        <span className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 shadow-sm">
          Last 30 Days
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Focus Time" 
          value="42.5 hrs" 
          icon={<Clock size={24} />} 
          sub="+12% from last week"
        />
        <StatCard 
          title="Reflections Logged" 
          value="28" 
          icon={<BrainCircuit size={24} />} 
          sub="Consistent habit"
        />
        <StatCard 
          title="Topics Covered" 
          value="6" 
          icon={<BookOpen size={24} />} 
          sub="Diverse learning"
        />
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 text-lg mb-6">Skill Growth Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillData} layout="vertical" barSize={32}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#64748b', fontWeight: 500 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="hours" radius={[0, 10, 10, 0]}>
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LearnPulse;
