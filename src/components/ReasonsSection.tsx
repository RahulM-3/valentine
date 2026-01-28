import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ReasonsSectionProps {
  onContinue: () => void;
  isVisible: boolean;
}

const reasons = [
  "I promise unlimited memes",
  "Free emotional support forever",
  "I'll share my fries 🍟",
  "You already stole my heart anyway",
  "Certified boyfriend material (mostly)",
];

const ReasonsSection = ({ onContinue, isVisible }: ReasonsSectionProps) => {
  const [visibleReasons, setVisibleReasons] = useState<number[]>([]);

  useEffect(() => {
    if (isVisible && visibleReasons.length === 0) {
      reasons.forEach((_, index) => {
        setTimeout(() => {
          setVisibleReasons((prev) => [...prev, index]);
        }, index * 400);
      });
    }
  }, [isVisible, visibleReasons.length]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-foreground mb-2 text-center"
      >
        Reasons why you should
      </motion.h2>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold gradient-text mb-8 text-center"
      >
        be my Valentine 💘
      </motion.h3>

      <div className="w-full max-w-sm space-y-4 mb-10">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={
              visibleReasons.includes(index)
                ? { opacity: 1, x: 0, scale: 1 }
                : {}
            }
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            className="valentine-card flex items-center gap-4 py-4"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={visibleReasons.includes(index) ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
              className="text-2xl text-primary"
            >
              ✅
            </motion.span>
            <span className="text-foreground font-medium">{reason}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={visibleReasons.length === reasons.length ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        className="valentine-button"
      >
        👉 One more thing...
      </motion.button>
    </section>
  );
};

export default ReasonsSection;
