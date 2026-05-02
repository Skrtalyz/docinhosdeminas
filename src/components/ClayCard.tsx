import { motion, HTMLMotionProps } from "motion/react";
import { ReactNode } from "react";

interface ClayCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverLift?: boolean;
}

export const ClayCard = ({
  children,
  className = "",
  hoverLift = true,
  ...props
}: ClayCardProps) => {
  return (
    <motion.div
      whileHover={hoverLift ? { y: -8 } : {}}
      className={`
        relative overflow-hidden rounded-[32px] bg-white/60 p-8 text-clay-foreground 
        shadow-clay-card backdrop-blur-xl transition-all duration-500
        ${className}
      `}
      {...props}
    >
      <div className="relative z-10 flex h-full flex-col">
        {children}
      </div>
    </motion.div>
  );
};
