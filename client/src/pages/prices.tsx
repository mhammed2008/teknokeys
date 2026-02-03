import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Check, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";
import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import { Card3D } from "@/components/3d-card";
import { ElectronicBackground } from "@/components/electronic-background";
import type { PricingPlan } from "@shared/schema";

export default function Prices() {
  const { t } = useLanguage();

  const { data: plans = [], isLoading } = useQuery<PricingPlan[]>({
    queryKey: ["/api/prices"],
  });

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
        <ElectronicBackground className="opacity-25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {t("Choose Your ", "اختر ")}
              <span className="gradient-text">{t("Plan", "خطتك")}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t(
                "Flexible pricing packages designed to meet your business needs.",
                "باقات أسعار مرنة مصممة لتلبية احتياجات عملك."
              )}
            </p>
          </AnimatedSection>
        </div>
      </section>
      {/* Pricing Cards Grid */}
      <section className="py-12 pt-[110px] pb-[110px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {plans.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {plans.map((plan, index) => (
                <AnimatedCard key={plan.id} index={index} className="h-[450px]">
                  <Card3D className="h-full">
                    <Card
                      className="shadcn-card rounded-xl border bg-card border-card-border text-card-foreground shadow-sm p-8 h-full relative overflow-hidden flex flex-col ml-[8px] mr-[8px] mt-[8px] mb-[8px]"
                    >
                      {plan.isPopular && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-primary text-primary-foreground">
                            <Star className="w-3 h-3 mr-1" />
                            {t("Popular", "الأكثر شعبية")}
                          </Badge>
                        </div>
                      )}

                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">
                          {t(plan.name.en, plan.name.ar)}
                        </h2>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold gradient-text">${plan.price}</span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-2">
                          ${plan.renewalPrice} / {t("Year when you renew", "سنوياً عند التجديد")}
                        </p>
                      </div>

                      <ul className="space-y-3 flex-1">
                        {plan.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{t(feature.en, feature.ar)}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <Button
                        className="w-full"
                        size="lg"
                        variant={plan.isPopular ? "default" : "outline"}
                        data-testid={`button-request-plan-${plan.id}`}
                      >
                        {t("Request Plan", "طلب الباقة")}
                      </Button>
                    </Card>
                  </Card3D>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[40vh]">
              <p className="text-muted-foreground">
                {t("No pricing plans available", "لا توجد خطط أسعار متاحة")}
              </p>
            </div>
          )}
        </div>
      </section>
      {/* Comparison Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              {t("All Plans Include", "جميع الخطط تشمل")}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: { en: "Professional Support", ar: "دعم احترافي" },
                description: {
                  en: "24/7 technical support and assistance",
                  ar: "دعم تقني ومساعدة على مدار الساعة"
                },
              },
              {
                title: { en: "SSL Certificate", ar: "شهادة SSL" },
                description: {
                  en: "Free SSL certificate for secure connections",
                  ar: "شهادة SSL مجانية للاتصالات الآمنة"
                },
              },
              {
                title: { en: "Training", ar: "التدريب" },
                description: {
                  en: "Content management system training included",
                  ar: "يشمل التدريب على نظام إدارة المحتوى"
                },
              },
            ].map((feature, index) => (
              <AnimatedCard key={index} index={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="perspective-1000"
                >
                  <Card className="p-6 text-center hover-elevate">
                    <h3 className="text-lg font-semibold mb-2">
                      {t(feature.title.en, feature.title.ar)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(feature.description.en, feature.description.ar)}
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
