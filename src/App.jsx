import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import Home from "./component/Home";
import Cornice from "./component/Cornice";
import Register from "./component/Register";
import Login from "./component/Login";
import Profilo from "./component/Profilo";
import ClimateAnalyzer from "./component/ClimateAnalyzer";
import PaginaPreferiti from "./component/PaginaPreferiti";
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profilo" element={<Profilo />} />
            <Route path="/climate" element={<ClimateAnalyzer />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contatti" element={<Contatti />} /> */}
            <Route path="/preferiti" element={<PaginaPreferiti />} />
          </Routes>
        </main>

        <Cornice />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
