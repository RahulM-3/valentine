import { motion } from "framer-motion";
import { useState } from "react";

interface MemorySectionProps {
  onContinue: () => void;
}

const memories = [
  { emoji: "👀", text: "Remember our first chat?" },
  { emoji: "😂", text: "All those laughs we shared" },
  { emoji: "😍", text: "Your smile >>> everything" },
  { emoji: "🤡", text: "Me pretending I'm cool around you" },
];

const MemorySection = ({ onContinue }: MemorySectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    if (currentIndex < memories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-foreground mb-8 text-center"
      >
        Our little moments 💫
      </motion.h2>

      <div className="relative w-full max-w-sm h-64 mb-8">
        {memories.map((memory, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 0.8,
              x: index === currentIndex ? 0 : index < currentIndex ? -100 : 100,
              zIndex: index === currentIndex ? 10 : 0,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            className="absolute inset-0 valentine-card flex flex-col items-center justify-center text-center"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              {memory.emoji}
            </motion.span>
            <p className="text-xl font-semibold text-foreground">{memory.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="flex gap-2 mb-6">
        {memories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-secondary"
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevCard}
          disabled={currentIndex === 0}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
            currentIndex === 0
              ? "bg-muted text-muted-foreground opacity-50"
              : "bg-secondary text-foreground shadow-soft"
          }`}
        >
          ←
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextCard}
          disabled={currentIndex === memories.length - 1}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
            currentIndex === memories.length - 1
              ? "bg-muted text-muted-foreground opacity-50"
              : "bg-secondary text-foreground shadow-soft"
          }`}
        >
          →
        </motion.button>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        className="valentine-button"
      >
        👉 Continue
      </motion.button>
    </section>
  );
};

export default MemorySection;
