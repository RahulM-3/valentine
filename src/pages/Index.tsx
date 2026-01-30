import { useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import QuestionSection from "@/components/QuestionSection";
import CelebrationSection from "@/components/CelebrationSection";

const Index = () => {
  const [showCelebration, setShowCelebration] = useState(false);

  const handleYes = () => {
    setShowCelebration(true);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Floating hearts and images background */}
      <FloatingHearts />

      {/* Main content */}
      <div className="relative z-10">
        {!showCelebration ? (
          <QuestionSection onYes={handleYes} />
        ) : (
          <>
            <CelebrationSection />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
