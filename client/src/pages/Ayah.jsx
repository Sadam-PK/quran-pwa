import React, { useState } from "react";
import { useParams } from "react-router-dom";
import background1 from "../assets/endless-constellation.svg";
import background2 from "../assets/rose-petals.svg";
import background3 from "../assets/polka-dots.svg";
import background4 from "../assets/rainbow-vortex.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

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
    <div className="flex  mx-auto">
      <div className="flex w-[5vw]  mx-auto justify-end pt-32">
        <ul className="space-y-5">
          <li>
            <FontAwesomeIcon
              icon={faWhatsapp}
              size="2x"
              color="green"
              className="cursor-pointer"
            />
          </li>
          <li>
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              color="blue"
              className="cursor-pointer"
            />
          </li>
          <li>
            <FontAwesomeIcon
              icon={faXTwitter}
              size="2x"
              color="dark"
              className="cursor-pointer"
            />
          </li>
        </ul>
      </div>
      <div className="flex w-[90vw]">
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

            <div className="text-3xl font-bold">
              {currentSurah.ayahs[id - 1].ayah_arabic}
            </div>

            <div className="text-2xl py-2 font-thin">
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
      </div>
      <div className="flex w-[5vw mx-auto"></div>
    </div>
  );
}
