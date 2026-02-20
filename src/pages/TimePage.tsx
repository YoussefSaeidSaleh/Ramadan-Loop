import React, { useEffect, useState } from "react";
import { useRamadan } from "../context/RamadanContext";
import { PageLayout } from "../components/PageLayout";
import { Clock } from "lucide-react";
import { fetchPrayerTimings, PrayerTimings } from "../api/prayerApi";

export function TimePage() {
  const { completeStep } = useRamadan();
  const [prayers, setPrayers] = useState<
    { name: string; time: string; isNext?: boolean }[]
  >([]);
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    completeStep("time");

    let interval: number;

    const format12h = (time24: string) => {
      const [hours, minutes] = time24.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const h12 = hours % 12 || 12;
      return `${String(h12).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0",
      )} ${period}`;
    };

    const loadTimings = async () => {
      try {
        const data = await fetchPrayerTimings("20-02-2026");
        const timings = data.data.timings;

        const prayerNames: Record<keyof PrayerTimings, string> = {
          Fajr: "الفجر",
          Dhuhr: "الظهر",
          Asr: "العصر",
          Maghrib: "المغرب",
          Isha: "العشاء",
          Sunrise: "الشروق",
          Sunset: "الغروب",
          Imsak: "الإمساك",
          Midnight: "منتصف الليل",
        };

        const displayPrayers = [
          { name: prayerNames.Fajr, time: format12h(timings.Fajr) },
          { name: prayerNames.Dhuhr, time: format12h(timings.Dhuhr) },
          { name: prayerNames.Asr, time: format12h(timings.Asr) },
          {
            name: prayerNames.Maghrib,
            time: format12h(timings.Maghrib),
            isNext: true,
          },
          { name: prayerNames.Isha, time: format12h(timings.Isha) },
        ];

        setPrayers(displayPrayers);

        const updateCountdown = () => {
          const now = new Date();
          const [mHours, mMinutes] = timings.Maghrib.split(":").map(Number);
          const [fHours, fMinutes] = timings.Fajr.split(":").map(Number);

          const targetDate = new Date(2026, 1, 20, mHours, mMinutes, 0);
          const fajrDate = new Date(2026, 1, 20, fHours, fMinutes, 0);

          const diff = targetDate.getTime() - now.getTime();

          // Calculate Fasting Progress (Fajr to Maghrib)
          const totalFastingMs = targetDate.getTime() - fajrDate.getTime();
          const elapsedFastingMs = now.getTime() - fajrDate.getTime();
          let currentProgress = (elapsedFastingMs / totalFastingMs) * 100;
          currentProgress = Math.max(0, Math.min(100, currentProgress));
          setProgress(currentProgress);

          if (diff > 0) {
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(
              `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
            );
          } else {
            setTimeLeft("00:00:00");
          }
        };

        updateCountdown();
        interval = window.setInterval(updateCountdown, 1000);
      } catch (error) {
        console.error("Failed to fetch prayer times:", error);
      }
    };

    loadTimings();
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [completeStep]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <PageLayout
      title="مواقيت الصلاة"
      subtitle="إن الصلاة كانت على المؤمنين كتاباً موقوتاً"
    >
      <div className="flex-1 flex flex-col items-center py-6 gap-8">
        {/* Countdown Circle */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r={radius}
              className="fill-none stroke-navy-light stroke-[4]"
            />
            <circle
              cx="128"
              cy="128"
              r={radius}
              className="fill-none stroke-gold-primary stroke-[4] transition-all duration-1000 ease-linear"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gold-primary/5 blur-2xl animate-pulse-slow" />

          <div className="text-center z-10">
            <p className="text-gray-400 text-sm mb-1">الإفطار بعد</p>
            <h2 className="text-4xl font-bold text-white tabular-nums tracking-wider">
              {timeLeft}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2 text-gold-primary">
              <Clock className="w-4 h-4" />
              <span className="text-sm">بتوقيت القاهرة</span>
            </div>
          </div>
        </div>

        {/* Prayer Times List */}
        <div className="w-full grid grid-cols-1 gap-3">
          {prayers.map((prayer) => (
            <div
              key={prayer.name}
              className={`
                flex items-center justify-between p-4 rounded-xl border transition-all
                ${prayer.isNext ? "bg-navy-card border-gold-primary shadow-lg shadow-gold-primary/10 scale-105 z-10" : "bg-navy-card/50 border-navy-light text-gray-400"}
              `}
            >
              <span
                className={`font-bold ${prayer.isNext ? "text-gold-primary" : ""}`}
              >
                {prayer.name}
              </span>
              <span
                className={`font-mono ${prayer.isNext ? "text-white" : ""}`}
              >
                {prayer.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
