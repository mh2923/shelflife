# ShelfLife

**ShelfLife – Reading Tracker and Book Discovery**

ShelfLife is a React-based reading tracker and book discovery application developed for **ISTE 340 – Client Programming** at Rochester Institute of Technology (RIT).

The application is designed to help readers discover books, view book information, organize their reading shelves, and explore simple reading statistics.

This repository currently contains the **Phase 2 – Static Interface** implementation.

## Team 2 – Team React

| Team Member | Student ID |
|---|---|
| Muhammad Usman Habib | 761005924 |
| Yehya Fayad | 772001680 |
| Abdulrahman Shurrab | 784003726 |
| Yousef Al-Salman | 754001885 |

## Project Theme

**Theme B – ShelfLife: Reading Tracker and Discovery**

The project uses the Open Library API as its planned source of book information. During Phase 2, the application uses hardcoded sample book data to demonstrate the interface before live API integration.

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- React Router DOM
- CSS
- Open Library Covers API (book cover images)

## Phase 2 Features

The Phase 2 implementation includes four pages:

### 1. Discover Books

- Displays a collection of sample books.
- Shows book covers, titles, authors, and publication years.
- Uses a reusable `BookCard` component.
- Includes a search interface for future implementation.
- Allows navigation to individual book details.

### 2. Book Details

- Displays detailed information about a selected book.
- Shows its cover, title, author, publication year, description, and subjects.
- Uses dynamic routes to display the selected book.
- Includes a shelf selection interface for future functionality.

### 3. My Shelves

- Displays books organized into three reading categories:
  - Want to Read
  - Reading
  - Finished
- Uses sample book data and book cover images.
- Allows users to switch between shelf tabs.
- Displays the number of books in each category.
- Includes placeholder controls for adding, moving, and removing books.

### 4. Reading Statistics

- Displays the total number of books.
- Shows the number of books in each reading category.
- Includes a visual bookshelf representation of shelf distribution.
- Displays book counts grouped by publication decade.
- Uses hardcoded sample data for Phase 2.

## React Concepts Implemented

- Functional React components
- Reusable components and props
- JSX
- JavaScript arrays and objects
- Rendering lists using `.map()` and unique keys
- Conditional rendering
- React Router navigation
- Dynamic routes using `useParams()`
- Basic state management using `useState()`
- Responsive styling using CSS

## Project Structure

```text
src/
├── assets/
│   └── shelflife-logo.png
├── components/
│   ├── BookCard.jsx
│   ├── Navbar.jsx
│   └── Navbar.css
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

## How to Run the Project

**Prerequisites:**

- Node.js
- npm

**Steps:**

1. Clone the GitHub repository or extract the submitted ZIP file.
2. Open the project folder in Visual Studio Code or a terminal.
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

## Application Routes

| Route | Page |
|---|---|
| `/` | Discover Books |
| `/book/:id` | Book Details |
| `/shelves` | My Shelves |
| `/statistics` | Reading Statistics |

React Router is used to navigate between pages without full-page reloads.

## Phase 3 – Live Data Integration

ShelfLife now uses the Open Library API to retrieve real book data.

### Discover Books
- Fetches books from the Open Library Search API using async/await.
- Displays fiction-related books on the initial Explore page.
- Allows users to search for books by title or author.
- Displays book covers, titles, authors, and publication years.
- Provides a Back to Explore button to return to the initial results.
- Handles missing book covers with a "No Cover Available" message.

### API States
- Loading: Displays a loading message while fetching books.
- Error: Displays a readable message when an API request fails.
- Empty: Displays a message when no matching books are found.
- Success: Displays the books returned by the API.

If a request fails, users can click Try Again to repeat the request or use the search bar to search for another book.

### Phase 3 Testing
The following scenarios are tested before submission:

- Initial book loading from the API.
- Searching for different books.
- Searching for a title with no matching results.
- Simulating an offline connection using browser Developer Tools.
- Recovering from an API error using the Try Again button.
- Navigating between the application pages.

A screenshot of the offline error state is included as evidence of testing.

### Features Reserved for Phase 4
My Shelves and Reading Statistics currently use sample data. Functional shelf management, shared state, and localStorage persistence are planned for Phase 4.

## Current Project Status

**Phase 3 – Live Data**

The Discover page is connected to the Open Library API and supports live book searching, loading, error, and empty states.

The My Shelves and Reading Statistics pages retain their Phase 2 sample data and interface functionality.

Shelf management, persistent storage, and dynamic reading statistics will be implemented in Phase 4.

## Planned Future Development

**Phase 3 – Live Data**
- Integrate the Open Library API.
- Implement book searching and filtering.
- Display loading, error, and empty states.

**Phase 4 – Interaction and Polish**
- Implement functional shelf management.
- Add form validation.
- Use React Context for shared state.
- Save reading shelves or preferences using localStorage.

**Phase 5 – Final Delivery**
- Complete application testing and improvements.
- Prepare the final demonstration and presentation.
- Submit the required project documentation and AI-use reflection.

## Course Information

**Course:** ISTE 340 – Client Programming  
**Instructor:** Dr. Ali Rodan  
**Semester:** Fall 2026  
**Project:** Group Project – ShelfLife  
**Current Phase:** Phase 3 – Live Data
