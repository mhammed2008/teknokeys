import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { Card3D } from "@/components/3d-card";
import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import { ElectronicBackground } from "@/components/electronic-background";
import type { Blog } from "@shared/schema";

export default function Blogs() {
  const { t } = useLanguage();

  const { data: blogs = [], isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
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
              {t("Our ", "مدونتنا ")}
              <span className="gradient-text">{t("Blog", "")}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t(
                "Stay updated with the latest insights, news, and articles from our team",
                "ابق على اطلاع بأحدث الرؤى والأخبار والمقالات من فريقنا"
              )}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Blog */}
      {blogs[0] && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <Card3D className="w-full max-w-[90%] mx-auto">
                <motion.a
                  href={blogs[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="overflow-hidden hover-elevate">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="aspect-video md:aspect-auto relative overflow-hidden">
                        <motion.img
                          src={blogs[0].image}
                          alt={blogs[0].title.en}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 md:block hidden" />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-primary mb-4">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{t("Featured Article", "مقال مميز")}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                          {t(blogs[0].title.en, blogs[0].title.ar)}
                        </h2>
                        <p className="text-muted-foreground mb-6">
                          {t(blogs[0].excerpt.en, blogs[0].excerpt.ar)}
                        </p>
                        <Button className="w-fit group" data-testid="button-read-featured">
                          {t("Read Article", "اقرأ المقال")}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.a>
              </Card3D>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.slice(1).map((blog, index) => (
              <AnimatedCard key={blog.id} index={index} className="h-full">
                <Card3D className="h-full">
                  <motion.a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring" }}
                  >
                    <Card className="overflow-hidden h-full hover-elevate group ml-[8px] mr-[8px] mt-[0px] mb-[8px]">
                      <div className="relative aspect-video overflow-hidden">
                        <motion.img
                          src={blog.image}
                          alt={blog.title.en}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
                          >
                            <ExternalLink className="w-5 h-5 text-primary-foreground" />
                          </motion.div>
                        </motion.div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {t(blog.title.en, blog.title.ar)}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {t(blog.excerpt.en, blog.excerpt.ar)}
                        </p>
                        <div className="mt-4 flex items-center text-primary text-sm font-medium">
                          {t("Read More", "اقرأ المزيد")}
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </motion.a>
                </Card3D>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
