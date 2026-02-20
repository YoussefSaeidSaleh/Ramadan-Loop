import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRamadan } from "../context/RamadanContext";
import { PageLayout } from "../components/PageLayout";

export function IntentionPage() {
  const { completeStep } = useRamadan();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleConfirm = () => {
    setIsSubmitting(true);
    completeStep("intention");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <PageLayout title="النية" subtitle="ابدأ يومك بقلب حاضر">
      <div className="flex-1 flex flex-col justify-center items-center gap-8 py-8">
        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          className="w-full bg-navy-card border border-navy-light p-8 rounded-3xl text-center shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-50" />

          <h3 className="text-xl text-gold-light mb-6 font-medium">
            نية اليوم
          </h3>
          <p className="text-2xl leading-relaxed text-white font-light">
            "نويت صيام هذا اليوم من شهر رمضان إيماناً واحتساباً لوجه الله
            الكريم، فتقبله مني يا رب العالمين."
          </p>

          <div className="mt-8 flex justify-center">
            <div className="w-16 h-1 bg-navy-light rounded-full" />
          </div>
        </motion.div>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleConfirm}
          disabled={isSubmitting}
          className={`
            w-full max-w-xs py-4 rounded-xl text-xl font-bold transition-all duration-500 flex items-center justify-center gap-3 shadow-lg
            ${isSubmitting ? "bg-gold-primary text-navy-deep shadow-gold-glow/50" : "bg-gold-primary text-navy-deep hover:bg-gold-light hover:shadow-gold-glow/30"}
          `}
        >
          {isSubmitting ? (
            <>
              <Check className="w-6 h-6 animate-bounce" />
              <span>تم عقد النية</span>
            </>
          ) : (
            "نويت اليوم"
          )}
        </motion.button>
      </div>
    </PageLayout>
  );
}
