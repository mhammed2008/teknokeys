import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  isScrolled?: boolean;
}

export function ThemeToggle({ isScrolled = false }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const iconColor = isDark 
    ? "text-white" 
    : isScrolled 
      ? "text-zinc-800" 
      : "text-white";

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setIsDark(!isDark)}
      data-testid="button-theme-toggle"
    >
      {isDark ? <Sun className={`w-5 h-5 ${iconColor}`} /> : <Moon className={`w-5 h-5 ${iconColor}`} />}
    </Button>
  );
}
