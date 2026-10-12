import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="book-card">
      <img
        src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
        alt={`Cover of ${book.title}`}
        className="book-cover"
      />

      <div className="book-card-info">
        <h3>{book.title}</h3>
        <p>Author: {book.author}</p>
        <p>Published: {book.year}</p>

        <Link to={`/book/${book.id}`} className="details-button">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
