import { useParams, Link } from "react-router-dom";
import "./BookDetails.css";

const sampleBook = {
  id: "OL262423W",
  title: "The Adventures of Sherlock Holmes",
  author: "Arthur Conan Doyle",
  firstPublished: 1892,
  coverUrl: null,
  description:
    "A collection of twelve short stories featuring the consulting detective Sherlock Holmes and his companion Dr. Watson, first published as a single volume in 1892. The stories follow the pair through London and the English countryside as they take on cases brought to their rooms in Baker Street.",
  subjects: ["Fiction", "Mystery", "Detective", "Short stories", "Classic"],
  editions: 1892,
  language: "English",
};

const SHELF_OPTIONS = ["Want to Read", "Reading", "Finished"];

function BookDetails() {
  const { id } = useParams();
  const book = sampleBook;

  return (
    <section className="book-details">
      <Link to="/" className="back-link">
        &larr; Back to Search
      </Link>

      <div className="book-details-top">
        <div className="book-cover">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={`Cover of ${book.title}`} />
          ) : (
            <div className="book-cover-placeholder">
              <span>No Cover</span>
            </div>
          )}
        </div>

        <div className="book-main-info">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author">{book.author}</p>
          <p className="book-year">First published: {book.firstPublished}</p>

          <ul className="subject-tags">
            {book.subjects.map((subject) => (
              <li key={subject} className="subject-tag">
                {subject}
              </li>
            ))}
          </ul>

          <div className="book-description">
            <h2>Description</h2>
            <p>{book.description}</p>
          </div>
        </div>
      </div>

      <div className="book-details-bottom">
        <div className="info-card">
          <h2>Additional Information</h2>
          <dl className="info-list">
            <div className="info-row">
              <dt>Subjects</dt>
              <dd>{book.subjects.join(", ")}</dd>
            </div>
            <div className="info-row">
              <dt>Editions</dt>
              <dd>{book.editions}</dd>
            </div>
            <div className="info-row">
              <dt>Language</dt>
              <dd>{book.language}</dd>
            </div>
            <div className="info-row">
              <dt>Work ID</dt>
              <dd>{id}</dd>
            </div>
          </dl>
        </div>

        <div className="info-card shelf-card">
          <h2>Add to Your Shelf</h2>

          <label className="shelf-label" htmlFor="shelf-select">
            Choose a shelf
          </label>
          <select id="shelf-select" className="shelf-select" defaultValue="">
            <option value="" disabled>
              Select a shelf...
            </option>
            {SHELF_OPTIONS.map((shelf) => (
              <option key={shelf} value={shelf}>
                {shelf}
              </option>
            ))}
          </select>

          <button type="button" className="shelf-button">
            Add to Shelf
          </button>

          <p className="shelf-note">
            Saving shelves is added in a later phase.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BookDetails;