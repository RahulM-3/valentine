import { useState, useRef } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import MemorySection from "@/components/MemorySection";
import ReasonsSection from "@/components/ReasonsSection";
import HeartGame from "@/components/HeartGame";
import QuestionSection from "@/components/QuestionSection";
import CelebrationSection from "@/components/CelebrationSection";
import FinalMessage from "@/components/FinalMessage";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    const sections = containerRef.current?.children;
    if (sections && sections[sectionIndex]) {
      sections[sectionIndex].scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStart = () => scrollToSection(1);
  const handleMemoryContinue = () => scrollToSection(2);
  const handleReasonsContinue = () => scrollToSection(3);
  const handleGameComplete = () => scrollToSection(4);
  const handleYes = () => {
    setShowCelebration(true);
    setTimeout(() => scrollToSection(5), 100);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Floating hearts background */}
      <FloatingHearts />

      {/* Main content */}
      <div ref={containerRef} className="relative z-10">
        {/* Hero */}
        <HeroSection onStart={handleStart} />

        {/* Memory cards */}
        <MemorySection onContinue={handleMemoryContinue} />

        {/* Reasons */}
        <ReasonsSection 
          onContinue={handleReasonsContinue} 
          isVisible={currentSection >= 2} 
        />

        {/* Heart game */}
        <HeartGame onComplete={handleGameComplete} />

        {/* Big question */}
        {!showCelebration && <QuestionSection onYes={handleYes} />}

        {/* Celebration */}
        {showCelebration && (
          <>
            <CelebrationSection />
            <FinalMessage />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
