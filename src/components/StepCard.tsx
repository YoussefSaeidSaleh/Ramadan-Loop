import React from 'react';
import { motion } from 'framer-motion';
import { Check, BoxIcon } from 'lucide-react';
interface StepCardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: BoxIcon;
  isCompleted: boolean;
  isActive?: boolean;
  onClick: () => void;
}
export function StepCard({
  title,
  subtitle,
  icon: Icon,
  isCompleted,
  isActive,
  onClick
}: StepCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.03,
        y: -2
      }}
      whileTap={{
        scale: 0.98
      }}
      className={`
        relative w-full p-4 rounded-2xl flex items-center gap-4 text-right transition-all duration-300
        ${isCompleted ? 'bg-gold-primary text-navy-deep shadow-lg shadow-gold-dim/20' : isActive ? 'bg-navy-card border-2 border-gold-primary text-cream shadow-md shadow-gold-primary/10' : 'bg-navy-card border border-navy-light text-cream hover:border-gold-dim/50 hover:shadow-gold-glow/10'}
      `}>

      <div
        className={`
        p-3 rounded-full flex-shrink-0 transition-colors
        ${isCompleted ? 'bg-navy-deep/10 text-navy-deep' : 'bg-navy-deep text-gold-primary'}
      `}>

        {isCompleted ?
        <Check className="w-6 h-6" /> :

        <Icon className="w-6 h-6" />
        }
      </div>

      <div className="flex-1">
        <h3
          className={`font-bold text-lg ${isCompleted ? 'text-navy-deep' : 'text-white'}`}>

          {title}
        </h3>
        <p
          className={`text-sm ${isCompleted ? 'text-navy-deep/80' : 'text-gray-400'}`}>

          {subtitle}
        </p>
      </div>

      {isActive && !isCompleted &&
      <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold-primary rounded-l-full" />
      }
    </motion.button>);

}