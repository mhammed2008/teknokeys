import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Smartphone, Shield, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { Card3D } from "@/components/3d-card";
import { Canvas3DPhone } from "@/components/canvas-3d";
import { ElectronicBackground } from "@/components/electronic-background";
import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import { PartnersSlider } from "@/components/partners-slider";
import { Link } from "wouter";
import type { Project, Service, Partner, Testimonial, CompanyStats } from "@shared/schema";

const serviceIcons: Record<string, any> = {
  "1": Shield,        // Cybersecurity & Compliance
  "2": GraduationCap, // Training & Capacity Building
  "6": Briefcase,     // Business Solutions
  "7": Smartphone,    // Digital Development
};

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: partners = [] } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
  });

  const { data: clients = [] } = useQuery<Partner[]>({
    queryKey: ["/api/clients"],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: stats } = useQuery<CompanyStats>({
    queryKey: ["/api/stats"],
  });

  const featuredProject = projects[0];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen py-20 lg:py-0 flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
        
        {/* Interactive Electronic Background */}
        <ElectronicBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-start order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="text-xs sm:text-sm font-medium text-primary">
                  {t("Top IT Company in Yemen & KSA", "الشركة الرائدة في اليمن والسعودية")}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                <span className="gradient-text">TeknoKeys</span>
                <br />
                <span className="text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
                  {t(
                    "Digital Solutions for Tomorrow",
                    "حلول رقمية للمستقبل"
                  )}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-sm sm:text-base lg:text-lg text-white/80 max-w-xl mx-auto lg:mx-0"
              >
                {t(
                  "We provide IT solutions, Graphic Design, Consultation, and security assessments. Our best-of-breed approach allows us to maximize productivity and keep risks to an absolute minimum.",
                  "نقدم حلول تقنية المعلومات والتصميم الجرافيكي والاستشارات وتقييمات الأمان. يتيح لنا نهجنا المتميز تحقيق أقصى إنتاجية مع الحفاظ على الحد الأدنى من المخاطر."
                )}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <Link href="/services">
                  <Button size="lg" className="group" data-testid="button-explore-services">
                    {t("Explore Services", "استكشف الخدمات")}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="ml-2"
                    >
                      →
                    </motion.span>
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-contact-us">
                    {t("Contact Us", "تواصل معنا")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-[240px] sm:h-[300px] lg:h-[600px] xl:h-[700px] 2xl:h-[750px] order-1 lg:order-2 w-[calc(100%+2rem)] -mx-4 sm:w-full sm:mx-0 overflow-visible"
              data-testid="hero-3d-phone"
            >
              <Canvas3DPhone className="w-full h-full" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-8 h-8 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.section>
      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-card relative overflow-hidden">
        <ElectronicBackground className="opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { value: stats?.cybersecurityProjects || "11+", label: { en: "Cybersecurity Projects", ar: "مشاريع الأمن السيبراني" } },
              { value: stats?.mobileWebProjects || "13+", label: { en: "Mobile & Web Projects", ar: "مشاريع الموبايل والويب" } },
              { value: stats?.serviceGuarantee || "3%", label: { en: "Service Guarantee", ar: "ضمان الخدمة" } },
              { value: stats?.totalDevelopment || "10+", label: { en: "Mobile Applications", ar: "تطبيقات الموبايل" } },
            ].map((stat, index) => (
              <AnimatedCard key={index} index={index}>
                <Card3D className="text-center">
                  <Card className="p-3 sm:p-6 bg-background/50 mt-[20px] mb-[20px] ml-[16px] mr-[16px]">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      className="text-2xl sm:text-4xl font-bold gradient-text mb-1 sm:mb-2"
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {t(stat.label.en, stat.label.ar)}
                    </p>
                  </Card>
                </Card3D>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-12 sm:py-20 relative overflow-hidden">
        <ElectronicBackground className="opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {t("Our Services", "خدماتنا")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              {t(
                "Comprehensive IT solutions tailored to your business needs",
                "حلول تقنية شاملة مصممة خصيصاً لاحتياجات عملك"
              )}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.slice(0, 4).map((service, index) => {
              const Icon = serviceIcons[service.id] || Shield;

              return (
                <AnimatedCard key={service.id} index={index}>
                  <Card3D>
                    <Card className="p-5 sm:p-6 flex flex-col hover-elevate my-3 sm:my-0 mx-2 sm:mx-0 ml-[20px] mr-[20px]">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                      >
                        <Icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <h3 className="text-lg font-semibold mb-2 ml-[20px] mr-[20px]">
                        {t(service.title.en, service.title.ar)}
                      </h3>
                      <p className="text-muted-foreground text-sm flex-1">
                        {t(service.description.en, service.description.ar)}
                      </p>
                    </Card>
                  </Card3D>
                </AnimatedCard>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-12" delay={0.4}>
            <Link href="/services">
              <Button variant="outline" size="lg" data-testid="button-view-all-services">
                {t("View All Services", "عرض جميع الخدمات")}
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
      {/* Projects Section */}
      <section className="py-12 sm:py-20 bg-card relative overflow-hidden">
        <ElectronicBackground className="opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {t("Featured Projects", "مشاريع مميزة")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              {t(
                "Discover our latest work and successful project deliveries",
                "اكتشف أحدث أعمالنا والمشاريع المنجزة بنجاح"
              )}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
            {projects.slice(0, 6).map((project, index) => (
              <AnimatedCard key={project.id} index={index}>
                <Card3D>
                  <Card className="overflow-hidden hover-elevate group my-3 sm:my-0 ml-[20px] mr-[20px] pt-[0px] pb-[0px] mt-[20px] mb-[20px]">
                    <div className="relative aspect-video overflow-hidden">
                      <motion.img
                        src={project.images[0]}
                        alt={project.title.en}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">
                        {t(project.title.en, project.title.ar)}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {t(project.description.en, project.description.ar)}
                      </p>
                    </div>
                  </Card>
                </Card3D>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12" delay={0.6}>
            <Link href="/projects">
              <Button size="lg" className="mt-[20px] mb-[20px]" data-testid="button-view-all-projects">
                {t("View All Projects", "عرض جميع المشاريع")}
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-12 sm:py-20 relative overflow-hidden">
        <ElectronicBackground className="opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {t("What Our Clients Say", "ماذا يقول عملاؤنا")}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <AnimatedCard key={testimonial.id} index={index} className="h-full">
                <Card3D className="h-full">
                  <Card className="p-4 sm:p-6 h-full my-3 sm:my-0 ml-[20px] mr-[20px] mt-[12px] mb-[12px]">
                    <p className="text-muted-foreground italic mb-4 sm:mb-6 text-sm sm:text-base">
                      "{t(testimonial.content.en, testimonial.content.ar)}"
                    </p>
                    <div className="mt-auto">
                      <h4 className="font-semibold text-sm sm:text-base">
                        {t(testimonial.name.en, testimonial.name.ar)}
                      </h4>
                      <p className="text-xs sm:text-sm text-primary">
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
      {/* Partners & Clients Slider */}
      <section className="py-12 sm:py-20 bg-card relative overflow-hidden">
        <ElectronicBackground className="opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {t("Our Partners", "شركاؤنا")}
            </h2>
          </AnimatedSection>
          <PartnersSlider
            partners={partners}
            direction="left"
          />

          <AnimatedSection className="text-center mb-6 sm:mb-8 mt-10 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {t("Our Clients", "عملاؤنا")}
            </h2>
          </AnimatedSection>
          <PartnersSlider
            partners={clients}
            direction="right"
          />
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-12 sm:py-20 relative overflow-hidden">
        <ElectronicBackground className="opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Card className="p-6 sm:p-12 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20 my-3 sm:my-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                {t("Ready to Start Your Project?", "مستعد لبدء مشروعك؟")}
              </h2>
              <p className="text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
                {t(
                  "Let's work together to bring your ideas to life. Contact us today for a free consultation.",
                  "لنعمل معاً لتحويل أفكارك إلى حقيقة. تواصل معنا اليوم للحصول على استشارة مجانية."
                )}
              </p>
              <Link href="/contact">
                <Button size="lg" className="glow-primary" data-testid="button-get-started">
                  {t("Get Started", "ابدأ الآن")}
                </Button>
              </Link>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
