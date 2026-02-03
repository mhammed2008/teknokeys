import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/language-context";
import { Card3D } from "@/components/3d-card";
import { TypingText } from "@/components/typing-text";
import { AnimatedSection, AnimatedCard } from "@/components/animated-section";
import { ElectronicBackground } from "@/components/electronic-background";
import { apiRequest } from "@/lib/queryClient";
import { contactFormSchema, type ContactForm } from "@shared/schema";

const contactInfo = [
  {
    icon: Mail,
    label: { en: "Email", ar: "البريد الإلكتروني" },
    value: "info@teknokeys.com",
    href: "mailto:info@teknokeys.com",
  },
  {
    icon: Phone,
    label: { en: "Phone", ar: "الهاتف" },
    value: "+967 777 575 679",
    href: "tel:+967777575679",
  },
  {
    icon: MapPin,
    label: { en: "Location", ar: "الموقع" },
    value: { en: "Yemen, Sana'a", ar: "اليمن، صنعاء" },
    href: "#",
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: t("Message Sent!", "تم إرسال الرسالة!"),
        description: t(
          "We'll get back to you as soon as possible.",
          "سنتواصل معك في أقرب وقت ممكن."
        ),
      });
    },
    onError: () => {
      toast({
        title: t("Error", "خطأ"),
        description: t(
          "Something went wrong. Please try again.",
          "حدث خطأ ما. يرجى المحاولة مرة أخرى."
        ),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-12 relative overflow-hidden">
        <ElectronicBackground className="opacity-25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {t("Get In ", "تواصل ")}
              <span className="gradient-text">{t("Touch", "معنا")}</span>
            </h1>
            <div className="text-xl text-muted-foreground max-w-3xl mx-auto h-16">
              <TypingText
                text={t(
                  "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
                  "نحب أن نسمع منك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن."
                )}
                speed={30}
                delay={500}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <AnimatedSection>
                <h2 className="text-2xl font-bold mb-6">
                  {t("Contact Information", "معلومات الاتصال")}
                </h2>
              </AnimatedSection>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <AnimatedCard key={index} index={index}>
                    <Card3D>
                      <a
                        href={info.href}
                        className="block"
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        <Card className="p-6 hover-elevate">
                          <div className="flex items-center gap-4">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                            >
                              <info.icon className="w-6 h-6 text-primary" />
                            </motion.div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {t(info.label.en, info.label.ar)}
                              </p>
                              <p className="font-medium">
                                {typeof info.value === "string"
                                  ? info.value
                                  : t(info.value.en, info.value.ar)}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </a>
                    </Card3D>
                  </AnimatedCard>
                ))}
              </div>

              <AnimatedSection delay={0.4}>
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                  <h3 className="font-semibold mb-4">
                    {t("Working Hours", "ساعات العمل")}
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      {t("Saturday - Thursday", "السبت - الخميس")}: 9:00 AM - 6:00 PM
                    </p>
                    <p>
                      {t("Friday", "الجمعة")}: {t("Closed", "مغلق")}
                    </p>
                  </div>
                </Card>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <AnimatedSection delay={0.2}>
              <Card className="p-8 h-full relative" style={{ transformStyle: "flat" }}>
                  <h2 className="text-2xl font-bold mb-6">
                    {t("Send Message", "إرسال رسالة")}
                  </h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center h-64 text-center"
                      role="alert"
                      aria-live="polite"
                      data-testid="contact-success-message"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
                      >
                        <Check className="w-10 h-10 text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2" data-testid="text-thank-you">
                        {t("Thank You!", "شكراً لك!")}
                      </h3>
                      <p className="text-muted-foreground" data-testid="text-success-message">
                        {t(
                          "Your message has been sent successfully. We will get back to you soon.",
                          "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً."
                        )}
                      </p>
                      <Button
                        className="mt-6"
                        onClick={() => setIsSubmitted(false)}
                        data-testid="button-send-another"
                      >
                        {t("Send Another Message", "إرسال رسالة أخرى")}
                      </Button>
                    </motion.div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Name", "الاسم")}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t("Your name", "اسمك")}
                                  {...field}
                                  data-testid="input-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Email", "البريد الإلكتروني")}</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder={t("your@email.com", "بريدك@الإلكتروني.com")}
                                  {...field}
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Message", "الرسالة")}</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={t(
                                    "Tell us about your project...",
                                    "أخبرنا عن مشروعك..."
                                  )}
                                  rows={5}
                                  {...field}
                                  data-testid="input-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full"
                          disabled={mutation.isPending}
                          data-testid="button-submit-contact"
                        >
                          {mutation.isPending ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              {t("Send Message", "إرسال الرسالة")}
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
