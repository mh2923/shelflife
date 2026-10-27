import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Discover from "./pages/Discover";
import BookDetails from "./pages/BookDetails";
import MyShelves from "./pages/MyShelves";
import Statistics from "./pages/Statistics";


const navLinks = [
  { path: "/", label: "Discover" },
  { path: "/shelves", label: "My Shelves" },
  { path: "/statistics", label: "Statistics" },
];


function App() {
  return (
    <div className="app">
      <Navbar links={navLinks} />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/shelves" element={<MyShelves />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;