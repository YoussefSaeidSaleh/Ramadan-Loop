import React, { useEffect } from 'react';
import { useRamadan } from '../context/RamadanContext';
import { PageLayout } from '../components/PageLayout';
import { Clock } from 'lucide-react';
export function TimePage() {
  const { completeStep } = useRamadan();
  // Auto-complete this step just by visiting
  useEffect(() => {
    completeStep('time');
  }, [completeStep]);
  const prayers = [
  {
    name: 'الفجر',
    time: '04:35 AM'
  },
  {
    name: 'الظهر',
    time: '12:15 PM'
  },
  {
    name: 'العصر',
    time: '03:45 PM'
  },
  {
    name: 'المغرب',
    time: '06:20 PM',
    isNext: true
  },
  {
    name: 'العشاء',
    time: '07:50 PM'
  }];

  return (
    <PageLayout
      title="مواقيت الصلاة"
      subtitle="إن الصلاة كانت على المؤمنين كتاباً موقوتاً">

      <div className="flex-1 flex flex-col items-center py-6 gap-8">
        {/* Countdown Circle */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-navy-light" />
          <div
            className="absolute inset-0 rounded-full border-4 border-gold-primary border-t-transparent animate-spin-slow"
            style={{
              animationDuration: '10s'
            }} />


          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gold-primary/5 blur-2xl animate-pulse-slow" />

          <div className="text-center z-10">
            <p className="text-gray-400 text-sm mb-1">الإفطار بعد</p>
            <h2 className="text-4xl font-bold text-white tabular-nums tracking-wider">
              01:20:35
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2 text-gold-primary">
              <Clock className="w-4 h-4" />
              <span className="text-sm">بتوقيت مكة المكرمة</span>
            </div>
          </div>
        </div>

        {/* Prayer Times List */}
        <div className="w-full grid grid-cols-1 gap-3">
          {prayers.map((prayer) =>
          <div
            key={prayer.name}
            className={`
                flex items-center justify-between p-4 rounded-xl border transition-all
                ${prayer.isNext ? 'bg-navy-card border-gold-primary shadow-lg shadow-gold-primary/10 scale-105 z-10' : 'bg-navy-card/50 border-navy-light text-gray-400'}
              `}>

              <span
              className={`font-bold ${prayer.isNext ? 'text-gold-primary' : ''}`}>

                {prayer.name}
              </span>
              <span
              className={`font-mono ${prayer.isNext ? 'text-white' : ''}`}>

                {prayer.time}
              </span>
            </div>
          )}
        </div>
      </div>
    </PageLayout>);

}