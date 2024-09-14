// import { useEffect, useState } from "react";
// import db from "../db/dexie";

// export default function SQLConnection() {
//   const [surahs, setSurahs] = useState([]);
//   const [mode, setMode] = useState("online");

//   // Fetching and storing data in Dexie
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("http://localhost:5000/surahs");
//         const data = await response.json();
//         setSurahs(data);

//         // Store data in Dexie
//         await db.table("surahs").clear();
//         await db.table("surahs").bulkPut(data);
//         console.log("Data stored in Dexie:", data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, []);

//   // Displaying data from Dexie
//   useEffect(() => {
//     async function getSurahs() {
//       try {
//         const response = await db.table("surahs").toArray();
//         setSurahs(response);
//       } catch (error) {
//         const response = await db.table("surahs").toArray();
//         setSurahs(response);
//         setMode("offline");
//       }
//     }

//     getSurahs();
//   }, []);

//   return (
//     <div>
//       {surahs.map((e, i) => (
//         <div key={i} style={{ display: "flex", gap: "3vw" }}>
//           <div>
//             <p>{e.id}</p>
//           </div>
//           <div>
//             <p>{e.name}</p>
//           </div>
//           <div>
//             <p>{e.meaning}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
