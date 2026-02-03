import { useRef, useEffect, useCallback } from "react";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  pulsePhase: number;
  size: number;
}

interface ElectronicBackgroundProps {
  className?: string;
}

export function ElectronicBackground({ className = "" }: ElectronicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const scrollRef = useRef<number>(0);

  const initDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = [];
    const gridSize = 60;
    const cols = Math.ceil(width / gridSize) + 1;
    const rows = Math.ceil(height / gridSize) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * gridSize + (Math.random() - 0.5) * 15;
        const y = row * gridSize + (Math.random() - 0.5) * 15;
        dots.push({
          x,
          y,
          baseX: x,
          baseY: y,
          pulsePhase: Math.random() * Math.PI * 2,
          size: Math.random() * 2 + 2,
        });
      }
    }

    return dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      dotsRef.current = initDots(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      timeRef.current += 0.02;
      const mouse = mouseRef.current;
      const dots = dotsRef.current;
      const mouseRadius = 120;

      dots.forEach((dot) => {
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          dot.x = dot.baseX - Math.cos(angle) * force * 25;
          dot.y = dot.baseY - Math.sin(angle) * force * 25;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.08;
          dot.y += (dot.baseY - dot.y) * 0.08;
        }
      });

      // Draw connecting lines based on scroll position
      const scrollAmount = scrollRef.current;
      const lineVisibility = Math.min(1, scrollAmount / 200);
      
      if (lineVisibility > 0) {
        const connectionDistance = 80;
        ctx.lineWidth = 1;
        
        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const dot1 = dots[i];
            const dot2 = dots[j];
            const dx = dot1.x - dot2.x;
            const dy = dot1.y - dot2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < connectionDistance) {
              const linePulse = Math.sin(timeRef.current * 3 + (dot1.pulsePhase + dot2.pulsePhase) / 2) * 0.3 + 0.7;
              const lineAlpha = 0.15 * linePulse * (1 - dist / connectionDistance) * lineVisibility;
              
              ctx.beginPath();
              ctx.moveTo(dot1.x, dot1.y);
              ctx.lineTo(dot2.x, dot2.y);
              ctx.strokeStyle = `rgba(234, 179, 8, ${lineAlpha})`;
              ctx.stroke();
            }
          }
        }
      }

      // Draw dots
      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / mouseRadius);
        
        const pulse = Math.sin(timeRef.current * 2 + dot.pulsePhase) * 0.2 + 0.8;
        const alpha = (0.25 + proximity * 0.75) * pulse;
        const size = dot.size + proximity * 4;

        if (proximity > 0.2) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, size + 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(234, 179, 8, ${proximity * 0.1})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 179, 8, ${alpha})`;
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, [initDots]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "auto" }}
    />
  );
}
