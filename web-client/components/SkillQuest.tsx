
import React, { useState } from 'react';
import { Flashcard } from '../types';
import { generateFlashcards } from '../services/geminiService';
import { Gamepad2, Search, RotateCw, Check, X, Trophy, Loader2, Sparkles, BrainCircuit } from 'lucide-react';

const SkillQuest: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'loading' | 'playing' | 'finished'>('idle');

  // Game Logic State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [learnedCards, setLearnedCards] = useState<Flashcard[]>([]);

  const handleStartGame = async () => {
    if (!topic.trim()) return;
    setGameState('loading');
    const newCards = await generateFlashcards(topic);
    if (newCards.length > 0) {
      setCards(newCards);
      setCurrentIndex(0);
      setScore(0);
      setLearnedCards([]);
      setIsFlipped(false);
      setGameState('playing');
    } else {
      setGameState('idle'); // Handle error gracefully in real app
      alert("Could not generate cards. Please try a different topic.");
    }
  };

  const handleNextCard = (known: boolean) => {
    if (known) {
      setScore(score + 1);
      setLearnedCards([...learnedCards, cards[currentIndex]]);
    }

    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else {
      setGameState('finished');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
          <Gamepad2 size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Nhiệm vụ kỹ năng: Thẻ ghi nhớ AI</h2>
          <p className="text-slate-500 text-sm">Thành thạo bất kỳ chủ đề tiếng Anh nào với bộ thẻ do AI tạo ra.</p>
        </div>
      </div>

      {/* IDLE STATE: Input Topic */}
      {gameState === 'idle' && (
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="text-indigo-500" size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Bạn muốn học gì hôm nay?</h3>
          <p className="text-slate-500 mb-8">Nhập một chủ đề như "Business Meetings", "Coffee Shop Vocabulary", hoặc "Space Exploration".</p>

          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="ví dụ: Chuẩn bị phỏng vấn xin việc"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg transition"
              onKeyDown={(e) => e.key === 'Enter' && handleStartGame()}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          </div>

          <button
            onClick={handleStartGame}
            disabled={!topic.trim()}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
          >
            Tạo bộ thẻ
          </button>
        </div>
      )}

      {/* LOADING STATE */}
      {gameState === 'loading' && (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
          <p className="text-slate-600 font-medium animate-pulse">Cogni đang tạo thẻ ghi nhớ cho bạn...</p>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <div className="flex flex-col items-center">
          {/* Progress */}
          <div className="w-full max-w-md flex justify-between text-sm font-bold text-slate-400 mb-4">
            <span>Thẻ {currentIndex + 1} / {cards.length}</span>
            <span>Điểm: {score}</span>
          </div>

          {/* The Card */}
          <div
            className="group w-full max-w-md h-80 perspective-1000 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={`relative w-full h-full duration-500 transform-style-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>

              {/* Front */}
              <div className="absolute w-full h-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col items-center justify-center backface-hidden">
                <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                  {cards[currentIndex].type}
                </span>
                <h3 className="text-3xl font-extrabold text-slate-800 text-center mb-2">
                  {cards[currentIndex].term}
                </h3>
                <p className="text-slate-400 text-sm mt-8 animate-bounce">Chạm để lật</p>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full bg-indigo-600 text-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180">
                <p className="text-lg text-center font-medium leading-relaxed mb-4">
                  {cards[currentIndex].definition}
                </p>
                <div className="w-12 h-1 bg-white/20 rounded-full mb-4"></div>
                <p className="text-indigo-100 text-sm text-center italic">
                  "{cards[currentIndex].example}"
                </p>
              </div>

            </div>
          </div>

          {/* Controls */}
          {isFlipped && (
            <div className="flex gap-4 mt-8 animate-slide-up">
              <button
                onClick={(e) => { e.stopPropagation(); handleNextCard(false); }}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-red-100 text-red-500 rounded-full font-bold hover:bg-red-50 transition shadow-sm"
              >
                <X size={20} /> Vẫn đang học
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNextCard(true); }}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition shadow-lg shadow-green-200"
              >
                <Check size={20} /> Tôi đã biết
              </button>
            </div>
          )}
        </div>
      )}

      {/* FINISHED STATE */}
      {gameState === 'finished' && (
        <div className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-md mx-auto animate-slide-up">
          <Trophy className="text-yellow-400 mx-auto mb-4" size={64} />
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Nhiệm vụ hoàn thành!</h3>
          <p className="text-slate-500 mb-6">Bạn đã thành thạo {score} trên {cards.length} thẻ.</p>

          <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left max-h-48 overflow-y-auto">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Ôn tập từ vựng:</h4>
            <ul className="space-y-2">
              {cards.map((c, i) => (
                <li key={i} className={`text-sm flex justify-between ${learnedCards.includes(c) ? 'text-green-600' : 'text-red-500'}`}>
                  <span>{c.term}</span>
                  {learnedCards.includes(c) ? <Check size={14} /> : <BrainCircuit size={14} />}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => { setTopic(''); setGameState('idle'); }}
            className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-900 transition"
          >
            <RotateCw size={18} /> Chơi lại
          </button>
        </div>
      )}

    </div>
  );
};

export default SkillQuest;
