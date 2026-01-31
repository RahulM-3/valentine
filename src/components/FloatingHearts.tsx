import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingItem {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  type: "heart" | "image";
  imageIndex?: number;
}

// Base path for GitHub Pages deployment
const basePath = import.meta.env.BASE_URL;

// Placeholder images - replace these with your actual photos
const coupleImages = [
  `${basePath}pic (1).jpg`,
  `${basePath}pic (2).jpg`,
  `${basePath}pic (3).jpg`,
  `${basePath}pic (4).jpg`,
  `${basePath}pic (5).jpg`,
  `${basePath}pic (6).jpg`,
  `${basePath}pic (7).jpg`,
  `${basePath}pic (8).jpg`,
  `${basePath}pic (9).jpg`,
  `${basePath}pic (10).jpg`,
  `${basePath}pic (11).jpg`
];

const FloatingHearts = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const generateItems = () => {
      const newItems: FloatingItem[] = [];
      
      // Add hearts
      for (let i = 0; i < 12; i++) {
        newItems.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 8 + Math.random() * 6,
          size: 20 + Math.random() * 20,
          type: "heart",
        });
      }
      
      // Add floating images
      for (let i = 0; i < coupleImages.length-1; i++) {
        newItems.push({
          id: 100 + i,
          x: 10 + Math.random() * 80,
          delay: Math.random() * 20,
          duration: 12 + Math.random() * 8,
          size: 60 + Math.random() * 40,
          type: "image",
          imageIndex: i % coupleImages.length,
        });
      }
      
      setItems(newItems);
    };

    generateItems();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            bottom: -120,
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, Math.sin(item.id) * 60],
            rotate: item.type === "heart" ? [0, 360] : [-15, 15, -15],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.type === "heart" ? (
            <span 
              className="text-valentine-pink opacity-50"
              style={{ fontSize: item.size }}
            >
              💕
            </span>
          ) : (
            <div
              className="rounded-2xl overflow-hidden shadow-card border-4 border-white/80 bg-white"
              style={{ 
                width: item.size, 
                height: item.size,
              }}
            >
              <img
                src={coupleImages[item.imageIndex || 0]}
                alt="Memory"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
