import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Shield, Users, Award, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { Card3D } from "@/components/3d-card";
import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import { PartnersSlider } from "@/components/partners-slider";
import { ElectronicBackground } from "@/components/electronic-background";
import type { Partner, Testimonial, CompanyStats } from "@shared/schema";
import teknokeysLogo from "@assets/WHITE@2x_1769523445603.png";

const values = [
  {
    icon: Shield,
    title: { en: "Security First", ar: "الأمان أولاً" },
    description: {
      en: "We prioritize the security of your digital assets above all else",
      ar: "نضع أمان أصولك الرقمية في المقام الأول"
    },
  },
  {
    icon: Users,
    title: { en: "Expert Team", ar: "فريق خبير" },
    description: {
      en: "Our team consists of highly skilled professionals with years of experience",
      ar: "يتكون فريقنا من محترفين ذوي مهارات عالية وسنوات من الخبرة"
    },
  },
  {
    icon: Award,
    title: { en: "Quality Guaranteed", ar: "جودة مضمونة" },
    description: {
      en: "We deliver excellence in every project we undertake",
      ar: "نقدم التميز في كل مشروع نتولاه"
    },
  },
  {
    icon: Target,
    title: { en: "Goal Oriented", ar: "موجهون نحو الهدف" },
    description: {
      en: "We focus on achieving your business objectives efficiently",
      ar: "نركز على تحقيق أهداف عملك بكفاءة"
    },
  },
];

export default function About() {
  const { t } = useLanguage();

  const { data: partners = [] } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: stats } = useQuery<CompanyStats>({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="min-h-screen pt-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <ElectronicBackground className="opacity-25" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0"
        >
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, rotateX: 45, y: 50 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center perspective-2000"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              {t("About ", "عن ")}
              <span className="gradient-text">TeknoKeys</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              {t(
                "Teknokeys was established in 2013 in Yemen to provide IT solutions, Graphic Design, Consultation, and security assessments. We are experienced players in the IT industry with ISO27001 expertise.",
                "تأسست تكنوكيز في عام 2013 في اليمن لتقديم حلول تقنية المعلومات والتصميم الجرافيكي والاستشارات وتقييمات الأمان. نحن خبراء في صناعة تقنية المعلومات مع خبرة ISO27001."
              )}
            </motion.p>
          </motion.div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: stats?.cybersecurityProjects || "11+", label: { en: "Cybersecurity & Consultation Projects", ar: "مشاريع الأمن السيبراني والاستشارات" } },
              { value: stats?.mobileWebProjects || "13+", label: { en: "Mobile & Web Projects", ar: "مشاريع الموبايل والويب" } },
              { value: stats?.serviceGuarantee || "3%", label: { en: "Service Guarantee", ar: "ضمان الخدمة" } },
              { value: stats?.totalDevelopment || "10+", label: { en: "Development Projects", ar: "مشاريع التطوير" } },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="perspective-1000 h-full"
              >
                <Card3D className="text-center h-full">
                  <Card className="p-6 ml-[16px] mr-[16px] h-full flex flex-col justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                      className="text-4xl font-bold gradient-text mb-2"
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-muted-foreground text-sm">
                      {t(stat.label.en, stat.label.ar)}
                    </p>
                  </Card>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("Our Values", "قيمنا")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "The principles that guide everything we do",
                "المبادئ التي توجه كل ما نفعله"
              )}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedCard key={index} index={index}>
                <Card3D className="h-full">
                  <Card className="p-6 h-full text-center hover-elevate ml-[8px] mr-[8px]">
                    <motion.div
                      initial={{ rotateY: 0 }}
                      whileHover={{ rotateY: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    >
                      <value.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t(value.title.en, value.title.ar)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(value.description.en, value.description.ar)}
                    </p>
                  </Card>
                </Card3D>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <Card3D>
                <div className="relative aspect-square rounded-2xl overflow-hidden ml-[28px] mr-[28px] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(90deg, transparent 49%, rgba(234, 179, 8, 0.1) 50%, transparent 51%),
                        linear-gradient(0deg, transparent 49%, rgba(234, 179, 8, 0.1) 50%, transparent 51%)
                      `,
                      backgroundSize: '30px 30px',
                    }}
                  />
                  <motion.div
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 20% 30%, rgba(234, 179, 8, 0.15) 0%, transparent 40%),
                        radial-gradient(circle at 80% 70%, rgba(234, 179, 8, 0.1) 0%, transparent 40%)
                      `,
                    }}
                  />
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M10 10 L30 10 L30 30 M50 10 L50 50 L70 50 M90 30 L70 30 L70 70 L90 70" stroke="#EAB308" strokeWidth="1" fill="none"/>
                        <circle cx="30" cy="30" r="3" fill="#EAB308"/>
                        <circle cx="50" cy="50" r="3" fill="#EAB308"/>
                        <circle cx="70" cy="70" r="3" fill="#EAB308"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={teknokeysLogo} 
                      alt="TeknoKeys Logo"
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                </div>
              </Card3D>
            </AnimatedSection>

            <div className="space-y-8">
              <AnimatedSection>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  {t("Why Choose TeknoKeys?", "لماذا تختار تكنوكيز؟")}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("Expertise in Information Security", "خبرة في أمن المعلومات")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(
                      "We have extensive experience in information security and penetration testing. We have a team specialized in hunting down malicious attacks, dealing with them quickly and effectively.",
                      "لدينا خبرة واسعة في مجال أمن المعلومات واختبار الاختراق. لدينا فريق متخصص في مطاردة الهجمات الخبيثة والتعامل معها بسرعة وفعالية."
                    )}
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("Advantages of Choosing Us", "مزايا اختيارنا")}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {t("Enhanced security systems", "تحسين أنظمة الأمان")}
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {t("Swift response to attacks", "استجابة سريعة للهجمات")}
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {t("Effective tools and techniques", "أدوات وتقنيات فعالة")}
                    </motion.li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("Testimonials", "شهادات العملاء")}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard key={testimonial.id} index={index} className="h-full">
                <Card3D className="h-full">
                  <Card className="p-6 h-full flex flex-col">
                    <p className="text-muted-foreground italic text-sm flex-1">
                      "{t(testimonial.content.en, testimonial.content.ar)}"
                    </p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-semibold text-sm">
                        {t(testimonial.name.en, testimonial.name.ar)}
                      </h4>
                      <p className="text-xs text-primary">
                        {t(testimonial.company.en, testimonial.company.ar)}
                      </p>
                    </div>
                  </Card>
                </Card3D>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      {/* Partners */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("Our Partners", "شركاؤنا")}
            </h2>
          </AnimatedSection>
          <PartnersSlider partners={partners} direction="left" />
        </div>
      </section>
    </div>
  );
}
