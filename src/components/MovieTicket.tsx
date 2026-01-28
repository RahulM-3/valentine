import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import bwipjs from "bwip-js";


const MovieTicket = () => {
  const ticketRef = useRef<HTMLDivElement>(null);

  // Placeholder data - replace with your actual information
  const ticketData = {
    name: "Rahul",
    partnerName: "‎ ‎ Thulasi Brindha",
    date: "‎ ‎ February 14, 2026",
    code: "VAL-69-LOVE",
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
    const timer = setTimeout(() => {
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  
/* Helper row */
const Row = ({ label, value }) => (
  <div className="flex justify-left gap-6">
    <span className="text-rose-400">{label}</span>
    <span className="font-medium text-rose-700">{value}</span>
  </div>
);

const barcodeRef = useRef<HTMLCanvasElement>(null);
const barcodeLink = "https://github.com/RahulM-3/valentine";

useEffect(() => {
  if (!barcodeRef.current) return;

  try {
    bwipjs.toCanvas(barcodeRef.current, {
      bcid: "pdf417", // 2D ticket barcode
      text: `${barcodeLink}|${ticketData.code}`,
      scale: 2,
      columns: 3,
      height: 12,
      includetext: false,
    });
  } catch (e) {
    console.error(e);
  }
}, []);


  return (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="w-full max-w-md mx-auto my-10"
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      ref={ticketRef}
      className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl"
      style={{ aspectRatio: "2/1" }}
    >
      {/* Gold border */}
      <div className="absolute inset-0 rounded-3xl border border-amber-300/40 pointer-events-none" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-[#fff7f2] to-rose-100" />

      <div className="relative flex h-full font-clean">

        {/* LEFT */}
        <div className="flex-1 px-4 py-5 flex flex-col justify-between border-r border-dashed border-amber-300/50">

          {/* Header */}
          <div>
            <h3 className="text-xl font-romantic font-semibold tracking-wide text-rose-700">
              Valentine's Invitation
            </h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-rose-400 mt-1">
              Admit Two
            </p>
          </div>

          {/* Details */}
          <div className="space-y-1 text-sm">
            <Row label="Guest:" value={ticketData.name} />
            <Row label="With:" value={ticketData.partnerName} />
            <Row label="Date:" value={ticketData.date} />
          </div>
          <p className="text-[10px] text-rose-400 tracking-wide py-2">
            Freaky mode allowed ✨
          </p>
        </div>

        {/* RIGHT STUB */}
        <div className="w-28 px-3 py-4 flex items-center justify-center bg-gradient-to-b from-rose-100 to-rose-200">

          {/* Rotated container */}
          <div className="flex flex-col items-center gap-2 -rotate-90">

            {/* 2D Barcode */}
            <canvas
              ref={barcodeRef}
              className="w-40 max-w-none"
            />

            {/* Code */}
            <p className="text-[10px] tracking-widest font-mono text-rose-600">
              {ticketData.code}
            </p>

          </div>
        </div>
      </div>

      {/* Perforation */}
      <div className="absolute right-[6.5rem] top-0 w-5 h-3 bg-white rounded-b-full" />
      <div className="absolute right-[6.5rem] bottom-0 w-5 h-3 bg-white rounded-t-full" />

      {/* Soft sparkles */}
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-3 right-32 text-sm"
      >
        ✨
      </motion.span>
    </motion.div>

    {/* Download */}
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      onClick={downloadAsPDF}
      className="mt-6 w-full rounded-full py-3 bg-gradient-to-r from-rose-400 to-pink-400 text-white font-clean font-medium shadow-lg hover:scale-[1.02] transition"
>
      Download Invitation
    </motion.button>
  </motion.div>
);
};

export default MovieTicket;
