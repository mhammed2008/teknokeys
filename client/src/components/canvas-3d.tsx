import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  floatPhase: number;
}

interface Canvas3DProps {
  className?: string;
}

export function Canvas3D({ className = "" }: Canvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.5 + 0.3,
        floatPhase: Math.random() * Math.PI * 2,
      });
    }

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);
        particlesRef.current = initParticles(rect.width, rect.height);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const project3D = (x: number, y: number, z: number) => {
      const fov = 500;
      const scale = fov / (fov + z);
      return {
        x: canvas.width / 2 + (x - canvas.width / 2) * scale,
        y: canvas.height / 2 + (y - canvas.height / 2) * scale,
        scale,
      };
    };

    const canvasWidth = parseFloat(canvas.style.width) || canvas.width;
    const canvasHeight = parseFloat(canvas.style.height) || canvas.height;
    const mouseRadius = 120;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      time += 0.005;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      particlesRef.current.forEach((particle) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Anti-gravity push effect
        if (distance < mouseRadius && distance > 0) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 2;
          particle.vy -= Math.sin(angle) * force * 2;
        }

        // Gentle floating motion
        const floatX = Math.sin(time + particle.floatPhase) * 0.3;
        const floatY = Math.cos(time * 0.8 + particle.floatPhase) * 0.3;

        // Return to base position with floating offset
        const targetX = particle.baseX + floatX;
        const targetY = particle.baseY + floatY;
        particle.vx += (targetX - particle.x) * 0.02;
        particle.vy += (targetY - particle.y) * 0.02;

        // Apply friction
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw dot with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 179, 8, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.globalAlpha = (1 - dist / 120) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      frameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      data-testid="canvas-3d-background"
    />
  );
}

// App icons for the 3D phone - using imported images
import nassLogo from "@assets/download_1769445780368.png";
import kiwiLogo from "@assets/unnamed_1769446040312.webp";
import gLogo from "@assets/download_1769446060436.png";
import karendLogo from "@assets/download_1769446078930.jpg";
import mochaLogo from "@assets/full-1_1769446627422.webp";
import dropoffLogo from "@assets/200x200ia-75_1769446709297.webp";
import phoenixLogo from "@assets/logo_(1)_1769446790784.webp";

const APP_ICONS = [
  { image: nassLogo, color: "#FF4500" }, // Nass
  { image: kiwiLogo, color: "#6B8E23" }, // Kiwi
  { image: gLogo, color: "#1a1a1a" }, // G Logo
  { image: karendLogo, color: "#F59E0B" }, // Karend
  { image: mochaLogo, color: "#8B4513" }, // Mocha Auction
  { image: dropoffLogo, color: "#00CED1" }, // DropOff
  { image: phoenixLogo, color: "#DC143C" }, // Phoenix
];

interface FloatingApp {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  icon: typeof APP_ICONS[0];
  phase: number;
  speed: number;
  imageLoaded: boolean;
  imageElement: HTMLImageElement | null;
}

