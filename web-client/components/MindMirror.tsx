import React, { useState } from 'react';
import { MoodType, MoodEntry, ReflectionAnalysis } from '../types';
import { analyzeReflection, getMoodInsight } from '../services/geminiService';
import { Smile, Meh, Frown, Zap, Target, Send, Loader2, Sparkles, Activity, Brain } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const MoodButton: React.FC<{ mood: MoodType; selected: boolean; onClick: () => void; icon: React.ReactNode }> = ({ mood, selected, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${selected
        ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md transform scale-105'
        : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:bg-slate-50'
      }`}
  >
    <div className="mb-2">{icon}</div>
    <span className="text-xs font-semibold">{mood}</span>
  </button>
);

const MindMirror: React.FC = () => {
  const [moodEntry, setMoodEntry] = useState<Partial<MoodEntry>>({ energy: 3, focus: 3 });
  const [moodInsight, setMoodInsight] = useState<string | null>(null);
  const [isMoodLoading, setIsMoodLoading] = useState(false);

  const [reflectionText, setReflectionText] = useState("");
  const [analysis, setAnalysis] = useState<ReflectionAnalysis | null>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);

  const handleMoodSubmit = async () => {
    if (!moodEntry.mood) return;
    setIsMoodLoading(true);
    const entry = { ...moodEntry, timestamp: new Date() } as MoodEntry;
    const insight = await getMoodInsight(entry);
    setMoodInsight(insight);
    setIsMoodLoading(false);
  };

  const handleReflectionSubmit = async () => {
    if (!reflectionText.trim()) return;
    setIsAnalysisLoading(true);
    const result = await analyzeReflection(reflectionText);
    setAnalysis(result);
    setIsAnalysisLoading(false);
  };

  const chartData = analysis ? [
    { subject: 'Sự tự tin', A: analysis.scores.confidence, fullMark: 100 },
    { subject: 'Kỷ luật', A: analysis.scores.discipline, fullMark: 100 },
    { subject: 'Tư duy phản biện', A: analysis.scores.criticalThinking, fullMark: 100 },
  ] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto animate-fade-in pb-20">

      {/* SECTION A: MOOD SCANNER */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="text-primary-500" />
            <h2 className="text-xl font-bold text-slate-800">Máy quét tâm trạng</h2>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <MoodButton mood={MoodType.GREAT} selected={moodEntry.mood === MoodType.GREAT} onClick={() => setMoodEntry({ ...moodEntry, mood: MoodType.GREAT })} icon={<Smile size={28} />} />
            <MoodButton mood={MoodType.GOOD} selected={moodEntry.mood === MoodType.GOOD} onClick={() => setMoodEntry({ ...moodEntry, mood: MoodType.GOOD })} icon={<Smile size={28} className="opacity-70" />} />
            <MoodButton mood={MoodType.NEUTRAL} selected={moodEntry.mood === MoodType.NEUTRAL} onClick={() => setMoodEntry({ ...moodEntry, mood: MoodType.NEUTRAL })} icon={<Meh size={28} />} />
            <MoodButton mood={MoodType.STRESSED} selected={moodEntry.mood === MoodType.STRESSED} onClick={() => setMoodEntry({ ...moodEntry, mood: MoodType.STRESSED })} icon={<Frown size={28} />} />
            <MoodButton mood={MoodType.EXHAUSTED} selected={moodEntry.mood === MoodType.EXHAUSTED} onClick={() => setMoodEntry({ ...moodEntry, mood: MoodType.EXHAUSTED })} icon={<Frown size={28} className="opacity-70" />} />
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                <span className="flex items-center gap-1"><Zap size={16} /> Năng lượng</span>
                <span>{moodEntry.energy}/5</span>
              </div>
              <input type="range" min="1" max="5" value={moodEntry.energy} onChange={(e) => setMoodEntry({ ...moodEntry, energy: parseInt(e.target.value) })} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-500" />
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                <span className="flex items-center gap-1"><Target size={16} /> Sự tập trung</span>
                <span>{moodEntry.focus}/5</span>
              </div>
              <input type="range" min="1" max="5" value={moodEntry.focus} onChange={(e) => setMoodEntry({ ...moodEntry, focus: parseInt(e.target.value) })} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-500" />
            </div>
          </div>

          <button
            onClick={handleMoodSubmit}
            disabled={!moodEntry.mood || isMoodLoading}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isMoodLoading ? <Loader2 className="animate-spin" size={20} /> : "Ghi nhận"}
          </button>

          {moodInsight && (
            <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100 animate-slide-up">
              <div className="flex items-start gap-3">
                <Sparkles className="text-primary-500 flex-shrink-0 mt-1" size={20} />
                <p className="text-sm text-primary-800 font-medium leading-relaxed">{moodInsight}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION B: REFLECTION WALL */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="text-indigo-500" />
            <h2 className="text-xl font-bold text-slate-800">Bức tường suy ngẫm</h2>
          </div>

          <p className="text-sm text-slate-500 mb-4">Hôm nay bạn đã học được gì, và quan trọng hơn, bạn đã đặt <span className="font-semibold text-indigo-600">câu hỏi</span> về điều gì?</p>

          <textarea
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition mb-4 text-sm"
            rows={5}
            placeholder="Tôi đang sử dụng ChatGPT để giải một bài toán, nhưng tôi nhận thấy..."
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
          ></textarea>

          <div className="flex justify-end mb-6">
            <button
              onClick={handleReflectionSubmit}
              disabled={!reflectionText.trim() || isAnalysisLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-100"
            >
              {isAnalysisLoading ? <Loader2 className="animate-spin" size={18} /> : <>Phân tích <Send size={16} /></>}
            </button>
          </div>

          {analysis && (
            <div className="flex-1 bg-slate-50 rounded-2xl p-4 animate-fade-in border border-slate-100">
              <div className="h-48 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="User" dataKey="A" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800 text-sm">Phản hồi từ AI:</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{analysis.feedback}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysis.keywords.map((k, i) => (
                    <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-500 uppercase tracking-wide">#{k}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default MindMirror;