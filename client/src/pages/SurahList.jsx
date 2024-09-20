import { useNavigate } from "react-router-dom";
// import { list } from "../surahs";
import { useEffect, useState } from "react";
import db from "../db/dexie";
import SearchInput from "../components/SearchInput";

export let list = [];

export default function SurahList() {
  // const [surahList, setSurahList] = useState([]);
  const [surahs, setSurahs] = useState([]);
  // const [mode, setMode] = useState("online");

  // Fetching and storing data in Dexie

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/surahs");
        const data = await response.json();
        setSurahs(data);

        list = data;

        // Store data in Dexie
        await db.table("surahs").clear();
        await db.table("surahs").bulkPut(data);
        console.log("Data stored in Dexie:", data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // Displaying data from Dexie
  useEffect(() => {
    async function getSurahs() {
      try {
        const response = await db.table("surahs").toArray();
        setSurahs(response);
      } catch (error) {
        const response = await db.table("surahs").toArray();
        setSurahs(response);
        // setMode("offline");
      }
    }

    getSurahs();
  }, []);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/surah/${id}/ayahs`);
  };


  return (
    <div>
       <div className="flex justify-center py-10 bg-gray-400">
        <SearchInput placeholder="Find an Ayah?" />
      </div>
      <div className="h-20"></div>
      <div className="px-24">
        <h2 className="font-bold">Surah List</h2>
      </div>
      <div className="grid grid-cols-3 py-2 px-20">
        {surahs.map((e) => {
          return (
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
          );
        })}
      </div>
      <div className="h-20"></div>
    </div>
  );
}
