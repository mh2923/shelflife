import "./Statistics.css";

const shelfData = [
  { id: "want", label: "Want to Read", count: 5 },
  { id: "reading", label: "Reading", count: 2 },
  { id: "finished", label: "Finished", count: 3 },
];

const decadeData = [
  { id: "1920s", label: "1920s", count: 1 },
  { id: "1930s", label: "1930s", count: 1 },
  { id: "1940s", label: "1940s", count: 1 },
  { id: "1960s", label: "1960s", count: 2 },
  { id: "1980s", label: "1980s", count: 1 },
  { id: "1990s", label: "1990s", count: 1 },
  { id: "2000s", label: "2000s", count: 1 },
  { id: "2010s", label: "2010s", count: 2 },
];

const SPINE_LOOKS = [
  { width: 1.0, height: 78 },
  { width: 1.4, height: 94 },
  { width: 0.8, height: 70 },
  { width: 1.2, height: 86 },
  { width: 1.0, height: 100 },
  { width: 1.5, height: 74 },
  { width: 0.9, height: 90 },
  { width: 1.1, height: 82 },
  { width: 1.3, height: 96 },
  { width: 0.8, height: 72 },
  { width: 1.2, height: 88 },
  { width: 1.0, height: 80 },
];

const totalBooks = shelfData.reduce((sum, shelf) => sum + shelf.count, 0);

const shelves = shelfData.map((shelf, shelfIndex) => {
  const booksBefore = shelfData
    .slice(0, shelfIndex)
    .reduce((sum, earlier) => sum + earlier.count, 0);

  const spines = Array.from({ length: shelf.count }, (_, i) => ({
    id: `${shelf.id}-${i}`,
    ...SPINE_LOOKS[(booksBefore + i) % SPINE_LOOKS.length],
  }));

  return {
    ...shelf,
    spines,
    percent: Math.round((shelf.count / totalBooks) * 100),
    weight: spines.reduce((sum, spine) => sum + spine.width, 0),
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

const finished = shelves.find((shelf) => shelf.id === "finished");
const maxDecadeCount = Math.max(...decadeData.map((d) => d.count));
const topDecade = decadeData.reduce((best, d) =>
  d.count > best.count ? d : best
);

const shelfSummary = shelves
  .map((shelf) => `${shelf.count} ${shelf.label}`)
  .join(", ");

function Statistics() {
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
              {shelf.spines.map((spine) => (
                <span
                  key={spine.id}
                  className={`stats-spine stats-spine--${shelf.id}`}
                  style={{ flexGrow: spine.width, height: `${spine.height}%` }}
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
          Most of your books were first published in the {topDecade.label}.
        </p>

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
                    width: `${(decade.count / maxDecadeCount) * 100}%`,
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
      </div>
    </section>
  );
}

export default Statistics;
