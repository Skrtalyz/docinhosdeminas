import { motion, HTMLMotionProps } from "motion/react";
import React, { ReactNode, useState, useEffect, ButtonHTMLAttributes } from "react";

interface ClayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  const getCalculatedHref = (): string => {
    if (!href) return "";
    try {
      let url: URL;
      try {
        url = new URL(href);
      } catch {
        url = new URL(href, window.location.origin);
      }

      const mergedParams = new URLSearchParams();

      // 1. Get from current URL search params
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.forEach((value, key) => {
        if (value) mergedParams.set(key, value);
      });

      // 2. Scan localStorage for UTM parameters, UTMify values, and custom tracking fields
      try {
        const trackingKeys = [
          "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id",
          "xcod", "src", "sck", "subid", "fbclid", "gclid", "ttclid", "pixelId"
        ];
        
        trackingKeys.forEach(key => {
          const val = localStorage.getItem(key);
          if (val) mergedParams.set(key, val);
        });

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            const lowerKey = key.toLowerCase();
            if (lowerKey.includes("utm") || lowerKey.startsWith("utmify") || lowerKey === "xcod" || lowerKey === "pixelid" || lowerKey === "sck" || lowerKey === "src" || lowerKey === "subid") {
              const val = localStorage.getItem(key);
              if (val && typeof val === "string" && val.length < 500) {
                mergedParams.set(key, val);
              }
            }
          }
        }
      } catch (e) {
        // Safe fallback
      }

      // 3. Scan sessionStorage
      try {
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key) {
            const lowerKey = key.toLowerCase();
            if (lowerKey.includes("utm") || lowerKey.startsWith("utmify") || lowerKey === "xcod" || lowerKey === "pixelid" || lowerKey === "sck" || lowerKey === "src" || lowerKey === "subid") {
              const val = sessionStorage.getItem(key);
              if (val && typeof val === "string" && val.length < 500) {
                mergedParams.set(key, val);
              }
            }
          }
        }
      } catch (e) {
        // Safe fallback
      }

      // 4. Scan cookies
      try {
        const cookies = document.cookie.split(";");
        cookies.forEach(cookie => {
          const parts = cookie.split("=");
          if (parts.length >= 2) {
            const key = parts[0].trim();
            const rawValue = parts.slice(1).join("=");
            const lowerKey = key.toLowerCase();
            if (lowerKey.includes("utm") || lowerKey.startsWith("utmify") || lowerKey === "xcod" || lowerKey === "pixelid" || lowerKey === "sck" || lowerKey === "src" || lowerKey === "subid") {
              try {
                const val = decodeURIComponent(rawValue.trim());
                if (val && val.length < 500) {
                  mergedParams.set(key, val);
                }
              } catch {
                mergedParams.set(key, rawValue.trim());
              }
            }
          }
        });
      } catch (e) {
        // Safe fallback
      }

      // Apply all merged parameters back to the URL
      mergedParams.forEach((value, key) => {
        if (value) {
          url.searchParams.set(key, value);
        }
      });

      if (href.startsWith("http://") || href.startsWith("https://")) {
        return url.toString();
      } else {
        return url.pathname + url.search + url.hash;
      }
    } catch (e) {
      console.error("Error creating calculated href:", e);
      return href;
    }
  };

  const calculatedHref = getCalculatedHref();

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

  const inIframe = typeof window !== "undefined" && window.self !== window.top;
  const isExternal = href && (href.startsWith("http://") || href.startsWith("https://"));
  const finalTarget = target || (isExternal ? (inIframe ? "_top" : "_self") : undefined);
  const finalRel = rel || (finalTarget === "_blank" ? "noopener noreferrer" : undefined);

  if (href) {
    return (
      <motion.a
        href={calculatedHref}
        target={finalTarget}
        rel={finalRel}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.92 }}
        onClick={(e) => {
          if ((props as any).onClick) {
            (props as any).onClick(e as any);
          }
          // Do NOT call e.preventDefault(). This ensures native HTML link navigation
          // continues normally, allowing UTMify's tracking script to successfully capture
          // standard click events and register clicks on the UTMify dashboard metric.
        }}
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
