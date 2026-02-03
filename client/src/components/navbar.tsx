import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "@/lib/language-context";
import logoPath from "@assets/Asset_1@2x_1769441942763.png";

const navItems = [
  { href: "/", en: "Home", ar: "الرئيسية" },
  { href: "/about", en: "About Us", ar: "من نحن" },
  { href: "/services", en: "Services", ar: "الخدمات" },
  { href: "/prices", en: "Prices", ar: "الأسعار" },
  { href: "/projects", en: "Projects", ar: "المشاريع" },
  { href: "https://academy.teknokeys.com/", en: "Academy", ar: "الأكاديمية", external: true },
  { href: "/blogs", en: "Blogs", ar: "المدونة" },
  { href: "/contact", en: "Contact", ar: "تواصل معنا" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [location] = useLocation();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled ? "glass" : "bg-transparent backdrop-blur-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 cursor-pointer"
              data-testid="link-home-logo"
            >
              <img src={logoPath} alt="TeknoKeys" className="h-10 w-auto" />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors text-muted-foreground hover:text-foreground"
                    data-testid={`link-nav-${item.en.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {t(item.en, item.ar)}
                  </motion.div>
                </a>
              ) : (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                      location === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`link-nav-${item.en.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {t(item.en, item.ar)}
                  </motion.div>
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle isScrolled={isScrolled} />
            <ThemeToggle isScrolled={isScrolled} />
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
            >
              {isOpen ? (
                <X className={`w-5 h-5 transition-colors ${isDark ? "text-white" : isScrolled ? "text-zinc-800" : "text-white"}`} />
              ) : (
                <Menu className={`w-5 h-5 transition-colors ${isDark ? "text-white" : isScrolled ? "text-zinc-800" : "text-white"}`} />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="block px-4 py-3 rounded-md cursor-pointer text-muted-foreground"
                    >
                      {t(item.en, item.ar)}
                    </motion.div>
                  </a>
                ) : (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-md cursor-pointer ${
                        location === item.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground"
                      }`}
                    >
                      {t(item.en, item.ar)}
                    </motion.div>
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
