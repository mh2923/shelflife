
import { useContext } from "react";
import { BooksContext } from "./BooksContext";

export function useBooks() {
  return useContext(BooksContext);
}
