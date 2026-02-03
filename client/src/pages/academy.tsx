import { useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export default function Academy() {
  const { t } = useLanguage();
  const academyUrl = "https://academy.teknokeys.com/";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = academyUrl;
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg mx-auto px-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-8 border-4 border-primary border-t-transparent rounded-full"
        />

        <h1 className="text-3xl font-bold mb-4">
          {t("Redirecting to Academy", "جاري التوجيه إلى الأكاديمية")}
        </h1>

        <p className="text-muted-foreground mb-8">
          {t(
            "You will be redirected to TeknoKeys Academy in a few seconds...",
            "سيتم توجيهك إلى أكاديمية تكنوكيز في ثوانٍ قليلة..."
          )}
        </p>

        <Button size="lg" asChild data-testid="button-go-to-academy">
          <a href={academyUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-5 h-5 mr-2" />
            {t("Go to Academy Now", "الذهاب إلى الأكاديمية الآن")}
          </a>
        </Button>
      </motion.div>
    </div>
  );
}
