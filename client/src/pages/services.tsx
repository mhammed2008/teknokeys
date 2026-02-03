import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Shield, GraduationCap, Briefcase, Smartphone, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { VerticalSlider } from "@/components/vertical-slider";
import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import { ElectronicBackground } from "@/components/electronic-background";
import { Link } from "wouter";
import type { Service } from "@shared/schema";

const serviceIcons: Record<string, any> = {
  "1": Shield,
  "2": GraduationCap,
  "6": Briefcase,
  "7": Smartphone,
};

export default function Services() {
  const { t } = useLanguage();

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const renderServiceCard = (service: Service, index: number, isActive: boolean) => {
    const Icon = serviceIcons[service.id] || Shield;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.5 }}
        className="w-full max-w-4xl mx-auto px-4 sm:px-6"
      >
        <Card className={`p-4 sm:p-6 lg:p-8 transition-all duration-500 ${isActive ? "glow-primary" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
            <div className="order-2 md:order-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isActive ? 1 : 0.8 }}
                transition={{ type: "spring" }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6"
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </motion.div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
                {t(service.title.en, service.title.ar)}
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
                {t(service.description.en, service.description.ar)}
              </p>

              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-8 hidden sm:block">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">{t(feature.en, feature.ar)}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/contact">
                <Button size="sm" className="sm:size-default" data-testid={`button-request-service-${service.id}`}>
                  {t("Request Service", "طلب الخدمة")}
                </Button>
              </Link>
            </div>

            <div className="order-1 md:order-2">
              <motion.div
                animate={{
                  rotateY: isActive ? [0, 5, 0, -5, 0] : 0,
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20"
              >
                <img
                  src={service.image}
                  alt={service.title.en}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-12 relative overflow-hidden">
        <ElectronicBackground className="opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {t("Our ", "خدماتنا ")}
              <span className="gradient-text">{t("Services", "")}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t(
                "Scroll to explore our comprehensive range of IT services designed to transform your business",
                "مرر للأسفل لاستكشاف مجموعتنا الشاملة من خدمات تقنية المعلومات المصممة لتحويل عملك"
              )}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Vertical Slider */}
      <section className="relative overflow-hidden mb-12 sm:mb-20">
        <ElectronicBackground className="opacity-25" />
        {services.length > 0 ? (
          <VerticalSlider items={services} renderItem={renderServiceCard} autoPlay autoPlayInterval={5000} />
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-muted-foreground">
              {t("No services available", "لا توجد خدمات متاحة")}
            </p>
          </div>
        )}
      </section>

      {/* Additional Services Grid */}
      <section className="py-12 sm:py-20 bg-card relative overflow-hidden">
        <ElectronicBackground className="opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              {t("Additional Services", "خدمات إضافية")}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: { en: "Penetration Testing", ar: "اختبار الاختراق" },
                description: {
                  en: "Discover potential attacks and assess your company's security systems' ability to defend against them",
                  ar: "اكتشف الهجمات المحتملة وقيم قدرة أنظمة أمان شركتك على الدفاع ضدها"
                },
              },
              {
                title: { en: "Training Programs", ar: "برامج التدريب" },
                description: {
                  en: "Educate employees on how to swiftly deal with malicious attacks",
                  ar: "تثقيف الموظفين حول كيفية التعامل السريع مع الهجمات الخبيثة"
                },
              },
              {
                title: { en: "Detailed Reports", ar: "تقارير مفصلة" },
                description: {
                  en: "Detailed reports on the extent of the damage that occurred to your company's systems",
                  ar: "تقارير مفصلة عن مدى الضرر الذي لحق بأنظمة شركتك"
                },
              },
              {
                title: { en: "Wireless Network Security", ar: "أمان الشبكات اللاسلكية" },
                description: {
                  en: "Assess wireless network security and identify potential attacks",
                  ar: "تقييم أمان الشبكة اللاسلكية وتحديد الهجمات المحتملة"
                },
              },
              {
                title: { en: "Mobile App Development", ar: "تطوير تطبيقات الموبايل" },
                description: {
                  en: "Custom iOS and Android applications built with the latest technologies",
                  ar: "تطبيقات iOS و Android مخصصة مبنية بأحدث التقنيات"
                },
              },
              {
                title: { en: "Web Development", ar: "تطوير الويب" },
                description: {
                  en: "Professional websites and web applications with modern design",
                  ar: "مواقع وتطبيقات ويب احترافية بتصميم حديث"
                },
              },
            ].map((service, index) => (
              <AnimatedCard key={index} index={index}>
                <motion.div
                  whileHover={{ y: -10, rotateY: 5 }}
                  transition={{ type: "spring" }}
                  className="perspective-1000"
                >
                  <Card className="p-6 h-full hover-elevate">
                    <h3 className="text-lg font-semibold mb-2">
                      {t(service.title.en, service.title.ar)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(service.description.en, service.description.ar)}
                    </p>
                  </Card>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
