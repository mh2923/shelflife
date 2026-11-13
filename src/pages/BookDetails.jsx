import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { useBooks } from "../context/useBooks";
import "./BookDetails.css";

const API = "https://openlibrary.org";

const SHELF_LABELS = {
  want: "Want to Read",
  reading: "Reading",
  finished: "Finished",
};

function getDescription(raw) {
  if (!raw) return "";

  let text = typeof raw === "string" ? raw : raw.value || "";

  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  text = text.split(/\r?\n-{5,}/)[0];

  return text.trim();
}

function getYear(dateStr) {
  const match = String(dateStr || "").match(/\d{4}/);
  return match ? match[0] : "";
}

function BookDetails() {
  const { id } = useParams();
  const { books, addBook, moveBook } = useBooks();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [selectedShelf, setSelectedShelf] = useState("");
  const [formError, setFormError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadBook() {
      setLoading(true);
      setError("");
      setBook(null);
      setSelectedShelf("");
      setFormError("");
      setConfirmation("");

      try {
        const res = await fetch(`${API}/works/${id}.json`);

        if (res.status === 404) {
          throw new Error("We couldn't find that book.");
        }
        if (!res.ok) {
          throw new Error("Something went wrong loading this book.");
        }

        const data = await res.json();

        const authorKeys = (data.authors || [])
          .map((a) => a.author?.key)
          .filter(Boolean)
          .slice(0, 3);

        const authorNames = await Promise.all(
          authorKeys.map(async (key) => {
            try {
              const r = await fetch(`${API}${key}.json`);
              if (!r.ok) return null;
              const a = await r.json();
              return a.name || null;
            } catch {
              return null;
            }
          })
        );

        const coverId = (data.covers || []).find((c) => c > 0);

        let year = getYear(data.first_publish_date);

        if (!year) {
          try {
            const r = await fetch(
              `${API}/search.json?q=key:/works/${id}&fields=first_publish_year&limit=1`
            );
            if (r.ok) {
              const s = await r.json();
              year = s.docs?.[0]?.first_publish_year
                ? String(s.docs[0].first_publish_year)
                : "";
            }
          } catch (err) {
              console.error("Could not fetch publication year:", err);
            }
        }

        if (!cancelled) {
          setBook({
            id,
            title: data.title || "Untitled",
            author: authorNames.filter(Boolean).join(", "),
            year,
            coverId,
            description: getDescription(data.description),
            subjects: (data.subjects || []).slice(0, 8),
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof TypeError
              ? "Network error. Check your connection and try again."
              : err.message
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadBook();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="book-details">
        <Link to="/" className="back-link">
          &larr; Back to Search
        </Link>
        <p className="status-message loading-message">Loading book details...</p>
      </section>
    );
  }

  if (error || !book) {
    return (
      <section className="book-details">
        <Link to="/" className="back-link">
          &larr; Back to Search
        </Link>
        <div className="status-message error-message">
          <h1>{error === "We couldn't find that book." ? "Book not found" : "Unable to load book"}</h1>
          <p>{error || "Something went wrong."}</p>
        </div>
      </section>
    );
  }

  const authorText = book.author || "Unknown author";
  const yearText = book.year || "Unknown";

  const description = book.description || "No description available for this book.";
  const isLongDescription = description.length > 300;

  const displayedDescription =
    isLongDescription && !showFullDescription
      ? description.slice(0, 300) + "..."
      : description;

  const savedBook = books.find((item) => item.id === book.id);

  function handleShelfChange(event) {
    setSelectedShelf(event.target.value);
    setFormError("");
    setConfirmation("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setConfirmation("");

    if (!SHELF_LABELS[selectedShelf]) {
      setFormError("Please choose a shelf before adding this book.");
      return;
    }

    setFormError("");
    const shelfName = SHELF_LABELS[selectedShelf];

    if (savedBook) {
      if (savedBook.status === selectedShelf) {
        setConfirmation(`This book is already on your ${shelfName} shelf.`);
        return;
      }

      moveBook(book.id, selectedShelf);
      setConfirmation(`Moved "${book.title}" to ${shelfName}.`);
      return;
    }

    addBook({
      id: book.id,
      title: book.title,
      author: authorText,
      year: book.year ? Number(book.year) : null,
      coverId: book.coverId || null,
      status: selectedShelf,
    });

    setConfirmation(`Added "${book.title}" to ${shelfName}.`);
  }

  return (
    <section className="book-details">
      <Link to="/" className="back-link">
        &larr; Back to Search
      </Link>

      <div className="book-details-top">
        <div className="details-cover">
          {book.coverId ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
              alt={`Cover of ${book.title}`}
            />
          ) : (
            <div className="details-cover-placeholder">No cover available</div>
          )}
        </div>

        <div className="book-main-info">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author">by {authorText}</p>
          <p className="book-year">First published: {yearText}</p>

          {book.subjects.length > 0 && (
            <ul className="subject-tags">
              {book.subjects.map((subject) => (
                <li key={subject} className="subject-tag">
                  {subject}
                </li>
              ))}
            </ul>
          )}

          <div className="book-description">
            <h2>Description</h2>
            <p>{displayedDescription}</p>

            {isLongDescription && (
              <button
                type="button"
                className="read-more-button"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="book-details-bottom">
        <div className="info-card">
          <h2>Additional Information</h2>

          <dl className="info-list">
            <div className="info-row">
              <dt>Author</dt>
              <dd>{authorText}</dd>
            </div>

            <div className="info-row">
              <dt>Publication Year</dt>
              <dd>{yearText}</dd>
            </div>

            <div className="info-row">
              <dt>Book ID</dt>
              <dd>{book.id}</dd>
            </div>
          </dl>
        </div>

        <form className="info-card shelf-card" onSubmit={handleSubmit}>
          <h2>Add to Your Shelf</h2>

          {savedBook && (
            <p className="shelf-current">
              Currently on: <strong>{SHELF_LABELS[savedBook.status]}</strong>
            </p>
          )}

          <label className="shelf-label" htmlFor="shelf-select">
            Choose a shelf
          </label>

          <select
            id="shelf-select"
            className={`shelf-select ${formError ? "invalid" : ""}`}
            value={selectedShelf}
            onChange={handleShelfChange}
          >
            <option value="" disabled>
              Select a shelf...
            </option>
            <option value="want">Want to Read</option>
            <option value="reading">Reading</option>
            <option value="finished">Finished</option>
          </select>

          {formError && (
            <p className="shelf-error" role="alert">
              {formError}
            </p>
          )}

          <button type="submit" className="shelf-button">
            {savedBook ? "Move to Shelf" : "Add to Shelf"}
          </button>

          {confirmation && (
            <p className="shelf-success" role="status">
              {confirmation} <Link to="/shelves">View My Shelves</Link>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default BookDetails;