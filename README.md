# ShelfLife

**ShelfLife – Reading Tracker and Book Discovery**

ShelfLife is a React-based reading tracker and book discovery application developed for **ISTE 340 – Client Programming** at Rochester Institute of Technology (RIT).

The application helps readers discover books, view book information, organize their reading shelves, and explore reading statistics.

## Team 2 – Team React

| Team Member | Student ID |
| Muhammad Usman Habib | 761005924 |
| Yehya Fayad | 772001680 |
| Abdulrahman Shurrab | 784003726 |
| Yousef Al-Salman | 754001885 |

## Project Theme

**Theme B – ShelfLife: Reading Tracker and Discovery**

ShelfLife uses the Open Library API to retrieve book information. Users can search for books and save them to their own reading shelves. Saved books are stored locally in the browser.

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- React Router v8
- CSS
- Open Library API and Open Library Covers API
- React Context
- Browser `localStorage`

## Application Features

### 1. Discover Books

- Fetches real book data from the Open Library Search API.
- Displays books with their titles, authors, publication years, and covers when available.
- Uses a reusable `BookCard` component.
- Allows users to search for books by title or author.
- Provides a Back to Explore option to return to the initial results.
- Displays loading, error, and empty-result messages.
- Includes a Try Again button when an API request fails.
- Allows navigation to individual book details.

### 2. Book Details

- Displays information about a selected book from Open Library.
- Shows its cover, title, author, publication year, description, and subjects when available.
- Uses dynamic routes to display the selected book.
- Includes a controlled form for choosing a reading shelf.
- Validates the shelf selection before submitting.
- Displays a specific error message when no shelf is selected and clears it after correction.
- Allows users to add a book to a shelf or change its shelf if it is already saved.
- Displays a confirmation message after a successful action.

### 3. My Shelves

- Organizes saved books into three categories:
  - Want to Read
  - Reading
  - Finished
- Displays the books saved in each category.
- Allows users to switch between shelf tabs.
- Shows the number of books in each category.
- Allows users to move books between shelves.
- Allows users to remove books from their shelves.
- Updates automatically when saved book data changes.

### 4. Reading Statistics

- Displays the total number of saved books.
- Shows the number of books in each reading category.
- Calculates shelf percentages based on saved books.
- Includes a visual bookshelf representation of shelf distribution.
- Displays book counts grouped by publication decade when publication years are available.
- Updates automatically when books are added, moved, or removed.

## React Concepts Implemented

- Functional React components
- Reusable components and props
- JSX
- JavaScript arrays and objects
- Rendering lists using `.map()` and unique keys
- Conditional rendering
- React Router navigation and dynamic routes
- State management using `useState()`
- Side effects and API requests using `useEffect()` and `fetch()`
- Controlled forms and validation
- React Context and a custom `useBooks()` hook
- Browser persistence using `localStorage`

## Project Structure

```text
src/
├── assets/
│   └── shelflife-logo.png
├── components/
│   ├── BookCard.jsx
│   ├── Navbar.jsx
│   └── Navbar.css
├── context/
│   ├── BooksContext.js
│   ├── BooksProvider.jsx
│   └── useBooks.js
├── data/
│   └── books.js
├── pages/
│   ├── Discover.jsx
│   ├── Discover.css
│   ├── BookDetails.jsx
│   ├── BookDetails.css
│   ├── MyShelves.jsx
│   ├── MyShelves.css
│   ├── Statistics.jsx
│   └── Statistics.css
├── App.jsx
├── main.jsx
└── index.css
```

The project also includes `index.html` in the root folder and the ShelfLife favicon in `public/`.

## How to Run the Project

**Prerequisites:**

- Node.js
- npm

**Steps:**

1. Clone the GitHub repository:

   ```bash
   git clone https://github.com/mh2923/shelflife.git
   ```

2. Open the project folder:

   ```bash
   cd shelflife
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal, usually:

   ```text
   http://localhost:5173/
   ```

An internet connection is required to retrieve new book information from Open Library. Previously saved books are stored in the browser's `localStorage`.

## Application Routes

| Route | Page |
| `/` | Discover Books |
| `/book/:id` | Book Details |
| `/shelves` | My Shelves |
| `/statistics` | Reading Statistics |

React Router is used to navigate between pages without full-page reloads.

## Phase 3 – Live Data Integration

In Phase 3, ShelfLife was connected to the Open Library API to replace sample book results with real data.

- Implemented live book searching using `fetch()` and `async/await`.
- Displayed book information and covers from Open Library.
- Added loading, error, empty-result, and success states.
- Added a Try Again option for failed API requests.
- Tested searches, navigation, and offline API error handling.

## Phase 4 – Interaction and Polish

Phase 4 added functional reading shelves, shared state management, form validation, and persistent storage.

### Book Details Form

- Uses a controlled shelf selection dropdown.
- Blocks submission when no valid shelf is selected.
- Shows a useful validation error beside the form field.
- Clears the error when the selection is corrected.
- Displays confirmation after adding or moving a book.

### React Context and localStorage

- Uses React Context to share saved books across Book Details, My Shelves, and Statistics.
- Provides `addBook()`, `moveBook()`, and `removeBook()` functions.
- Saves book data to `localStorage` when it changes.
- Restores saved books when the application loads or refreshes.
- Handles missing or invalid saved data without crashing.
- Stores data separately for each browser profile, as expected with `localStorage`.

### Functional Shelves and Statistics

- Users can add, move, and remove books.
- Shelf counts update when saved books change.
- Statistics uses actual saved books instead of hardcoded sample counts.
- Shelf distribution and publication decade information update dynamically.

### Styling and Polish

- Uses a consistent cream-and-navy bookstore design with brown accents.
- Includes responsive styling for different screen sizes.
- Uses a custom ShelfLife browser tab title and favicon.
- Removes default Vite branding from the application interface.

## Phase 4 Testing

The application was checked for the following scenarios:

- Loading and searching for books using Open Library.
- Displaying a message for searches with no results.
- Displaying an error when an API request fails.
- Submitting the Book Details form without selecting a shelf.
- Clearing the validation error after selecting a shelf.
- Adding books to reading shelves and avoiding duplicate entries.
- Moving and removing saved books.
- Updating shelf counts and Statistics after changes.
- Keeping saved books after refreshing or restarting the development server in the same browser profile.
- Handling missing or invalid `localStorage` data.
- Navigating between pages and checking consistent styling.

## Current Project Status

**Phase 4 – Interaction and Polish**

ShelfLife supports live book discovery, book details, validated shelf selection, functional reading shelves, dynamic reading statistics, and browser-based persistence using React Context and `localStorage`.

The next stage is Phase 5 – Final Delivery.

## Planned Future Development

**Phase 5 – Final Delivery**

- Perform final application testing and fix any remaining issues.
- Complete and review the project README and source code.
- Prepare the group demonstration video and presentation slides.
- Prepare the AI-use reflection and prompt log required by the course.
- Present the completed application as a team.

## Course Information

**Course:** ISTE 340 – Client Programming  
**Instructor:** Dr. Ali Rodan  
**Semester:** Fall 2026  
**Project:** Group Project – ShelfLife  
**Current Phase:** Phase 4 – Interaction and Polish
