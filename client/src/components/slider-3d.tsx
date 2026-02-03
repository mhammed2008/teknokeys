import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slider3DProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
}

export function Slider3D<T>({
  items,
  renderItem,
  autoPlay = true,
  interval = 5000,
}: Slider3DProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="relative perspective-2000 overflow-hidden">
      <div className="relative h-[500px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const offset = index - currentIndex;
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);
            
            if (absOffset > 2) return null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: offset * 45 }}
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  scale: isActive ? 1 : 0.8 - absOffset * 0.1,
                  x: offset * 250,
                  z: isActive ? 100 : -100 * absOffset,
                  rotateY: offset * 30,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute preserve-3d"
                style={{ zIndex: items.length - absOffset }}
              >
                {renderItem(item, index)}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          size="icon"
          variant="outline"
          onClick={prev}
          data-testid="button-slider-prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex gap-2 items-center">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
              }`}
              data-testid={`button-slider-dot-${index}`}
            />
          ))}
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={next}
          data-testid="button-slider-next"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
