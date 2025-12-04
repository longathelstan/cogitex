
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Award, TrendingUp, MoreHorizontal, User, Crown } from 'lucide-react';

// Mock Data for UI demonstration
const MOCK_POSTS = [
  {
    id: 1,
    user: "Sarah Jenkins",
    handle: "@sarah_j",
    avatar: "https://picsum.photos/seed/sarah/50",
    content: "Just hit a 30-day streak! 🚀 I used to blindly copy code from ChatGPT, but now I force myself to explain every line it generates before pasting. My debugging skills have improved 10x.",
    tags: ["#DeepLearning", "#CriticalThinking", "#Coding"],
    likes: 24,
    comments: 5,
    time: "2h ago"
  },
  {
    id: 2,
    user: "David Chen",
    handle: "@dchen_ai",
    avatar: "https://picsum.photos/seed/david/50",
    content: "Found a major hallucination in a history essay draft today. The AI invented a whole battle that never happened in 1842. Always fact-check! 🕵️‍♂️",
    tags: ["#FactCheck", "#AIHallucinations", "#History"],
    likes: 156,
    comments: 23,
    time: "5h ago"
  },
  {
    id: 3,
    user: "Emily Rose",
    handle: "@emily_r",
    avatar: "https://picsum.photos/seed/emily/50",
    content: "Question of the day: If AI solves the problem for you, did you actually learn anything? My reflection score dropped today because I got lazy. Getting back on track tomorrow! 💪",
    tags: ["#Reflection", "#SelfRegulation"],
    likes: 42,
    comments: 12,
    time: "8h ago"
  }
];

const LEADERBOARD = [
  { rank: 1, name: "Alex Thompson", score: 2450, avatar: "https://picsum.photos/seed/alex/50" },
  { rank: 2, name: "Maria Garcia", score: 2320, avatar: "https://picsum.photos/seed/maria/50" },
  { rank: 3, name: "James Wilson", score: 2105, avatar: "https://picsum.photos/seed/james/50" },
  { rank: 4, name: "You", score: 1850, avatar: "https://picsum.photos/seed/user/50", isUser: true },
  { rank: 5, name: "Linda Kim", score: 1780, avatar: "https://picsum.photos/seed/linda/50" },
];

const BADGES = [
  { name: "Skeptic", icon: "🧐", desc: "Flagged 10 hallucinations" },
  { name: "Consistent", icon: "🔥", desc: "7 Day Streak" },
  { name: "Scholar", icon: "🎓", desc: "Top 10% Motivation" },
];

const RiseBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'following'>('feed');

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in pb-20">

      {/* LEFT COLUMN: FEED */}
      <div className="lg:col-span-2 space-y-6">

        {/* Input Box */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden">
              <img src="https://picsum.photos/seed/user/50" alt="User" />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Chia sẻ suy ngẫm học tập của bạn..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none h-24 transition"
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2 text-primary-500">
                  {/* Additional buttons could go here */}
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-full transition shadow-md shadow-primary-200">
                  Đăng
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-slate-200 px-2">
          <button
            onClick={() => setActiveTab('feed')}
            className={`pb-3 font-semibold text-sm transition ${activeTab === 'feed' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Bảng tin cộng đồng
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`pb-3 font-semibold text-sm transition ${activeTab === 'following' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Đang theo dõi
          </button>
        </div>

        {/* Posts Stream */}
        <div className="space-y-4">
          {MOCK_POSTS.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-bold text-slate-800">{post.user}</h4>
                    <span className="text-xs text-slate-400">{post.handle} • {post.time}</span>
                  </div>
                </div>
                <button className="text-slate-300 hover:text-slate-500"><MoreHorizontal size={20} /></button>
              </div>

              <p className="text-slate-700 leading-relaxed mb-4">{post.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 text-slate-400 text-sm font-medium">
                <button className="flex items-center gap-1 hover:text-red-500 transition group">
                  <Heart size={18} className="group-hover:scale-110 transition-transform" /> {post.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-primary-500 transition">
                  <MessageCircle size={18} /> {post.comments}
                </button>
                <button className="flex items-center gap-1 hover:text-green-500 transition">
                  <Share2 size={18} /> Chia sẻ
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT COLUMN: SIDEBAR */}
      <div className="space-y-6">

        {/* Leaderboard Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <Crown className="text-yellow-500" />
            <h3 className="font-bold text-slate-800 text-lg">Học giả hàng đầu</h3>
          </div>

          <div className="space-y-4">
            {LEADERBOARD.map((user) => (
              <div key={user.rank} className={`flex items-center justify-between p-3 rounded-2xl ${user.isUser ? 'bg-primary-50 border border-primary-100' : 'hover:bg-slate-50'}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-6 text-center font-bold ${user.rank <= 3 ? 'text-yellow-600' : 'text-slate-400'}`}>
                    {user.rank}
                  </span>
                  <img src={user.avatar} className="w-8 h-8 rounded-full" alt={user.name} />
                  <span className={`text-sm font-medium ${user.isUser ? 'text-primary-800' : 'text-slate-700'}`}>
                    {user.name}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-500 bg-white px-2 py-1 rounded-full border border-slate-100">
                  {user.score} điểm
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 text-center text-sm text-primary-600 font-semibold hover:underline">
            Xem bảng xếp hạng đầy đủ
          </button>
        </div>

        {/* Badges Card */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none"></div>

          <div className="flex items-center gap-2 mb-4">
            <Award className="text-yellow-400" />
            <h3 className="font-bold text-lg">Huy hiệu của bạn</h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {BADGES.map((badge, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-2 rounded-xl text-center border border-white/10 hover:bg-white/20 transition cursor-pointer group">
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{badge.icon}</div>
                <div className="text-[10px] font-medium text-slate-200">{badge.name}</div>
              </div>
            ))}
            <div className="bg-white/5 border border-dashed border-white/20 rounded-xl flex items-center justify-center">
              <span className="text-xs text-slate-400">+2 thêm</span>
            </div>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-green-500" />
            <h3 className="font-bold text-slate-800 text-lg">Xu hướng</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['#CriticalThinking', '#ChatGPT', '#Exams', '#FocusMode', '#Python'].map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-100 cursor-pointer transition">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default RiseBoard;
