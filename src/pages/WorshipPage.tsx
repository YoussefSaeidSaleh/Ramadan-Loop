import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Check, HandHeart, Sparkles } from 'lucide-react'; // Using HandHeart as proxy for Dua hands
import { useRamadan } from '../context/RamadanContext';
import { PageLayout } from '../components/PageLayout';
export function WorshipPage() {
  const { completeStep } = useRamadan();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
  {
    id: 'quran',
    label: 'قراءة ورد من القرآن',
    icon: BookOpen,
    checked: false
  },
  {
    id: 'dhikr',
    label: 'أذكار الصباح / المساء',
    icon: Sparkles,
    checked: false
  },
  {
    id: 'dua',
    label: 'دعاء خاص لك ولأهلك',
    icon: HandHeart,
    checked: false
  }]
  );
  const completedCount = tasks.filter((t) => t.checked).length;
  const progress = completedCount / tasks.length * 100;
  useEffect(() => {
    if (completedCount === tasks.length) {
      const timer = setTimeout(() => {
        completeStep('worship');
        navigate('/');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [completedCount, completeStep, navigate, tasks.length]);
  const toggleTask = (id: string) => {
    setTasks((prev) =>
    prev.map((t) =>
    t.id === id ?
    {
      ...t,
      checked: !t.checked
    } :
    t
    )
    );
  };
  return (
    <PageLayout title="العبادة" subtitle="خير الأعمال أدومها">
      <div className="flex-1 flex flex-col gap-8 py-6">
        {/* Progress Bar */}
        <div className="w-full bg-navy-light h-4 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold-primary"
            initial={{
              width: 0
            }}
            animate={{
              width: `${progress}%`
            }}
            transition={{
              duration: 0.5
            }} />

        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task, index) =>
          <motion.button
            key={task.id}
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: index * 0.1
            }}
            onClick={() => toggleTask(task.id)}
            className={`
                w-full p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 border
                ${task.checked ? 'bg-navy-card border-gold-primary/50 shadow-lg shadow-gold-primary/10' : 'bg-navy-card border-navy-light hover:border-navy-light/80'}
              `}>

              <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors
                ${task.checked ? 'bg-gold-primary border-gold-primary text-navy-deep' : 'border-gray-500 text-transparent'}
              `}>

                <Check className="w-5 h-5" />
              </div>

              <div className="flex-1 text-right flex items-center gap-3">
                <task.icon
                className={`w-6 h-6 ${task.checked ? 'text-gold-primary' : 'text-gray-400'}`} />

                <span
                className={`text-lg ${task.checked ? 'text-gold-light font-medium' : 'text-gray-300'}`}>

                  {task.label}
                </span>
              </div>
            </motion.button>
          )}
        </div>

        {/* Success Message */}
        {completedCount === tasks.length &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="mt-auto text-center p-6 bg-gold-primary/10 rounded-2xl border border-gold-primary/20">

            <p className="text-gold-primary text-xl font-bold">
              أحسنت! تقبل الله طاعتك
            </p>
          </motion.div>
        }
      </div>
    </PageLayout>);

}