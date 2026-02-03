import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

interface LanguageToggleProps {
  isScrolled?: boolean;
}

export function LanguageToggle({ isScrolled = false }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const iconColor = isDark 
    ? "text-white" 
    : isScrolled 
      ? "text-zinc-800" 
      : "text-white";

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      data-testid="button-language-toggle"
    >
      <Globe className={`w-5 h-5 ${iconColor}`} />
    </Button>
  );
}
