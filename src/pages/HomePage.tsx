import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, BookOpen, Clock, Heart, Sparkles } from "lucide-react";
import { useRamadan } from "../context/RamadanContext";
import { CircularProgress } from "../components/CircularProgress";
import { motion } from "framer-motion";

export function HomePage() {
  const { currentDay, progress, isStepCompleted, streak } = useRamadan();
  const navigate = useNavigate();
  const steps = [
    {
      id: "intention",
      title: "النية",
      icon: Star,
      path: "/intention",
    },
    {
      id: "worship",
      title: "العبادة",
      icon: BookOpen,
      path: "/worship",
    },
    {
      id: "time",
      title: "الوقت",
      icon: Clock,
      path: "/time",
    },
    {
      id: "kindness",
      title: "الإحسان",
      icon: Heart,
      path: "/kindness",
    },
    {
      id: "reflection",
      title: "التقييم",
      icon: Sparkles,
      path: "/reflection",
    },
  ];

  // Auto-navigate to summary if all steps are completed
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => navigate("/summary"), 1500);
      return () => clearTimeout(timer);
    }
  }, [progress, navigate]);
  // Generate random stars
  const stars = Array.from({
    length: 20,
  }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${3 + Math.random() * 4}s`,
    opacity: 0.3 + Math.random() * 0.7,
    size: Math.random() > 0.8 ? "w-1 h-1" : "w-0.5 h-0.5",
  }));
  return (
    <div className="min-h-screen w-full bg-navy-deep relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="gradient-bg" />
      <div className="islamic-pattern absolute inset-0 opacity-20" />

      {/* Stars */}
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`star ${star.size}`}
            style={
              {
                top: star.top,
                left: star.left,
                "--delay": star.delay,
                "--duration": star.duration,
                "--opacity": star.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        {/* Floating Micro-Cards (Orbiting Hints) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Right - Prayer Time Hint */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 1,
            }}
            className="absolute top-[15%] right-[10%] animate-float-slow pointer-events-auto"
          >
            <button
              onClick={() => navigate("/time")}
              className="bg-navy-card/40 backdrop-blur-md border border-gold-primary/20 px-4 py-2 rounded-full flex items-center gap-2 text-xs text-gold-light hover:bg-navy-card/60 transition-colors"
            >
              <Clock className="w-3 h-3" />
              <span>الإفطار بعد 01:20:35</span>
            </button>
          </motion.div>

          {/* Bottom Left - Verse Hint */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.8,
              duration: 1,
            }}
            className="absolute bottom-[20%] left-[10%] animate-float-medium pointer-events-auto"
          >
            <button
              onClick={() => navigate("/worship")}
              className="bg-navy-card/40 backdrop-blur-md border border-gold-primary/20 px-4 py-2 rounded-full flex items-center gap-2 text-xs text-gold-light hover:bg-navy-card/60 transition-colors"
            >
              <BookOpen className="w-3 h-3" />
              <span>آية اليوم</span>
            </button>
          </motion.div>
        </div>

        {/* Central Circular Navigation */}
        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative"
        >
          <CircularProgress
            progress={progress}
            day={currentDay}
            streak={streak}
            steps={steps.map((s) => ({
              ...s,
              isCompleted: isStepCompleted(s.id),
            }))}
            onSegmentClick={(id) => {
              const step = steps.find((s) => s.id === id);
              if (step) navigate(step.path);
            }}
          />
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
            duration: 0.8,
          }}
          className="absolute bottom-10 text-center"
        >
          <p className="text-navy-light text-sm font-light tracking-widest">
            RAMADAN LOOP
          </p>
        </motion.div>
      </div>
    </div>
  );
}
