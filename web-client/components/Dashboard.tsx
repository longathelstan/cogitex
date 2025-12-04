import React from 'react';
import { UserProfile } from '../types';
import { Flame, Trophy, TrendingUp, Quote } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface DashboardProps {
  user: UserProfile;
}

const mockTrendData = [
  { day: 'Mon', score: 65 },
  { day: 'Tue', score: 70 },
  { day: 'Wed', score: 68 },
  { day: 'Thu', score: 75 },
  { day: 'Fri', score: 82 },
  { day: 'Sat', score: 80 },
  { day: 'Sun', score: 85 },
];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-3xl p-8 text-white shadow-xl shadow-primary-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại, {user.name}</h1>
            <p className="text-primary-100 opacity-90">Động cơ tư duy phản biện của bạn đang khởi động.</p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Flame className="text-orange-300" fill="currentColor" size={20} />
                <span className="font-bold">{user.streak} Ngày liên tiếp</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Trophy className="text-yellow-300" size={20} />
                <span className="font-bold">Học giả Cấp {Math.floor(user.motivationScore / 20)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 min-w-[200px] text-center">
            <span className="text-sm text-primary-100 uppercase tracking-wider font-semibold">Điểm động lực</span>
            <div className="text-5xl font-bold mt-1">{user.motivationScore}</div>
            <div className="flex items-center justify-center gap-1 text-xs text-primary-100 mt-2">
              <TrendingUp size={14} /> Top 5% người dùng
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Chart Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-700 text-lg">Xu hướng hiệu suất</h3>
            <select className="text-sm bg-slate-50 border-none rounded-lg text-slate-500 p-2 focus:ring-0">
              <option>Tuần này</option>
              <option>Tháng này</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} hide />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#0ea5e9', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Goal & Quote */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Mục tiêu hàng ngày</h3>
              <p className="text-slate-800 font-medium text-lg mb-4">"{user.dailyGoal}"</p>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                <div className="bg-primary-500 h-2 rounded-full w-3/4"></div>
              </div>
              <span className="text-xs text-slate-500">75% Hoàn thành</span>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
            <Quote className="text-indigo-300 mb-3" size={24} />
            <p className="text-indigo-900 italic font-medium">"Cuộc sống không được kiểm chứng là cuộc sống không đáng sống."</p>
            <p className="text-indigo-600 text-xs font-bold mt-3 text-right">- Socrates</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
