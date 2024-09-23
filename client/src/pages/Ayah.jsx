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
    <div className="flex flex-col sm:flex-row mx-auto">
      {/* renders social icons at a sidebar for web view and hides for mobile view*/}
      <div className="flex-col sm:flex-row w-[5vw] mx-auto justify-end pt-32 sm:block hidden">
        <ul className="space-y-5">
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
              icon={faWhatsapp}
              size="2x"
              color="green"
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

      {/* center div for showing data */}
      <div className="flex mx-auto w-[90vw] sm:w-[70vw]">
        <div
          className="relative flex flex-col justify-between items-center gap-3 w-[90vw] sm:w-[80vw] 
      mx-auto p-10 text-white mb-40 rounded-xl h-[80vh] mt-10"
          style={{
            backgroundImage: background,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <div className="flex flex-col items-center justify-center pt-20">
            <div className="font-thin p-5">
              <p>
                {currentSurah.ayahs[id - 1].surah_id +
                  ":" +
                  currentSurah.ayahs[id - 1].ayah_number}
              </p>
            </div>

            <div className="sm:text-3xl text-xl font-bold text-right">
              {currentSurah.ayahs[id - 1].ayah_arabic}
            </div>

            <div className="sm:text-2xl py-2 font-thin text-left">
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

      {/* renders social icons at bottom for mobile view and hiddens at bottom for web view */}
      <div className="flex mx-auto justify-end sm:hidden p-5">
        <ul className="flex flex-row items-center justify-center gap-5">
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
              icon={faWhatsapp}
              size="2x"
              color="green"
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
      <div className="flex w-[5vw mx-auto sm:block" />
    </div>
  );
}
