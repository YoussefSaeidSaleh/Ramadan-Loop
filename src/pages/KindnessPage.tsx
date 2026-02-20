import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import { useRamadan } from '../context/RamadanContext';
import { PageLayout } from '../components/PageLayout';
export function KindnessPage() {
  const { completeStep, currentDay } = useRamadan();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  // Simple rotation of deeds based on day
  const deeds = [
  'تصدّق بابتسامة صادقة اليوم لمن حولك',
  'اتصل بقريب لم تتحدث معه منذ فترة',
  'أطعم طائراً أو حيواناً',
  'أماط الأذى عن الطريق',
  'سامح شخصاً أغضبك'];

  const todayDeed = deeds[(currentDay - 1) % deeds.length];
  const handleComplete = () => {
    setIsCompleted(true);
    completeStep('kindness');
    setTimeout(() => {
      navigate('/');
    }, 1200);
  };
  return (
    <PageLayout title="الإحسان" subtitle="هل جزاء الإحسان إلا الإحسان">
      <div className="flex-1 flex flex-col items-center justify-center gap-10 py-8">
        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          className="relative w-full">

          <div className="absolute inset-0 bg-gold-primary/20 blur-3xl rounded-full" />

          <div className="relative bg-navy-card border border-gold-dim/30 p-8 rounded-3xl text-center shadow-2xl">
            <div className="w-16 h-16 bg-navy-deep rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gold-primary text-gold-primary">
              <Heart className="w-8 h-8 fill-current" />
            </div>

            <h3 className="text-xl text-gold-light mb-4">مقترح اليوم</h3>
            <p className="text-2xl font-bold text-white leading-relaxed">
              "{todayDeed}"
            </p>
          </div>
        </motion.div>

        <div className="relative">
          {isCompleted &&
          <motion.div
            initial={{
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: 2,
              opacity: 0
            }}
            transition={{
              duration: 1
            }}
            className="absolute inset-0 bg-gold-primary rounded-full z-0" />

          }

          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={handleComplete}
            disabled={isCompleted}
            className={`
              relative z-10 px-12 py-4 rounded-full text-xl font-bold transition-all duration-300 flex items-center gap-3
              ${isCompleted ? 'bg-green-600 text-white' : 'bg-gold-primary text-navy-deep hover:shadow-lg hover:shadow-gold-glow/40'}
            `}>

            {isCompleted ?
            <>
                <Check className="w-6 h-6" />
                <span>جزاك الله خيراً</span>
              </> :

            'أنجزت الفعل'
            }
          </motion.button>
        </div>
      </div>
    </PageLayout>);

}