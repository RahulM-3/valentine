import { motion } from "framer-motion";
import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import MovieTicket from "./MovieTicket";

const CelebrationSection = () => {
  const fireConfetti = useCallback(() => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const colors = ["#EC4899", "#F472B6", "#F9A8D4", "#FDF2F8", "#EF4444"];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
    });

    // Continuous confetti
    frame();

    // Hearts burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        shapes: ["circle"],
        colors: ["#EC4899", "#EF4444"],
        origin: { y: 0.7 },
      });
    }, 500);
  }, []);

  useEffect(() => {
    fireConfetti();

    // Vibrate celebration
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }
  }, [fireConfetti]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold gradient-text mb-4 font-romantic"
        >
          Yesss Mommyyyy!!!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-foreground mb-2"
        >
          Best decision ever 💕
        </motion.p>

        {/* Movie Ticket */}
        <MovieTicket />

        {/* Animated hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-4 text-4xl"
        >
          {["💖", "💕", "💗", "💓", "💝"].map((heart, index) => (
            <motion.span
              key={index}
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: index * 0.2 
              }}
            >
              {heart}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CelebrationSection;
