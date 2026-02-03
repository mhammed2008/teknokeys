import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import logoPath from "@assets/Asset_1@2x_1769441942763.png";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <img src={logoPath} alt="TeknoKeys" className="h-12 w-auto" />
            <p className="text-muted-foreground text-sm">
              {t(
                "Top Mobile App & Web Development Company in Yemen & KSA",
                "أفضل شركة لتطوير تطبيقات الجوال والويب في اليمن والسعودية"
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg">{t("Services", "الخدمات")}</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>{t("Cybersecurity & Compliance", "الأمن السيبراني والامتثال")}</li>
              <li>{t("Training & Capacity Building", "التدريب وبناء القدرات")}</li>
              <li>{t("Business Solutions", "حلول الأعمال")}</li>
              <li>{t("Digital Development", "التطوير الرقمي")}</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg">{t("Quick Links", "روابط سريعة")}</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>{t("About Us", "من نحن")}</li>
              <li>{t("Projects", "المشاريع")}</li>
              <li>{t("Pricing", "الأسعار")}</li>
              <li>{t("Blogs", "المدونة")}</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg">{t("Contact", "تواصل")}</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                info@teknokeys.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +967 777 575 679
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {t("Yemen, Sana'a", "اليمن، صنعاء")}
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm"
        >
          <p>
            © {new Date().getFullYear()} TeknoKeys.{" "}
            {t("All rights reserved.", "جميع الحقوق محفوظة.")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
