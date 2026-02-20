import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { BookOpen, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Ayah {
  text: string;
  surah: string;
  numberInSurah: number;
}

export function AyahPage() {
  const [ayah, setAyah] = useState<Ayah | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomAyah = async () => {
    setLoading(true);
    try {
      // Get a random Ayah number (1 to 6236)
      const randomAyahNum = Math.floor(Math.random() * 6236) + 1;
      const response = await fetch(
        `https://api.alquran.cloud/v1/ayah/${randomAyahNum}/ar.alafasy`,
      );
      const data = await response.json();

      if (data.code === 200) {
        setAyah({
          text: data.data.text,
          surah: data.data.surah.name,
          numberInSurah: data.data.numberInSurah,
        });
      }
    } catch (error) {
      console.error("Failed to fetch Ayah:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomAyah();
  }, []);

  return (
    <PageLayout title="آية اليوم" subtitle="نور من القرآن الكريم">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              <RefreshCw className="w-8 h-8 text-gold-primary animate-spin" />
            </motion.div>
          ) : ayah ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-navy-card/50 backdrop-blur-lg border border-gold-primary/20 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-xl"
            >
              <BookOpen className="w-12 h-12 text-gold-primary" />

              <p className="text-2xl md:text-3xl text-center leading-relaxed font-serif text-cream drop-shadow-sm">
                "{ayah.text}"
              </p>

              <div className="flex flex-col items-center gap-1">
                <span className="text-gold-primary font-bold text-lg">
                  {ayah.surah}
                </span>
                <span className="text-navy-light text-sm">
                  الآية {ayah.numberInSurah}
                </span>
              </div>

              <button
                onClick={fetchRandomAyah}
                className="mt-4 px-6 py-2 bg-gold-primary/10 hover:bg-gold-primary/20 border border-gold-primary/30 rounded-full text-gold-light text-sm flex items-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                آية أخرى
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}
