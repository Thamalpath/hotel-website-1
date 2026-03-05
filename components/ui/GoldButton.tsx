"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GoldButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
  type?: "button" | "submit";
}

export default function GoldButton({
  children,
  href,
  onClick,
  variant = "solid",
  size = "md",
  fullWidth = false,
  type = "button",
}: GoldButtonProps) {
  const padding =
    size === "sm" ? "10px 24px" : size === "lg" ? "18px 48px" : "14px 36px";
  const fontSize = size === "sm" ? 11 : size === "lg" ? 13 : 12;

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding,
    fontSize,
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    textDecoration: "none",
    width: fullWidth ? "100%" : undefined,
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const variantStyle: React.CSSProperties =
    variant === "solid"
      ? {
          background:
            "linear-gradient(105deg, #9a7a4a 0%, #c9a96e 40%, #e8d5aa 60%, #c9a96e 80%, #9a7a4a 100%)",
          backgroundSize: "250% auto",
          color: "#0a0a0a",
          border: "none",
        }
      : variant === "outline"
        ? {
            background: "transparent",
            color: "#c9a96e",
            border: "1px solid rgba(201, 169, 110, 0.6)",
          }
        : {
            background: "transparent",
            color: "#c9a96e",
            border: "none",
            padding: `${padding} 0`,
          };

  const content = (
    <motion.span
      style={{ ...baseStyle, ...variantStyle }}
      whileHover={
        variant === "solid"
          ? {
              backgroundPosition: "right center",
              boxShadow: "0 8px 32px rgba(201,169,110,0.35)",
              scale: 1.02,
            }
          : variant === "outline"
            ? {
                borderColor: "rgba(201,169,110,1)",
                backgroundColor: "rgba(201,169,110,0.08)",
                scale: 1.02,
              }
            : { x: 4 }
      }
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
      {variant === "ghost" && (
        <motion.span
          style={{
            display: "inline-block",
            fontSize: "1.1em",
            lineHeight: 1,
          }}
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      )}
    </motion.span>
  );

  if (href) {
    return (
      <Link
        href={href}
        style={{ display: fullWidth ? "block" : "inline-block" }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        display: fullWidth ? "block" : "inline-block",
        width: fullWidth ? "100%" : undefined,
      }}
    >
      {content}
    </button>
  );
}
