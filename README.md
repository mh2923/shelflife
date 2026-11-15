# ShelfLife — Reading Tracker and Book Discovery

ShelfLife is a React web application developed for **ISTE 340 – Client Programming** at Rochester Institute of Technology (RIT). It helps readers discover books using the Open Library API, view book details, organize personal reading shelves, and see statistics about their saved books.

**Project theme:** Theme B — ShelfLife: Reading Tracker and Discovery  
**Team:** Team 2 — Team React  
**Semester:** Fall 2026  
**Instructor:** Dr. Ali Rodan

## Team Members

| Team Member | Primary Contribution |
| --- | --- |
| Muhammad Usman Habib | Discover page, API integration, shared state and localStorage, integration |
| Yehya Fayad | Navbar, routing, Book Details page, shelf-selection form |
| Abdulrahman Shurrab | My Shelves page and shelf interactions |
| Yousef Al-Salman | Reading Statistics page and visualizations |

All members contributed to testing, integration, and final project review.

## Features

### Discover Books
- Loads book results from the Open Library Search API, with **fiction** as the initial search.
- Searches by title or author and displays up to 12 results per request.
- Shows book covers when available, plus titles, authors, and publication years.
- Validates that submitted searches contain at least three characters.
- Displays loading, empty-results, and API-error states; API errors include a **Try Again** button.
- Offers **Back to Explore** to return to the initial results.

### Book Details
- Uses a dynamic `/book/:id` route to load the selected work.
- Shows title, authors, first publication year, cover, description, and subjects when available.
- Retrieves and displays information for up to five editions, including publisher, publication date, and ISBN where available.
- Includes a controlled form with validation for choosing **Want to Read**, **Reading**, or **Finished**.
- Adds new books or moves previously saved books, with confirmation messages.

### My Shelves
- Organizes saved books into **Want to Read**, **Reading**, and **Finished**.
- Displays shelf counts and saved book information.
- Supports moving books between shelves and removing books.
- Shows a placeholder when cover art is unavailable.

### Reading Statistics
- Displays total saved books and counts for each shelf.
- Calculates each shelf's percentage of the total.
- Visualizes shelf distribution using book-spine graphics.
- Groups books by publication decade when a valid publication year exists.
- Updates when saved books change.

## Technology

- React 19 and JavaScript (ES6+)
- Vite 8
- React Router 8 (`react-router` and `react-router/dom`)
- React Context and a custom `useBooks` hook
- Browser `localStorage`
- CSS with responsive layouts
- Open Library Search, Works, Authors, Editions, and Covers APIs

## Requirements and Setup

Install **Node.js and npm**. An internet connection is needed to retrieve new information from Open Library.

```bash
git clone https://github.com/mh2923/shelflife.git
cd shelflife
npm install
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173/`.

Other useful commands:

```bash
npm run lint      # Run ESLint
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
```

If using a provided source ZIP instead of GitHub, extract it, open a terminal in the folder containing `package.json`, then run `npm install` and `npm run dev`.

## Application Routes

| Route | Page |
| --- | --- |
| `/` | Discover Books |
| `/book/:id` | Book Details for an Open Library work |
| `/shelves` | My Shelves |
| `/statistics` | Reading Statistics |

React Router provides navigation between these pages without full-page reloads.

## Project Structure

```text
shelflife/
├── public/
│   └── shelflife-icon.png
├── src/
│   ├── assets/
│   │   └── shelflife-logo.png
│   ├── components/
│   │   ├── BookCard.jsx
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── context/
│   │   ├── BooksContext.js
│   │   ├── BooksProvider.jsx
│   │   └── useBooks.js
│   ├── pages/
│   │   ├── BookDetails.jsx
│   │   ├── BookDetails.css
│   │   ├── Discover.jsx
│   │   ├── Discover.css
│   │   ├── MyShelves.jsx
│   │   ├── MyShelves.css
│   │   ├── Statistics.jsx
│   │   └── Statistics.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

The `src/data` folder and earlier static sample-book file were removed after the application switched to live Open Library data. `node_modules/` and `dist/` are generated locally and are not part of the source structure above.

## How Data and State Work

1. **Discover** requests book results from Open Library and maps the API response into the fields needed by the UI.
2. **Book Details** requests additional information for the selected work, including authors and editions.
3. **BooksProvider** manages the shared `books` collection and exposes `addBook`, `moveBook`, and `removeBook` through React Context.
4. **My Shelves** and **Statistics** read the same shared collection, so changes appear throughout the application.
5. The provider loads saved books from `localStorage` on startup and saves the collection when it changes.

The storage key is `shelflife-books`. Saved books persist after refreshes and local development-server restarts **in the same browser profile**. They do not automatically sync between browsers, devices, or private-browsing sessions.

## Design

ShelfLife uses a classic bookstore-inspired interface: warm cream backgrounds, navy navigation and buttons, subtle brown accents, serif headings, and readable sans-serif body text. Responsive layouts adjust book grids, forms, and navigation for smaller screens.

## Testing Checklist

Before final submission, verify the following in the running application:

- [ ] Discover loads its initial fiction results.
- [ ] A valid search displays matching books.
- [ ] A search shorter than three characters shows validation feedback without making an API request.
- [ ] A valid search with no matches shows the empty-results message.
- [ ] API failures display an error and **Try Again** retries the request.
- [ ] Book Details loads title, author, description, subjects, and editions when available.
- [ ] The shelf form blocks submission until a valid shelf is selected.
- [ ] Adding, moving, and removing books updates My Shelves and Statistics.
- [ ] Saved books remain after refreshing in the same browser profile.
- [ ] Pages remain usable at desktop and mobile widths.
- [ ] `npm run lint` and `npm run build` complete successfully.

## Limitations

- Book information and cover availability depend on Open Library; some records have incomplete metadata.
- Live requests may fail when the API is unavailable or rejects a query.
- Storage is local to the browser profile; there are no user accounts or cloud synchronization.
- The application displays a limited set of search results and up to five editions per work.

## Development Progress

- **Phase 1:** Project topic, planning, and team responsibilities.
- **Phase 2:** React pages, components, routing, and initial sample content.
- **Phase 3:** Live Open Library API integration and loading/error states.
- **Phase 4:** Functional reading shelves, form validation, Context, localStorage, and styling.
- **Phase 5:** Final code review, testing, documentation, demo video, presentation slides, and AI-use reflection.

## Final Delivery

The final course submission also includes a group demonstration video, presentation slides, and an AI-use reflection/prompt log as required by the course. These deliverables are prepared separately from the running web application.
