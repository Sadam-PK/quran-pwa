import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import background1 from "../assets/endless-constellation.svg";
import background2 from "../assets/rose-petals.svg";
import background3 from "../assets/polka-dots.svg";
import background4 from "../assets/rainbow-vortex.svg";

export default function Ayah() {
  const [background, setBackground] = useState(`url(${background1})`);
  const [showOptions, setShowOptions] = useState(false);

  const { id } = useParams();

  const currentSurah = JSON.parse(localStorage.getItem("currentSurah"));

  // ----------- list of the imported svg backgrounds ----------
  const backgrounds = [
    `url(${background1})`,
    `url(${background2})`,
    `url(${background3})`,
    `url(${background4})`,
  ];

  // ---------- background change function ------------
  const handleBackgroundChange = (bg) => {
    setBackground(bg);
    setShowOptions(false);
  };
  if (!currentSurah || !currentSurah.ayahs || !currentSurah.ayahs[id - 1]) {
    return <div>Error: Ayah not found</div>;
  }
  return (
    <div
      className="relative flex flex-col justify-between items-center gap-3 w-[70%] 
      mx-auto p-10 text-white mb-40 rounded-xl h-[80vh] mt-10"
      style={{
        backgroundImage: background,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="font-thin p-5">
          <p>
            {currentSurah.ayahs[id - 1].surah_id +
              ":" +
              currentSurah.ayahs[id - 1].ayah_number}
          </p>
        </div>

        <div>{currentSurah.ayahs[id - 1].ayah_arabic}</div>

        <div>
          <p>{currentSurah.ayahs[id - 1].ayah_english}</p>
        </div>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="absolute bottom-4 rounded-3xl p-3 bg-emerald-600 text-white
         hover:border-white hover:border hover:bg-transparent"
        >
          customize
        </button>
        {showOptions && (
          <div className="background-options flex flex-row gap-2 mt-20 justify-between">
            {backgrounds.map((e, index) => (
              <div
                key={index}
                className="option w-16 h-16 border-2 border-black cursor-pointer"
                style={{
                  backgroundImage: e,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() => handleBackgroundChange(e)}
              />
            ))}
          </div>
        )}
      </div>
      {/* ----------- button to change background ------------ */}
    </div>
  );
}
