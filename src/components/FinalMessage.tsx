import { motion } from "framer-motion";

const FinalMessage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-sm"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-6xl mb-8"
        >
          💌
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="valentine-card mb-8"
        >
          <p className="text-lg text-foreground leading-relaxed mb-4">
            Thank you for making my life brighter every single day.
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            Can't wait to celebrate us 💖
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-2xl font-romantic gradient-text mb-2">
            — Your Valentine
          </p>
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl inline-block"
          >
            🥰
          </motion.span>
        </motion.div>

        {/* Decorative hearts */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex justify-center gap-6 text-3xl opacity-60"
        >
          {["💕", "🌹", "💖", "🌹", "💕"].map((emoji, index) => (
            <motion.span
              key={index}
              animate={{ y: [0, -8, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.3 
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalMessage;
