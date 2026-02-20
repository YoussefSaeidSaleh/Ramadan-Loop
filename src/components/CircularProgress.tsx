import React from 'react';
import { Moon, Flame, BoxIcon } from 'lucide-react';
import { motion } from 'framer-motion';
interface Step {
  id: string;
  title: string;
  icon: BoxIcon;
  isCompleted: boolean;
}
interface CircularProgressProps {
  progress: number; // 0 to 100
  day: number;
  streak: number;
  steps: Step[];
  onSegmentClick: (id: string) => void;
}
export function CircularProgress({
  progress,
  day,
  streak,
  steps,
  onSegmentClick
}: CircularProgressProps) {
  const size = 340; // Increased size for desktop feel
  const strokeWidth = 24; // Thicker stroke for clickable segments
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  // Calculate segments
  const totalSegments = 5;
  const gapAngle = 4; // Degrees of gap between segments
  const segmentAngle = 360 / totalSegments;
  const arcLength = segmentAngle - gapAngle;
  // Helper to create arc path
  const createArc = (startAngle: number, endAngle: number) => {
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };
  // Helper to position labels
  const getLabelPosition = (angle: number, distanceOffset: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    const dist = radius + distanceOffset;
    return {
      x: center + dist * Math.cos(rad),
      y: center + dist * Math.sin(rad)
    };
  };
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size
      }}>

      {/* Decorative Glow */}
      <div className="absolute inset-0 rounded-full bg-gold-primary opacity-5 blur-3xl -z-10" />

      {/* SVG Container */}
      <svg width={size} height={size} className="overflow-visible">
        {steps.map((step, index) => {
          const startAngle = index * segmentAngle + gapAngle / 2;
          const endAngle = startAngle + arcLength;
          const midAngle = startAngle + arcLength / 2;
          // Label position
          const labelPos = getLabelPosition(midAngle, 55);
          const iconPos = getLabelPosition(midAngle, 0); // On the ring itself if needed, or slightly outside
          return (
            <g
              key={step.id}
              onClick={() => onSegmentClick(step.id)}
              className="cursor-pointer group">

              {/* Background Segment (Track) */}
              <path
                d={createArc(startAngle, endAngle)}
                fill="none"
                stroke="#1e2f4e"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                className="transition-all duration-300 group-hover:stroke-navy-light" />


              {/* Active/Completed Segment (Fill) */}
              {step.isCompleted &&
              <motion.path
                d={createArc(startAngle, endAngle)}
                fill="none"
                stroke="#d4af37"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                initial={{
                  pathLength: 0
                }}
                animate={{
                  pathLength: 1
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut'
                }} />

              }

              {/* Hover Glow Effect (Invisible trigger for hover state visual) */}
              <path
                d={createArc(startAngle, endAngle)}
                fill="none"
                stroke="transparent"
                strokeWidth={strokeWidth + 10}
                className="group-hover:stroke-gold-primary/20 transition-colors duration-300" />


              {/* Icon & Label */}
              <foreignObject
                x={labelPos.x - 40}
                y={labelPos.y - 30}
                width="80"
                height="60"
                className="overflow-visible pointer-events-none">

                <div
                  className={`flex flex-col items-center justify-center text-center transition-all duration-300 transform group-hover:scale-110 ${step.isCompleted ? 'text-gold-primary' : 'text-gray-400 group-hover:text-gold-light'}`}>

                  <step.icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-bold whitespace-nowrap">
                    {step.title}
                  </span>
                </div>
              </foreignObject>
            </g>);

        })}
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            delay: 0.2
          }}
          className="mb-2 text-gold-primary relative">

          <div className="absolute inset-0 bg-gold-primary blur-xl opacity-20" />
          <Moon className="w-12 h-12 fill-current relative z-10" />
        </motion.div>

        <h2 className="text-4xl font-bold text-white mb-1 tracking-tight">
          اليوم {day}
        </h2>

        <div className="text-gold-light text-lg font-medium mb-3">
          {progress}% مكتمل
        </div>

        {/* Streak Badge */}
        <div className="flex items-center gap-1.5 bg-navy-card/80 backdrop-blur-sm px-3 py-1 rounded-full border border-navy-light/50">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          <span className="text-xs font-medium text-gold-light">
            {streak} أيام
          </span>
        </div>
      </div>
    </div>);

}