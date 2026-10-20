import BookCard from "../components/BookCard";
import "./Discover.css";

function Discover({ books }) {
  return (
    <main className="discover-page">
      <section className="discover-header">
        <h1>Discover Books</h1>
        <p>Explore books and find your next great read.</p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title or author..."
            aria-label="Search books"
          />
          <button type="button">Search</button>
        </div>
      </section>

      <section className="discover-results">
        <h2>Explore Books</h2>

        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Discover;
