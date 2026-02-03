import { motion } from "framer-motion";
import { Link } from "wouter";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg mx-auto px-4"
      >
        <motion.div
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-9xl font-bold gradient-text mb-8 inline-block"
        >
          404
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">
          {t("Page Not Found", "الصفحة غير موجودة")}
        </h1>

        <p className="text-muted-foreground mb-8">
          {t(
            "The page you're looking for doesn't exist or has been moved.",
            "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
          )}
        </p>

        <Link href="/">
          <Button size="lg" data-testid="button-go-home">
            <Home className="w-5 h-5 mr-2" />
            {t("Go Home", "العودة للرئيسية")}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
