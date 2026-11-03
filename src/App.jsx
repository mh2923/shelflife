import { Outlet, useLocation, useParams } from "react-router";

import Navbar from "./components/Navbar";
import Discover from "./pages/Discover";
import BookDetails from "./pages/BookDetails";

const navLinks = [
  { path: "/", label: "Discover" },
  { path: "/shelves", label: "My Shelves" },
  { path: "/statistics", label: "Statistics" },
];

export function DiscoverRoute() {
  const location = useLocation();

  return <Discover key={location.key} />;
}

export function BookDetailsRoute() {
  const { id } = useParams();

  return <BookDetails key={id} />;
}

function App() {
  return (
    <div className="app">
      <Navbar links={navLinks} />

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
