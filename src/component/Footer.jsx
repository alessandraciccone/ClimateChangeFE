import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-green-400 via-teal-400 to-blue-600 text-white py-8 overflow-hidden w-full">
      {/* Decorazioni morbide */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

      {/* Contenuto */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <h2 className="text-lg font-semibold drop-shadow-md">Climate Change</h2>
        <p className="text-sm opacity-90">
          © {new Date().getFullYear()} – Tutti i diritti riservati
        </p>
      </div>
    </footer>
  );
};

export default Footer;
