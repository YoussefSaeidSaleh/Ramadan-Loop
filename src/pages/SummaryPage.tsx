import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, CheckCircle } from 'lucide-react';
import { useRamadan } from '../context/RamadanContext';
import { PageLayout } from '../components/PageLayout';
export function SummaryPage() {
  const { resetDay, streak, currentDay } = useRamadan();
  const navigate = useNavigate();
  const handleNextDay = () => {
    resetDay();
    navigate('/');
  };
  return (
    <PageLayout title="" showBack={false}>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 py-8">
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            type: 'spring',
            duration: 0.8
          }}
          className="relative">

          <div className="absolute inset-0 bg-gold-primary/20 blur-3xl rounded-full" />
          <CheckCircle className="w-32 h-32 text-gold-primary relative z-10" />
        </motion.div>

        <div className="space-y-2">
          <motion.h1
            initial={{
              y: 20,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              delay: 0.3
            }}
            className="text-4xl font-bold text-white">

            أتممت يومك!
          </motion.h1>
          <motion.p
            initial={{
              y: 20,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              delay: 0.4
            }}
            className="text-xl text-gold-light">

            تقبل الله منك صالح الأعمال
          </motion.p>
        </div>

        <motion.div
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.5
          }}
          className="bg-navy-card border border-navy-light px-8 py-6 rounded-2xl flex flex-col items-center gap-2 w-full max-w-xs">

          <div className="flex items-center gap-2 text-orange-500">
            <Flame className="w-6 h-6 fill-current" />
            <span className="text-lg font-bold">حماس مستمر</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {streak}{' '}
            <span className="text-sm font-normal text-gray-400">
              أيام متتالية
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.6
          }}
          className="mt-auto w-full">

          <button
            onClick={handleNextDay}
            className="w-full bg-gold-primary text-navy-deep py-4 rounded-xl text-xl font-bold hover:bg-gold-light hover:shadow-lg hover:shadow-gold-glow/30 transition-all flex items-center justify-center gap-2">

            <span>ابدأ يوم {currentDay + 1}</span>
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
        </motion.div>
      </div>
    </PageLayout>);

}