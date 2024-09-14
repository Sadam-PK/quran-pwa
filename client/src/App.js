import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
// import MySql from "./pages/mysql";
import SurahDetails from "./pages/SurahDetails";
import Ayah from "./pages/Ayah";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/mysql" element={<MySql />} /> */}
        <Route path="/surah/:id/ayahs" element={<SurahDetails />} />
        <Route path="/ayah/:id" element={<Ayah />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
