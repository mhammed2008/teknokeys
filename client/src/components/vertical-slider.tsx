import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerticalSliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function VerticalSlider<T>({
  items,
  renderItem,
  autoPlay = false,
  autoPlayInterval = 4000,
}: VerticalSliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    if (!autoPlay || isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= items.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isHovering, items.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isHovering) {
        const isAtStart = currentIndex === 0;
        const isAtEnd = currentIndex === items.length - 1;
        
        if (e.deltaY > 0 && !isAtEnd) {
          e.preventDefault();
          setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
        } else if (e.deltaY < 0 && !isAtStart) {
          e.preventDefault();
          setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isHovering, items.length, currentIndex]);

  return (
    <div 
      ref={containerRef} 
      className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] perspective-2000 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const offset = index - currentIndex;
          const isActive = offset === 0;
          const absOffset = Math.abs(offset);
          
          if (absOffset > 2) return null;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 200, rotateX: -45 }}
              animate={{
                opacity: isActive ? 1 : 0.3 - absOffset * 0.1,
                y: offset * 150,
                z: isActive ? 50 : -100 * absOffset,
                rotateX: offset * -15,
                scale: isActive ? 1 : 0.85 - absOffset * 0.05,
              }}
              exit={{ opacity: 0, y: -200, rotateX: 45 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-x-0 preserve-3d flex justify-center"
              style={{ zIndex: items.length - absOffset }}
            >
              {renderItem(item, index, isActive)}
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-4 z-50">
        <Button
          size="icon"
          variant="outline"
          onClick={prev}
          disabled={currentIndex === 0}
          data-testid="button-vslider-prev"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        
        <div className="flex flex-col gap-2 items-center">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary h-6" : "bg-muted-foreground/30"
              }`}
              data-testid={`button-vslider-dot-${index}`}
            />
          ))}
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={next}
          disabled={currentIndex === items.length - 1}
          data-testid="button-vslider-next"
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
