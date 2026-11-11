
import { useState } from "react";
import { Link } from "react-router";
import { useBooks } from "../context/useBooks";
import "./MyShelves.css";

const shelfNames = [
    { label: "Want to Read", status: "want" },
    { label: "Reading", status: "reading" },
    { label: "Finished", status: "finished" },
];

function ShelfBookCard({ book, moveBook, removeBook }) {
    const [coverError, setCoverError] = useState(false);

    const coverUrl = book.coverId
        ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
        : book.isbn
            ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
            : null;

    return (
        <div className="shelf-book-card">
            <div className="shelf-cover-placeholder">
                {coverUrl && !coverError ? (
                    <img
                        src={coverUrl}
                        alt={`Cover of ${book.title}`}
                        className="shelf-book-cover"
                        onError={() => setCoverError(true)}
                    />
                ) : (
                    <span>No Cover Available</span>
                )}
            </div>

            <div className="shelf-book-info">
                <h3>{book.title}</h3>

                <p className="shelf-book-author">
                    by {book.author || "Unknown author"}
                </p>

                <p className="shelf-book-year">
                    First published: {book.year || "Unknown"}
                </p>
            </div>

            <div className="shelf-book-actions">
                <select
                    className="shelf-move-select"
                    value=""
                    aria-label={`Move ${book.title} to another shelf`}
                    onChange={(e) => moveBook(book.id, e.target.value)}
                >
                    <option value="" disabled>
                        Move to...
                    </option>

                    {shelfNames
                        .filter((shelf) => shelf.status !== book.status)
                        .map((shelf) => (
                            <option
                                key={shelf.status}
                                value={shelf.status}
                            >
                                {shelf.label}
                            </option>
                        ))}
                </select>

                <button
                    type="button"
                    className="shelf-remove-button"
                    onClick={() => removeBook(book.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

function MyShelves() {
    const { books, moveBook, removeBook } = useBooks();

    const [activeShelf, setActiveShelf] = useState("want");

    const filteredBooks = books.filter(
        (book) => book.status === activeShelf
    );

    return (
        <main className="my-shelves-page">
            <div className="shelves-header">
                <div>
                    <h1>My Reading Shelves</h1>
                    <p>
                        Organize your books and track your reading journey.
                    </p>
                </div>

                <div className="shelf-header-actions">
                    <Link to="/" className="shelf-add-button">
                        + Add a Book
                    </Link>
                </div>
            </div>

            <div className="shelf-tabs">
                {shelfNames.map((shelf) => (
                    <button
                        type="button"
                        key={shelf.status}
                        className={`shelf-tab ${activeShelf === shelf.status ? "active" : ""
                            }`}
                        onClick={() => setActiveShelf(shelf.status)}
                    >
                        {shelf.label}

                        <span className="shelf-count">
                            {
                                books.filter(
                                    (book) => book.status === shelf.status
                                ).length
                            }
                        </span>
                    </button>
                ))}
            </div>

            <section className="shelf-book-list">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <ShelfBookCard
                            key={book.id}
                            book={book}
                            moveBook={moveBook}
                            removeBook={removeBook}
                        />
                    ))
                ) : (
                    <p className="shelf-empty-message">
                        No books on this shelf yet.
                    </p>
                )}
            </section>
        </main>
    );
}

export default MyShelves;
