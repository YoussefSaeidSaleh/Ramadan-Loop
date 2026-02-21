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
  const [nextPrayer, setNextPrayer] = useState<{
    name: string;
    label: string;
  } | null>(null);

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
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, "0")}-${String(
          now.getMonth() + 1,
        ).padStart(2, "0")}-${now.getFullYear()}`;

        const data = await fetchPrayerTimings(dateStr);
        const timings = data.data.timings;

        const prayerOrder: { key: keyof PrayerTimings; label: string }[] = [
          { key: "Fajr", label: "الفجر" },
          { key: "Dhuhr", label: "الظهر" },
          { key: "Asr", label: "العصر" },
          { key: "Maghrib", label: "المغرب" },
          { key: "Isha", label: "العشاء" },
        ];

        const updateCountdown = () => {
          const currentNow = new Date();
          let targetPrayer: {
            key: keyof PrayerTimings;
            label: string;
            date: Date;
          } | null = null;
          let prevPrayerDate = new Date();

          // Find the next prayer
          for (let i = 0; i < prayerOrder.length; i++) {
            const p = prayerOrder[i];
            const [h, m] = timings[p.key].split(":").map(Number);
            const pDate = new Date(
              currentNow.getFullYear(),
              currentNow.getMonth(),
              currentNow.getDate(),
              h,
              m,
              0,
            );

            if (pDate > currentNow) {
              targetPrayer = { ...p, date: pDate };
              // Previous prayer for progress calculation
              if (i === 0) {
                // If next is Fajr today, prev was Isha yesterday
                const yesterday = new Date(currentNow);
                yesterday.setDate(yesterday.getDate() - 1);
                const [ph, pm] = timings.Isha.split(":").map(Number);
                prevPrayerDate = new Date(
                  yesterday.getFullYear(),
                  yesterday.getMonth(),
                  yesterday.getDate(),
                  ph,
                  pm,
                  0,
                );
              } else {
                const prevP = prayerOrder[i - 1];
                const [ph, pm] = timings[prevP.key].split(":").map(Number);
                prevPrayerDate = new Date(
                  currentNow.getFullYear(),
                  currentNow.getMonth(),
                  currentNow.getDate(),
                  ph,
                  pm,
                  0,
                );
              }
              break;
            }
          }

          // If no prayer found today, next is Fajr tomorrow
          if (!targetPrayer) {
            const tomorrow = new Date(currentNow);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const [h, m] = timings.Fajr.split(":").map(Number);
            targetPrayer = {
              ...prayerOrder[0],
              date: new Date(
                tomorrow.getFullYear(),
                tomorrow.getMonth(),
                tomorrow.getDate(),
                h,
                m,
                0,
              ),
            };
            const [ph, pm] = timings.Isha.split(":").map(Number);
            prevPrayerDate = new Date(
              currentNow.getFullYear(),
              currentNow.getMonth(),
              currentNow.getDate(),
              ph,
              pm,
              0,
            );
          }

          setNextPrayer({
            name: String(targetPrayer.key),
            label: targetPrayer.label,
          });

          const diff = Math.max(
            0,
            targetPrayer.date.getTime() - currentNow.getTime(),
          );
          const totalMs =
            targetPrayer.date.getTime() - prevPrayerDate.getTime();
          const elapsedMs = Math.min(
            totalMs,
            Math.max(0, currentNow.getTime() - prevPrayerDate.getTime()),
          );

          let currentProgress = (elapsedMs / totalMs) * 100;
          currentProgress = Math.max(0, Math.min(100, currentProgress));
          setProgress(currentProgress);

          const h = Math.floor(diff / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(
            `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
          );
        };

        const displayPrayers = prayerOrder.map((p) => ({
          name: p.label,
          time: format12h(timings[p.key]),
          key: p.key,
        }));

        // We'll update isNext in the render for better reactivity
        setPrayers(displayPrayers);

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
            <p className="text-gray-400 text-sm mb-1">
              متبقي علي صلاة {nextPrayer?.label}
            </p>
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
                ${nextPrayer?.label === prayer.name ? "bg-navy-card border-gold-primary shadow-lg shadow-gold-primary/10 scale-105 z-10" : "bg-navy-card/50 border-navy-light text-gray-400"}
              `}
            >
              <span
                className={`font-bold ${nextPrayer?.label === prayer.name ? "text-gold-primary" : ""}`}
              >
                {prayer.name}
              </span>
              <span
                className={`font-mono ${nextPrayer?.label === prayer.name ? "text-white" : ""}`}
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
