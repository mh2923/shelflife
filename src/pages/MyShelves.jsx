
import { useState } from "react";
import "./MyShelves.css";

const books = [
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, shelf: "Want to Read" },
    { id: 2, title: "1984", author: "George Orwell", year: 1949, shelf: "Want to Read" },
    { id: 3, title: "Dune", author: "Frank Herbert", year: 1965, shelf: "Want to Read" },
    { id: 4, title: "The Alchemist", author: "Paulo Coelho", year: 1988, shelf: "Want to Read" },
    { id: 5, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, shelf: "Want to Read" },
    { id: 6, title: "Atomic Habits", author: "James Clear", year: 2018, shelf: "Reading" },
    { id: 7, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", year: 1997, shelf: "Reading" },
    { id: 8, title: "The Hunger Games", author: "Suzanne Collins", year: 2008, shelf: "Finished" },
    { id: 9, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, shelf: "Finished" },
    { id: 10, title: "The Fault in Our Stars", author: "John Green", year: 2012, shelf: "Finished" },
];

const shelfNames = ["Want to Read", "Reading", "Finished"];

function ShelfBookCard({ book }) {
    return (
        <div className="shelf-book-card">
            <div className="shelf-cover-placeholder">
                No Cover
            </div>

            <div className="shelf-book-info">
                <h3>{book.title}</h3>
                <p className="shelf-book-author">by {book.author}</p>
                <p className="shelf-book-year">
                    First published: {book.year}
                </p>
            </div>

            <div className="shelf-book-actions">
                <select
                    className="shelf-move-select"
                    defaultValue=""
                    aria-label={`Move ${book.title} to another shelf`}
                >
                    <option value="" disabled>
                        Move to...
                    </option>

                    {shelfNames
                        .filter((shelf) => shelf !== book.shelf)
                        .map((shelf) => (
                            <option key={shelf} value={shelf}>
                                {shelf}
                            </option>
                        ))}
                </select>

                <button type="button" className="shelf-remove-button">
                    Remove
                </button>
            </div>
        </div>
    );
}

function MyShelves() {
    const [activeShelf, setActiveShelf] = useState("Want to Read");

    const filteredBooks = books.filter(
        (book) => book.shelf === activeShelf
    );

    return (
        <main className="my-shelves-page">
            <div className="shelves-header">
                <div>
                    <h1>My Reading Shelves</h1>
                    <p>Organize your books and track your reading journey.</p>
                </div>

                <button type="button" className="shelf-add-button">
                    + Add a Book
                </button>
            </div>

            {/* Shelf tabs */}
            <div className="shelf-tabs">
                {shelfNames.map((shelf) => (
                    <button
                        type="button"
                        key={shelf}
                        className={`shelf-tab ${activeShelf === shelf ? "active" : ""
                            }`}
                        onClick={() => setActiveShelf(shelf)}
                    >
                        {shelf}
                        <span className="shelf-count">
                            {books.filter((book) => book.shelf === shelf).length}
                        </span>
                    </button>
                ))}
            </div>

            <section className="shelf-book-list">
                {filteredBooks.map((book) => (
                    <ShelfBookCard key={book.id} book={book} />
                ))}
            </section>
        </main>
    );
}

export default MyShelves;
