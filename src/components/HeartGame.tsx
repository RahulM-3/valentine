import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface HeartGameProps {
  onComplete: () => void;
}

const HeartGame = ({ onComplete }: HeartGameProps) => {
  const [taps, setTaps] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleTap = () => {
    if (showMessage) return;

    const newTaps = taps + 1;
    setTaps(newTaps);

    // Add floating heart
    const newHeart = {
      id: Date.now(),
      x: Math.random() * 60 - 30,
      y: Math.random() * 20 - 10,
    };
    setHearts((prev) => [...prev, newHeart]);

    // Remove heart after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);

    // Vibrate on supported devices
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    if (newTaps >= 15) {
      setShowMessage(true);
      setTimeout(() => {
        onComplete();
      }, 2500);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-foreground mb-4 text-center"
      >
        Quick game! 🎮
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground text-center mb-8"
      >
        Tap the heart as fast as you can 💓
      </motion.p>

      <div className="relative mb-8">
        {/* Floating hearts */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.span
              key={heart.id}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.5, x: heart.x, y: -80 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute text-3xl pointer-events-none"
              style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            >
              💖
            </motion.span>
          ))}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleTap}
          disabled={showMessage}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-valentine-pink to-valentine-rose flex items-center justify-center text-6xl shadow-glow"
        >
          <motion.span
            animate={showMessage ? {} : { scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            ❤️
          </motion.span>
        </motion.button>
      </div>

      {/* Tap counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="valentine-card px-8 py-4 mb-8"
      >
        <span className="text-2xl font-bold text-foreground">{taps}</span>
        <span className="text-muted-foreground ml-2">/ 15 taps</span>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-xs h-3 bg-secondary rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-valentine-pink to-valentine-rose rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(taps / 15) * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="valentine-card text-center"
          >
            <p className="text-xl font-bold text-foreground">
              Okay okay… you clearly love me 😌
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeartGame;
