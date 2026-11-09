import { useEffect, useState } from "react";
import { BooksContext } from "./BooksContext";

export function BooksProvider({ children }) {
  
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem("shelflife-books");

      if (!savedBooks) {
        return [];
      }

      const parsedBooks = JSON.parse(savedBooks);

      return Array.isArray(parsedBooks) ? parsedBooks : [];
    } catch (error) {
      console.error("Could not load saved books:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shelflife-books", JSON.stringify(books));
  }, [books]);

  function addBook(book) {
    setBooks((currentBooks) => {
      const alreadySaved = currentBooks.some(
        (savedBook) => savedBook.id === book.id
      );

      if (alreadySaved) {
        return currentBooks;
      }

      return [...currentBooks, book];
    });
  }

  function moveBook(id, status) {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === id ? { ...book, status } : book
      )
    );
  }

  function removeBook(id) {
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== id)
    );
  }

  return (
    <BooksContext.Provider value={{ books, addBook, moveBook, removeBook }}>
      {children}
    </BooksContext.Provider>
  );
}

