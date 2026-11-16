import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router";

import Navbar from "./components/Navbar";
import Discover from "./pages/Discover";
import BookDetails from "./pages/BookDetails";

const navLinks = [
  { path: "/", label: "Discover" },
  { path: "/shelves", label: "My Shelves" },
  { path: "/statistics", label: "Statistics" },
];

// Use route-specific keys to reset page state when navigation changes.
export function DiscoverRoute() {
  const location = useLocation();

  return <Discover key={location.key} />;
}

export function BookDetailsRoute() {
  const { id } = useParams();

  return <BookDetails key={id} />;
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      document.title = "ShelfLife | Discover Books";
    } else if (path === "/shelves") {
      document.title = "ShelfLife | My Shelves";
    } else if (path === "/statistics") {
      document.title = "ShelfLife | Reading Statistics";
    } else if (path.startsWith("/book/")) {
      document.title = "ShelfLife | Book Details";
    } else {
      document.title = "ShelfLife";
    }
  }, [location.pathname]);

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
