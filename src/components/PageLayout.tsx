import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showBack?: boolean;
}
export function PageLayout({
  title,
  subtitle,
  children,
  showBack = true
}: PageLayoutProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-navy-deep text-cream relative overflow-hidden flex flex-col items-center">
      {/* Background Pattern */}
      <div className="islamic-pattern absolute inset-0 opacity-30" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-8 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          {
          showBack ?
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-navy-light text-gold-primary transition-colors"
            aria-label="Back to Home">

                <ArrowRight className="w-6 h-6" />
              </button> :

          <div className="w-10" />
          /* Spacer */
          }
          <div className="text-center flex-1">
            <motion.h1
              initial={{
                opacity: 0,
                y: -10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="text-2xl font-bold text-gold-primary">

              {title}
            </motion.h1>
            {subtitle &&
            <motion.p
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.1
              }}
              className="text-sm text-gray-400 mt-1">

                {subtitle}
              </motion.p>
            }
          </div>
          <div className="w-10" /> /* Spacer for balance */ /* Spacer for
          balance */
        </header>

        {/* Main Content */}
        <motion.main
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4
          }}
          className="flex-1 flex flex-col">

          {children}
        </motion.main>
      </div>
    </div>);

}