export function Canvas3DPhone({ className = "" }: Canvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const appsRef = useRef<FloatingApp[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = container.clientWidth * dpr;
        canvas.height = container.clientHeight * dpr;
        canvas.style.width = `${container.clientWidth}px`;
        canvas.style.height = `${container.clientHeight}px`;
        ctx.scale(dpr, dpr);
        initApps(container.clientWidth, container.clientHeight);
      }
    };

    const initApps = (width: number, height: number) => {
      const apps: FloatingApp[] = [];
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Scale up only for large screens (lg breakpoint ~1024px)
      const isLargeScreen = width >= 900;
      const scaleFactor = isLargeScreen ? 1.5 : 1;
      const baseRadius = (80 + Math.random() * 40) * scaleFactor;
      const iconSize = (40 + Math.random() * 12) * scaleFactor;

      APP_ICONS.forEach((icon, i) => {
        const angle = (i / APP_ICONS.length) * Math.PI * 2;
        const radius = baseRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius * 0.6 - 30;
        const z = Math.random() * 100 - 50;

        // Load image
        const img = new Image();
        img.src = icon.image;

        const app: FloatingApp = {
          x, y, z,
          baseX: x,
          baseY: y,
          baseZ: z,
          vx: 0, vy: 0, vz: 0,
          size: iconSize,
          icon,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.5,
          imageLoaded: false,
          imageElement: null,
        };

        img.onload = () => {
          app.imageLoaded = true;
          app.imageElement = img;
        };

        apps.push(app);
      });

      appsRef.current = apps;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    };

    let time = 0;

    const drawPhone = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, width: number, height: number, rotX: number, rotY: number) => {
      // Scale up only for large screens (lg breakpoint ~1024px)
      const isLargeScreen = width >= 900;
      const scaleFactor = isLargeScreen ? 1.5 : 1;
      
      const phoneWidth = 120 * scaleFactor;
      const phoneHeight = 252 * scaleFactor; // 2.1:1 aspect ratio
      const cornerRadius = 20 * scaleFactor;
      const bezelWidth = 8 * scaleFactor;

      // Apply 3D rotation transform
      ctx.save();
      ctx.translate(centerX, centerY);

      // 3D perspective skew based on mouse
      const skewX = rotY * 0.3;
      const skewY = -rotX * 0.2;
      ctx.transform(1, skewY, skewX, 1, 0, 0);

      // Phone outer frame (bezel)
      ctx.beginPath();
      ctx.roundRect(-phoneWidth / 2, -phoneHeight / 2, phoneWidth, phoneHeight, cornerRadius);
      ctx.fillStyle = "#1a1a1a";
      ctx.fill();
      ctx.strokeStyle = "#EAB308";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Phone screen
      ctx.beginPath();
      ctx.roundRect(
        -phoneWidth / 2 + bezelWidth,
        -phoneHeight / 2 + bezelWidth * 2,
        phoneWidth - bezelWidth * 2,
        phoneHeight - bezelWidth * 3,
        cornerRadius - 4
      );
      const gradient = ctx.createLinearGradient(0, -phoneHeight / 2, 0, phoneHeight / 2);
      gradient.addColorStop(0, "#0a0a0a");
      gradient.addColorStop(0.5, "#151515");
      gradient.addColorStop(1, "#0a0a0a");
      ctx.fillStyle = gradient;
      ctx.fill();

      // Screen glow effect
      ctx.shadowColor = "#EAB308";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.strokeStyle = "rgba(234, 179, 8, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Notch at top
      const notchWidth = 50 * scaleFactor;
      const notchHeight = 10 * scaleFactor;
      ctx.beginPath();
      ctx.roundRect(-notchWidth / 2, -phoneHeight / 2 + bezelWidth, notchWidth, notchHeight, notchHeight / 2);
      ctx.fillStyle = "#0a0a0a";
      ctx.fill();

      // Home indicator at bottom
      const indicatorWidth = 70 * scaleFactor;
      const indicatorHeight = 4 * scaleFactor;
      ctx.beginPath();
      ctx.roundRect(-indicatorWidth / 2, phoneHeight / 2 - bezelWidth * 2 - indicatorHeight - 2, indicatorWidth, indicatorHeight, indicatorHeight / 2);
      ctx.fillStyle = "rgba(234, 179, 8, 0.5)";
      ctx.fill();

      ctx.restore();
    };

    const drawFloatingApp = (app: FloatingApp, time: number, rotX: number, rotY: number) => {
      const canvasW = parseFloat(canvas.style.width) || canvas.width;
      const canvasH = parseFloat(canvas.style.height) || canvas.height;
      
      // Floating animation - consistent on all screens
      const floatX = Math.sin(time * app.speed + app.phase) * 15;
      const floatY = Math.cos(time * app.speed * 0.8 + app.phase) * 10;
      const floatZ = Math.sin(time * app.speed * 0.5 + app.phase) * 30;

      // Apply mouse repulsion
      const mouseX = (mouseRef.current.x + 0.5) * canvasW;
      const mouseY = (mouseRef.current.y + 0.5) * canvasH;

      const dx = mouseX - app.x;
      const dy = mouseY - app.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const repulsionRadius = 100;
      if (dist < repulsionRadius && dist > 0) {
        const force = (repulsionRadius - dist) / repulsionRadius;
        app.vx -= (dx / dist) * force * 3;
        app.vy -= (dy / dist) * force * 3;
      }

      // Return to base with floating
      const targetX = app.baseX + floatX + rotY * 50;
      const targetY = app.baseY + floatY - rotX * 30;
      const targetZ = app.baseZ + floatZ;

      app.vx += (targetX - app.x) * 0.03;
      app.vy += (targetY - app.y) * 0.03;
      app.vz += (targetZ - app.z) * 0.03;

      app.vx *= 0.92;
      app.vy *= 0.92;
      app.vz *= 0.92;

      app.x += app.vx;
      app.y += app.vy;
      app.z += app.vz;

      // 3D projection
      const fov = 400;
      const scale = fov / (fov + app.z);
      const projX = canvasW / 2 + (app.x - canvasW / 2) * scale;
      const projY = canvasH / 2 + (app.y - canvasH / 2) * scale;
      const projSize = app.size * scale;

      // Draw app icon background
      ctx.save();
      ctx.translate(projX, projY);

      // Glow effect
      ctx.shadowColor = app.icon.color;
      ctx.shadowBlur = 20;

      // App background with rounded corners
      const cornerRadius = 12;
      ctx.beginPath();
      ctx.roundRect(-projSize / 2, -projSize / 2, projSize, projSize, cornerRadius);
      ctx.fillStyle = "rgba(26, 26, 26, 0.9)";
      ctx.fill();
      ctx.strokeStyle = app.icon.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Draw image if loaded
      if (app.imageLoaded && app.imageElement) {
        ctx.save();
        // Clip to rounded rect for image
        const padding = 4;
        const innerRadius = 8;
        ctx.beginPath();
        ctx.roundRect(-projSize / 2 + padding, -projSize / 2 + padding, projSize - padding * 2, projSize - padding * 2, innerRadius);
        ctx.clip();
        ctx.drawImage(
          app.imageElement,
          -projSize / 2 + padding,
          -projSize / 2 + padding,
          projSize - padding * 2,
          projSize - padding * 2
        );
        ctx.restore();
      }

      ctx.restore();
    };

    const animate = () => {
      const width = parseFloat(canvas.style.width) || canvas.width;
      const height = parseFloat(canvas.style.height) || canvas.height;

      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Smooth mouse following
      rotationRef.current.x += (mouseRef.current.y - rotationRef.current.x) * 0.05;
      rotationRef.current.y += (mouseRef.current.x - rotationRef.current.y) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw phone first
      drawPhone(ctx, centerX, centerY + 20, width, height, rotationRef.current.x, rotationRef.current.y);

      // Sort apps by Z for proper depth ordering
      const sortedApps = [...appsRef.current].sort((a, b) => b.z - a.z);

      // Draw floating apps
      sortedApps.forEach(app => {
        drawFloatingApp(app, time, rotationRef.current.x, rotationRef.current.y);
      });

      // Draw connecting lines from phone to apps
      ctx.strokeStyle = "rgba(234, 179, 8, 0.15)";
      ctx.lineWidth = 1;
      appsRef.current.forEach(app => {
        const fov = 400;
        const scale = fov / (fov + app.z);
        const projX = width / 2 + (app.x - width / 2) * scale;
        const projY = height / 2 + (app.y - height / 2) * scale;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 20);
        ctx.lineTo(projX, projY);
        ctx.stroke();
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full cursor-pointer ${className}`}
      data-testid="canvas-3d-phone"
    />
  );
}

export function Canvas3DProjectViewer({ className = "" }: Canvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const rotationRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0, isOver: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
        isOver: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isOver = false;
    };

    const drawCube = (centerX: number, centerY: number, size: number, rotX: number, rotY: number) => {
      const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      ];

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];

      const rotateX = (point: number[], angle: number): number[] => {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return [point[0], point[1] * cos - point[2] * sin, point[1] * sin + point[2] * cos];
      };

      const rotateY = (point: number[], angle: number): number[] => {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return [point[0] * cos + point[2] * sin, point[1], -point[0] * sin + point[2] * cos];
      };

      const project = (point: number[]): [number, number] => {
        const fov = 4;
        const scale = fov / (fov + point[2]) * size;
        return [centerX + point[0] * scale, centerY + point[1] * scale];
      };

      const rotatedVertices = vertices.map(v => {
        let p = rotateX(v, rotX);
        p = rotateY(p, rotY);
        return p;
      });

      ctx.strokeStyle = "rgba(234, 179, 8, 0.8)";
      ctx.lineWidth = 2;

      edges.forEach(([i, j]) => {
        const [x1, y1] = project(rotatedVertices[i]);
        const [x2, y2] = project(rotatedVertices[j]);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      rotatedVertices.forEach(v => {
        const [x, y] = project(v);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(234, 179, 8, 1)";
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouseRef.current.isOver) {
        rotationRef.current.x += (mouseRef.current.y * 2 - rotationRef.current.x) * 0.1;
        rotationRef.current.y += (mouseRef.current.x * 2 - rotationRef.current.y) * 0.1;
      } else {
        rotationRef.current.x += 0.005;
        rotationRef.current.y += 0.01;
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = Math.min(canvas.width, canvas.height) * 0.25;

      drawCube(centerX, centerY, size, rotationRef.current.x, rotationRef.current.y);

      frameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      data-testid="canvas-3d-viewer"
    />
  );
}
