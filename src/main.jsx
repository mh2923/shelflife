import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { BooksProvider } from "./context/BooksProvider";

import App, { DiscoverRoute, BookDetailsRoute } from "./App.jsx";
import MyShelves from "./pages/MyShelves";
import Statistics from "./pages/Statistics";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DiscoverRoute /> },
      { path: "book/:id", element: <BookDetailsRoute /> },
      { path: "shelves", element: <MyShelves /> },
      { path: "statistics", element: <Statistics /> },
      { path: "*", element: <DiscoverRoute /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BooksProvider>
      <RouterProvider router={router} />
    </BooksProvider>
  </React.StrictMode>
);