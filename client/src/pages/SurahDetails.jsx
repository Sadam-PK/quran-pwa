import { useParams } from "react-router-dom";
// import { list } from "../surahs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { list } from "./SurahList";

export let currentSurah = { ayahs: [] };

export default function SurahDetails() {
  // details of each surah from previous page
  const [surahDetails, setSurahDetails] = useState();
  //dynamic route data fetching var
  const { id } = useParams();

  // set details into state
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/surah/${id}/ayahs`);
        const data = await response.json();
        setSurahDetails(data);
        // currentSurah = data;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  // --------- saving current surah ---------

  if (surahDetails) {
    localStorage.setItem("currentSurah", JSON.stringify(surahDetails));
  }
  const navigate = useNavigate();
  const handleClick = (ayahId) => {
    console.log("ayahid = " + ayahId);

    navigate(`/ayah/${ayahId}`);
  };
  console.log(surahDetails + "surah Details");

  if (!surahDetails) {
    return <div>Surah not found</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center font-bold p-5">{surahDetails.name}</div>
      {surahDetails.ayahs.map((ayah, i) => (
        <div
          className="flex flex-col p-5 border m-2 rounded-md sm:w-[70vw]
           hover:border-gray-400  w-[85vw] bg-gray-50 h-auto gap-5"
          onClick={() => handleClick(ayah.ayah_number)}
          key={i}
        >
          <div className="gap-3">
            {ayah.surah_id}:{ayah.ayah_number}
          </div>
          <div className="text-right">{ayah.ayah_arabic}</div>
          <div>{ayah.ayah_english}</div>
        </div>
      ))}

      {/* div for height from footer  */}
      <div className="h-20" />
    </div>
  );
}
