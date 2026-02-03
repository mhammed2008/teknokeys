import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "rotate";
}

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -5, y: 30 },
    visible: { opacity: 1, rotate: 0, y: 0 },
  },
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      variants={variants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Animated3DSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 25, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  index = 0,
}: AnimatedSectionProps & { index?: number }) {
  // Alternate animation directions based on index
  const directions = ["left", "right", "up", "scale"];
  const direction = directions[index % directions.length];
  
  const cardVariants: Record<string, Variants> = {
    left: {
      hidden: { opacity: 0, x: -80, rotateY: 10 },
      visible: { opacity: 1, x: 0, rotateY: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 80, rotateY: -10 },
      visible: { opacity: 1, x: 0, rotateY: 0 },
    },
    up: {
      hidden: { opacity: 0, y: 80, rotateX: 10 },
      visible: { opacity: 1, y: 0, rotateX: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.7, rotate: -3 },
      visible: { opacity: 1, scale: 1, rotate: 0 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        duration: 0.7, 
        delay: delay + index * 0.1, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      variants={cardVariants[direction]}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
