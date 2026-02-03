import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

interface Partner {
  id: string;
  name: string;
  logo: string;
}

interface PartnersSliderProps {
  partners: Partner[];
  title?: { en: string; ar: string };
  direction?: "left" | "right";
}

export function PartnersSlider({
  partners,
  title,
  direction = "left",
}: PartnersSliderProps) {
  const { t } = useLanguage();
  
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="overflow-hidden py-8">
      {title && (
        <h3 className="text-2xl font-bold text-center mb-8">
          {t(title.en, title.ar)}
        </h3>
      )}
      
      <motion.div
        className="flex gap-12"
        animate={{
          x: direction === "left" ? [0, -100 * partners.length] : [-100 * partners.length, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: partners.length * 3,
            ease: "linear",
          },
        }}
      >
        {duplicatedPartners.map((partner, index) => (
          <motion.div
            key={`${partner.id}-${index}`}
            whileHover={{ scale: 1.1 }}
            className="flex-shrink-0 w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
