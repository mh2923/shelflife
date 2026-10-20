import { useParams, Link } from "react-router-dom";
import books from "../data/books";
import "./BookDetails.css";

const descriptions = {
  1: "Bilbo Baggins goes on an unexpected adventure with a group of dwarves to reclaim their treasure from the dragon Smaug.",
  2: "A dystopian novel about Winston Smith, who lives under a government that controls information, thoughts, and everyday life.",
  3: "The story of Elizabeth Bennet and Mr. Darcy, exploring love, family, social class, and misunderstandings.",
  4: "A novel about Jay Gatsby, his pursuit of Daisy Buchanan, and the American Dream during the Jazz Age.",
};

const subjects = {
  1: ["Fantasy", "Adventure", "Classic"],
  2: ["Dystopian", "Science Fiction", "Classic"],
  3: ["Romance", "Fiction", "Classic"],
  4: ["Fiction", "Drama", "Classic"],
};

function BookDetails() {
  const { id } = useParams();

  const book = books.find((item) => item.id === Number(id));

  if (!book) {
    return (
      <section className="book-details">
        <h1>Book not found</h1>
        <Link to="/">Back to Discover</Link>
      </section>
    );
  }

  return (
    <section className="book-details">
      <Link to="/" className="back-link">
        &larr; Back to Search
      </Link>

      <div className="book-details-top">
        <div className="details-cover">
          <img
            src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
            alt={`Cover of ${book.title}`}
          />
        </div>

        <div className="book-main-info">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author">by {book.author}</p>
          <p className="book-year">
            First published: {book.year}
          </p>

          <ul className="subject-tags">
            {subjects[book.id].map((subject) => (
              <li key={subject} className="subject-tag">
                {subject}
              </li>
            ))}
          </ul>

          <div className="book-description">
            <h2>Description</h2>
            <p>{descriptions[book.id]}</p>
          </div>
        </div>
      </div>

      <div className="book-details-bottom">
        <div className="info-card">
          <h2>Additional Information</h2>

          <dl className="info-list">
            <div className="info-row">
              <dt>Author</dt>
              <dd>{book.author}</dd>
            </div>

            <div className="info-row">
              <dt>Publication Year</dt>
              <dd>{book.year}</dd>
            </div>

            <div className="info-row">
              <dt>Book ID</dt>
              <dd>{book.id}</dd>
            </div>
          </dl>
        </div>

        <div className="info-card shelf-card">
          <h2>Add to Your Shelf</h2>

          <label className="shelf-label" htmlFor="shelf-select">
            Choose a shelf
          </label>

          <select
            id="shelf-select"
            className="shelf-select"
            defaultValue=""
          >
            <option value="" disabled>
              Select a shelf...
            </option>
            <option value="Want to Read">Want to Read</option>
            <option value="Reading">Reading</option>
            <option value="Finished">Finished</option>
          </select>

          <button type="button" className="shelf-button">
            Add to Shelf
          </button>

          <p className="shelf-note">
            Saving books will be available in a later phase.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BookDetails;