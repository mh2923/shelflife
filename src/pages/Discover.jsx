import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import "./Discover.css";

function Discover() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("fiction");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      setLoading(true);
      setError("");
      setResults([]);

      try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=12`;

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load books. Please try again.");
        }

        const data = await response.json();

        const formattedBooks = data.docs
          .filter((item) => item.key?.startsWith("/works/"))
          .map((item) => ({
            id: item.key.replace("/works/", ""),
            title: item.title || "Untitled",
            author: item.author_name?.[0] || "Unknown Author",
            year: item.first_publish_year || "Unknown",
            coverId: item.cover_i || null,
          }));

        if (!controller.signal.aborted) {
          setResults(formattedBooks);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "Could not fetch books. Check your internet connection and try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBooks();

    return () => controller.abort();
  }, [searchQuery, retryCount]);

  function handleSearch(event) {
    event.preventDefault();
    const query = searchInput.trim();

    if (query) {
      setHasSearched(true);

      if (query === searchQuery) {
        setRetryCount((count) => count + 1);
      } else {
        setSearchQuery(query);
      }
    }
  }

  function handleBackToExplore() {
    setSearchInput("");
    setHasSearched(false);

    if (searchQuery === "fiction") {
      setRetryCount((count) => count + 1);
    } else {
      setSearchQuery("fiction");
    }
  }

  function handleRetry() {
    setRetryCount((count) => count + 1);
  }

  return (
    <main className="discover-page">
      <section className="discover-header">
        <h1>Discover Books</h1>
        <p>Explore books and find your next great read.</p>

        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            aria-label="Search books"
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="discover-results">
        <div className="results-heading">
          <h2>
            {hasSearched
              ? `Results for "${searchQuery}"`
              : "Explore Books"}
          </h2>

          {hasSearched && (
            <button
              type="button"
              className="back-to-explore"
              onClick={handleBackToExplore}
            >
              &larr; Back to Explore
            </button>
          )}
        </div>

        {loading && (
          <p className="discover-status" role="status">
            Loading books...
          </p>
        )}

        {!loading && error && (
          <div className="error-section">
            <p className="discover-status discover-error" role="alert">
              {error}
            </p>

            <button
              type="button"
              className="retry-button"
              onClick={handleRetry}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && results.length === 0 && (
          <p className="discover-status">
            No books found. Try another title or author.
          </p>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="book-grid">
            {results.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Discover;
