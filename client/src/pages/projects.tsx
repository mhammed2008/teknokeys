import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { SiGoogleplay, SiApple } from "react-icons/si";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { Card3D } from "@/components/3d-card";
import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import { ElectronicBackground } from "@/components/electronic-background";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        (prev + 1) % selectedProject.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        (prev - 1 + selectedProject.images.length) % selectedProject.images.length
      );
    }
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
        <ElectronicBackground className="opacity-25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {t("Our ", "مشاريعنا ")}
              <span className="gradient-text">{t("Projects", "")}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t(
                "Explore our portfolio of successful projects delivered to clients across various industries",
                "استكشف مجموعة مشاريعنا الناجحة المقدمة للعملاء في مختلف الصناعات"
              )}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[90%] mx-auto">
            {projects.map((project, index) => (
              <AnimatedCard key={project.id} index={index} className="h-full">
                <Card3D className="h-full">
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring" }}
                  >
                    <Card
                      className="overflow-hidden h-full cursor-pointer hover-elevate pl-0 pr-0"
                      onClick={() => {
                        setSelectedProject(project);
                        setCurrentImageIndex(0);
                      }}
                      data-testid={`card-project-${project.id}`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <motion.img
                          src={project.images[0]}
                          alt={project.title.en}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-semibold mb-1">
                          {t(project.title.en, project.title.ar)}
                        </h3>
                        <p className="text-muted-foreground text-xs line-clamp-2">
                          {t(project.description.en, project.description.ar)}
                        </p>

                        <div className="flex gap-2 mt-4">
                          {project.websiteUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={project.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          {project.playStoreUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={project.playStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <SiGoogleplay className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          {project.appStoreUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={project.appStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <SiApple className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Card3D>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: -20 }}
              className="max-w-4xl w-full perspective-2000"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={selectedProject.images[currentImageIndex]}
                      alt={selectedProject.title.en}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {selectedProject.images.length > 1 && (
                    <>
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        onClick={prevImage}
                        data-testid="button-modal-prev"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        onClick={nextImage}
                        data-testid="button-modal-next"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </>
                  )}

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-primary w-6"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    {t(selectedProject.title.en, selectedProject.title.ar)}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {t(selectedProject.description.en, selectedProject.description.ar)}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {selectedProject.websiteUrl && (
                      <Button asChild>
                        <a
                          href={selectedProject.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t("Visit Website", "زيارة الموقع")}
                        </a>
                      </Button>
                    )}
                    {selectedProject.playStoreUrl && (
                      <Button variant="outline" asChild>
                        <a
                          href={selectedProject.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SiGoogleplay className="w-4 h-4 mr-2" />
                          Google Play
                        </a>
                      </Button>
                    )}
                    {selectedProject.appStoreUrl && (
                      <Button variant="outline" asChild>
                        <a
                          href={selectedProject.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SiApple className="w-4 h-4 mr-2" />
                          App Store
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedProject(null)}
                      data-testid="button-modal-close"
                    >
                      {t("Close", "إغلاق")}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
