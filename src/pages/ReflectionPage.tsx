import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRamadan } from '../context/RamadanContext';
import { PageLayout } from '../components/PageLayout';
export function ReflectionPage() {
  const { saveReflection } = useRamadan();
  const navigate = useNavigate();
  const [mood, setMood] = useState<number | null>(null);
  const [text, setText] = useState('');
  const moods = [
  {
    value: 0,
    emoji: '😔',
    label: 'متعب'
  },
  {
    value: 1,
    emoji: '😐',
    label: 'عادي'
  },
  {
    value: 2,
    emoji: '🙂',
    label: 'جيد'
  },
  {
    value: 3,
    emoji: '😄',
    label: 'ممتاز'
  }];

  const handleSubmit = () => {
    if (mood !== null) {
      saveReflection({
        mood,
        text
      });
      navigate('/summary');
    }
  };
  return (
    <PageLayout title="التقييم" subtitle="حاسبوا أنفسكم قبل أن تحاسبوا">
      <div className="flex-1 flex flex-col gap-8 py-6">
        {/* Mood Selector */}
        <div className="bg-navy-card p-6 rounded-2xl border border-navy-light">
          <h3 className="text-center text-lg text-gray-300 mb-6">
            كيف كان يومك؟
          </h3>
          <div className="flex justify-between px-2">
            {moods.map((m) =>
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              className={`
                  flex flex-col items-center gap-2 transition-all duration-300
                  ${mood === m.value ? 'transform scale-125' : 'opacity-60 hover:opacity-100'}
                `}>

                <div
                className={`
                  text-4xl p-3 rounded-full transition-all
                  ${mood === m.value ? 'bg-navy-deep ring-2 ring-gold-primary shadow-lg shadow-gold-primary/20' : ''}
                `}>

                  {m.emoji}
                </div>
                <span
                className={`text-xs ${mood === m.value ? 'text-gold-primary' : 'text-gray-500'}`}>

                  {m.label}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Text Area */}
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="اكتب خواطرك هنا... (اختياري)"
            className="w-full h-40 bg-navy-card border border-navy-light rounded-2xl p-4 text-white placeholder-gray-600 focus:border-gold-primary focus:ring-1 focus:ring-gold-primary outline-none resize-none transition-all" />

        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={mood === null}
          className={`
            w-full py-4 rounded-xl text-lg font-bold transition-all duration-300
            ${mood !== null ? 'bg-gold-primary text-navy-deep hover:bg-gold-light shadow-lg shadow-gold-glow/20' : 'bg-navy-light text-gray-500 cursor-not-allowed'}
          `}>

          اقفل اليوم
        </button>
      </div>
    </PageLayout>);

}