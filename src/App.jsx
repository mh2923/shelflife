import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

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

function DiscoverRoute() {
  const location = useLocation();

  return <Discover key={location.key} />;
}

function BookDetailsRoute() {
  const { id } = useParams();

  return <BookDetails key={id} />;
}

function App() {
  return (
    <div className="app">
      <Navbar links={navLinks} />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<DiscoverRoute />} />
          <Route path="/book/:id" element={<BookDetailsRoute />} />
          <Route path="/shelves" element={<MyShelves />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;