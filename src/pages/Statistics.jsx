import "./Statistics.css";
import { useBooks } from "../context/useBooks";

function Statistics() {
  const { books } = useBooks();
  const totalBooks = books.length;

  const shelfData = [
    { id: "want", label: "Want to Read" },
    { id: "reading", label: "Reading" },
    { id: "finished", label: "Finished" },
  ].map((shelf) => ({
    ...shelf,
    count: books.filter((book) => book.status === shelf.id).length,
  }));

  const shelves = shelfData.map((shelf) => {
    const shelfBooks = books.filter(
      (book) => book.status === shelf.id
    );

    return {
      ...shelf,
      spines: shelfBooks,
      percent: totalBooks
        ? Math.round((shelf.count / totalBooks) * 100)
        : 0,
      weight: shelfBooks.length,
    };
  });

  const summaryCards = [
    { id: "total", label: "Total Books", value: totalBooks },
    ...shelfData.map((shelf) => ({
      id: shelf.id,
      label: shelf.label,
      value: shelf.count,
    })),
  ];

  const decadeCounts = books.reduce((counts, book) => {
    const year = Number.parseInt(book.year, 10);
    if (!Number.isNaN(year)) {
      const decade = `${Math.floor(year / 10) * 10}s`;
      counts[decade] = (counts[decade] || 0) + 1;
    }
    return counts;
  }, {});

  const decadeData = Object.entries(decadeCounts)
    .sort(([a], [b]) => Number.parseInt(a, 10) - Number.parseInt(b, 10))
    .map(([id, count]) => ({ id, label: id, count }));

  const finished = shelves.find((shelf) => shelf.id === "finished");
  const maxDecadeCount = Math.max(
    0,
    ...decadeData.map((decade) => decade.count)
  );
  const topDecade = decadeData.reduce(
    (best, decade) => (decade.count > best.count ? decade : best),
    { id: "none", label: "any decade", count: 0 }
  );

  const shelfSummary = shelves
    .map((shelf) => `${shelf.count} ${shelf.label}`)
    .join(", ");

  return (
    <section className="statistics">
      <header className="stats-header">
        <h1 className="stats-title">Reading Statistics</h1>
        <p className="stats-subtitle">
          You’ve finished {finished.count} of your {totalBooks} books (
          {finished.percent}%).
        </p>
      </header>

      {/* Summary cards */}
      <ul className="stats-summary">
        {summaryCards.map((card) => (
          <li key={card.id} className={`stats-card stats-card--${card.id}`}>
            <span className="stats-card-value">{card.value}</span>
            <span className="stats-card-label">{card.label}</span>
          </li>
        ))}
      </ul>

      {/* Shelf distribution, drawn as books on a shelf */}
      <div className="stats-panel">
        <h2>Shelf Distribution</h2>
        <p className="stats-panel-note">
          Every book you’ve saved, grouped by shelf.
        </p>

        <div
          className="stats-bookshelf"
          role="img"
          aria-label={`Bookshelf: ${shelfSummary}`}
        >
          {shelves.map((shelf) => (
            <div
              key={shelf.id}
              className="stats-spine-group"
              style={{ flexGrow: shelf.weight }}
            >
            {shelf.spines.map((book) => (
              <span
                key={book.id}
                className={`stats-spine stats-spine--${shelf.id}`}
                style={{ flexGrow: 1, height: "85%" }}
              />
            ))}
            </div>
          ))}
        </div>

        <ul className="stats-legend">
          {shelves.map((shelf) => (
            <li key={shelf.id} className="stats-legend-item">
              <span
                className={`stats-swatch stats-swatch--${shelf.id}`}
                aria-hidden="true"
              />
              <span className="stats-legend-label">{shelf.label}</span>
              <span className="stats-legend-count">
                {shelf.count} {shelf.count === 1 ? "book" : "books"} (
                {shelf.percent}%)
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Books by publication decade */}
      <div className="stats-panel">
        <h2>Books by Publication Decade</h2>
        <p className="stats-panel-note">
          {topDecade.count > 0
            ? `Most of your books were first published in the ${topDecade.label}.`
            : "Publication decade data will appear when you add books."}
        </p>

        {decadeData.length > 0 ? (
          <ul className="stats-bars">
            {decadeData.map((decade) => (
            <li
              key={decade.id}
              className={`stats-bar-row${
                decade.id === topDecade.id ? " is-top" : ""
              }`}
            >
              <span className="stats-bar-label">{decade.label}</span>
              <div className="stats-bar-track" aria-hidden="true">
                <div
                  className="stats-bar-fill"
                  style={{
                    width: `${
                      maxDecadeCount
                        ? (decade.count / maxDecadeCount) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <span className="stats-bar-count">
                {decade.count}
                <span className="stats-sr-only"> books</span>
              </span>
            </li>
            ))}
          </ul>
        ) : (
          <p className="stats-panel-note">No publication data available yet.</p>
        )}
      </div>
    </section>
  );
}

export default Statistics;
