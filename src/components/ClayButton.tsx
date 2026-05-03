import { motion, HTMLMotionProps } from "motion/react";
import { ReactNode } from "react";

interface ClayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
  href?: string;
  id?: string;
  target?: string;
  rel?: string;
}

export const ClayButton = ({
  children,
  variant = "primary",
  size = "default",
  className = "",
  href,
  id,
  target,
  rel,
  ...props
}: ClayButtonProps) => {
  const sizeClasses = {
    sm: "h-11 px-6 rounded-[16px] text-sm",
    default: "h-14 px-8 rounded-[20px] text-base",
    lg: "h-16 px-10 rounded-[24px] text-lg",
  };

  const variantClasses = {
    primary: "bg-linear-to-br from-emerald-400 to-emerald-600 text-white shadow-clay-button",
    secondary: "bg-white text-clay-foreground shadow-clay-button",
    outline: "border-2 border-emerald-500/20 bg-transparent text-emerald-600 hover:border-emerald-500",
    ghost: "text-clay-foreground hover:bg-emerald-50 hover:text-emerald-600",
  };

  const commonClasses = `
    inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 cursor-pointer
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${variant === 'primary' ? 'active:shadow-clay-pressed' : ''}
    ${className}
  `;

  const commonProps = {
    className: commonClasses,
    style: { fontFamily: "Nunito, sans-serif" },
    id: id,
    ...(props as any)
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.92 }}
        {...commonProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.92 }}
      {...commonProps}
    >
      {children}
    </motion.button>
  );
};
