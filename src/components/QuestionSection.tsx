import { motion } from "framer-motion";
import { useState, useCallback } from "react";

interface QuestionSectionProps {
  onYes: () => void;
}

const noMessages = [
  "Nice try 😏",
  "That button is broken",
  "You can't escape love",
  "Hmm... try again 😂",
  "Wrong button! 🙈",
  "Are you sure? 💔",
  "The heart wants what it wants",
  "Nope, not happening 😌",
];

const QuestionSection = ({ onYes }: QuestionSectionProps) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noMessage, setNoMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  const handleNoHover = useCallback(() => {
    const maxX = 120;
    const maxY = 100;
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    
    setNoPosition({ x: newX, y: newY });
    setNoMessage(noMessages[messageIndex % noMessages.length]);
    setMessageIndex((prev) => prev + 1);

    // Vibrate on supported devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, [messageIndex]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-center mb-12"
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-7xl block mb-6"
        >
          🌹
        </motion.span>

        <h2 className="text-3xl font-bold text-foreground mb-2">
          Will you be my
        </h2>
        <motion.h3
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl font-bold gradient-text font-romantic"
        >
          Valentine
        </motion.h3>
        <p className="text-xl text-muted-foreground mt-2">on Feb 14? 💕</p>
      </motion.div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-6 relative min-h-[160px] w-full max-w-xs">
        {/* YES Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 20px hsl(340 75% 60% / 0.3)",
              "0 0 40px hsl(340 75% 60% / 0.5)",
              "0 0 20px hsl(340 75% 60% / 0.3)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={onYes}
          className="valentine-button text-2xl px-16 py-5 z-10"
        >
          ❤️ YES
        </motion.button>

        {/* NO Button - Runs Away */}
        <motion.button
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onHoverStart={handleNoHover}
          onTouchStart={handleNoHover}
          className="bg-secondary text-secondary-foreground rounded-full px-12 py-4 font-semibold text-lg shadow-soft absolute bottom-0"
        >
          🙈 NO
        </motion.button>
      </div>

      {/* Teasing message */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: noMessage ? 1 : 0,
          height: noMessage ? "auto" : 0
        }}
        className="mt-8"
      >
        <div className="valentine-card py-3 px-6">
          <p className="text-foreground font-medium text-center">{noMessage}</p>
        </div>
      </motion.div>
    </section>
  );
};

export default QuestionSection;
