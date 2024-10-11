import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import db from "../db/dexie";
import SearchInput from "../components/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function SurahList() {
  const [surahs, setSurahs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 9;

  // Fetching and storing data in Dexie
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch surahs from the backend with page and limit query params
        const response = await fetch(
          `http://localhost:5000/surahs?page=${currentPage}&limit=${limit}`
        );
        const data = await response.json();
        setSurahs(data);

        // Assuming your backend also returns the total number of surahs
        const totalCount = 114; // Total surahs, or fetch from the backend if available
        setTotalPages(Math.ceil(totalCount / limit));

        // Store data in Dexie
        await db.table("surahs").clear();
        await db.table("surahs").bulkPut(data);
        console.log("Data stored in Dexie:", data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentPage]); // Refetch data when the current page changes

  // Displaying data from Dexie for offline use
  useEffect(() => {
    async function getSurahs() {
      try {
        const response = await db.table("surahs").toArray();
        setSurahs(response);
      } catch (error) {
        const response = await db.table("surahs").toArray();
        setSurahs(response);
      }
    }

    getSurahs();
  }, []);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/surah/${id}/ayahs`);
  };

  // Prev page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center py-10 bg-gray-400">
        <SearchInput placeholder="Find an Ayah?" />
      </div>
      <div className="h-10 sm:h-20" />
      <div className="px-12 sm:px-24">
        <h2 className="font-bold">Surah List</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid sm:grid-cols-3 py-2 px-10 sm:px-20">
        {surahs.map((e) => (
          <div
            key={e.id}
            className="m-3 p-3 border border-gray-200 rounded-md shadow-sm
             shadow-gray-200 hover:border-gray-400 group cursor-pointer"
            onClick={() => handleClick(e.id)}
          >
            <div className="flex gap-5 items-center w-50 flex-grow">
              <div
                className="rounded-full border size-10 flex justify-center 
                group-hover:border-gray-400 hover:border-gray-200 items-center bg-gray-50"
              >
                {e.id}
              </div>
              <div className="flex flex-col w-50 flex-grow">
                <div>{e.name}</div>
                <div className="text-sm text-gray-500">{e.meaning}</div>
              </div>
              <div
                className="flex justify-center items-center text-sm space-x-2
                 text-gray-500"
              >
                <p>{e.ayahs}</p>
                <p>Ayahs</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* for added some space vertically */}
      <div className="h-20" />
      {surahs.length > 0 && (
        <div className="flex flex-row justify-center gap-5 items-center">
          <FontAwesomeIcon
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            icon={faArrowLeft}
            className="border w-20 py-2 rounded-xl cursor-pointer hover:bg-gray-400
             hover:text-white"
          />

          <p className="text-gray-500 text-sm">
            {currentPage}/{totalPages}
          </p>
          <FontAwesomeIcon
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            icon={faArrowRight}
            className="border w-20 py-2 rounded-xl cursor-pointer hover:bg-gray-400
            hover:text-white"
          />
        </div>
      )}
      {/* for adding height */}
      <div className="h-10" />
    </div>
  );
}
