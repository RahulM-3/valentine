import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const MovieTicket = () => {
  const ticketRef = useRef<HTMLDivElement>(null);

  // Placeholder data - replace with your actual information
  const ticketData = {
    name: "Your Name Here",
    partnerName: "Partner Name",
    date: "February 14, 2025",
    time: "7:00 PM",
    venue: "Our Special Place",
    code: "VAL-2025-LOVE",
    seat: "Forever Together"
  };

  const downloadAsPDF = async () => {
    if (!ticketRef.current) return;

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [150, 80],
      });

      pdf.addImage(imgData, "PNG", 0, 0, 150, 80);
      pdf.save("valentine-ticket.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  useEffect(() => {
    // Auto-download after a short delay to let animation complete
    const timer = setTimeout(() => {
      downloadAsPDF();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
      className="w-full max-w-md mx-auto my-8"
    >
      {/* Ticket Container */}
      <div
        ref={ticketRef}
        className="relative bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 rounded-2xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: "2/1" }}
      >
        {/* Ticket Left Section */}
        <div className="flex h-full">
          <div className="flex-1 p-5 flex flex-col justify-between border-r-2 border-dashed border-pink-300">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🎬</span>
                <h3 className="text-lg font-bold text-pink-600 font-romantic">
                  Valentine's Date
                </h3>
              </div>
              <p className="text-xs text-pink-400 uppercase tracking-wider">
                Admit Two
              </p>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-pink-400">Name:</span>
                <span className="font-semibold text-pink-700">{ticketData.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-pink-400">With:</span>
                <span className="font-semibold text-pink-700">{ticketData.partnerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-pink-400">Date:</span>
                <span className="font-semibold text-pink-700">{ticketData.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-pink-400">Time:</span>
                <span className="font-semibold text-pink-700">{ticketData.time}</span>
              </div>
            </div>

            {/* Venue */}
            <div className="text-center">
              <p className="text-xs text-pink-400">📍 {ticketData.venue}</p>
            </div>
          </div>

          {/* Ticket Right Section (Stub) */}
          <div className="w-24 p-3 flex flex-col items-center justify-between bg-gradient-to-b from-pink-200 to-rose-200">
            <div className="text-center">
              <span className="text-3xl">💕</span>
              <p className="text-xs font-bold text-pink-600 mt-1">VALID</p>
            </div>

            <div className="text-center transform -rotate-90 whitespace-nowrap">
              <p className="text-[10px] font-mono text-pink-500">{ticketData.code}</p>
            </div>

            <div className="text-center">
              <p className="text-[10px] text-pink-500">Seat</p>
              <p className="text-xs font-bold text-pink-700">{ticketData.seat}</p>
            </div>
          </div>
        </div>

        {/* Decorative circles for ticket perforation look */}
        <div className="absolute left-[calc(100%-96px-12px)] top-0 w-6 h-3 bg-background rounded-b-full"></div>
        <div className="absolute left-[calc(100%-96px-12px)] bottom-0 w-6 h-3 bg-background rounded-t-full"></div>

        {/* Sparkle decorations */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-2 right-28 text-lg"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-2 left-2 text-lg"
        >
          ✨
        </motion.div>
      </div>

      {/* Download Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={downloadAsPDF}
        className="mt-4 w-full valentine-button flex items-center justify-center gap-2"
      >
        📥 Download Ticket
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-center text-sm text-muted-foreground mt-3"
      >
        Your ticket is being downloaded automatically! 💕
      </motion.p>
    </motion.div>
  );
};

export default MovieTicket;
