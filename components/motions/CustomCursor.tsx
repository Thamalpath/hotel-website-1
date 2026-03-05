"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 32, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 32, mass: 0.4 });

  const trailX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.8 });
  const trailY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.8 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setHidden(false);
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const onHoverStart = () => setHovered(true);
    const onHoverEnd = () => setHovered(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    // Detect interactive elements
    const links = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label",
    );
    links.forEach((el) => {
      el.addEventListener("mouseenter", onHoverStart);
      el.addEventListener("mouseleave", onHoverEnd);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverStart);
        el.removeEventListener("mouseleave", onHoverEnd);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Trail ring */}
      <motion.div
        style={{
          position: "fixed",
          left: trailX,
          top: trailY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99998,
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{
            width: hovered ? 48 : 32,
            height: hovered ? 48 : 32,
            opacity: hidden ? 0 : hovered ? 0.6 : 0.3,
            borderColor: hovered
              ? "rgba(201,169,110,0.8)"
              : "rgba(201,169,110,0.4)",
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            border: "1px solid",
            borderRadius: "50%",
            borderColor: "rgba(201,169,110,0.4)",
          }}
        />
      </motion.div>

      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99999,
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{
            width: clicked ? 6 : hovered ? 10 : 7,
            height: clicked ? 6 : hovered ? 10 : 7,
            opacity: hidden ? 0 : 1,
            backgroundColor: hovered ? "#c9a96e" : "#e8d5aa",
          }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ borderRadius: "50%" }}
        />
      </motion.div>
    </>
  );
}
