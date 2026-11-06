import { useContext } from "react";
import { BooksContext } from "./BooksProvider";

export function useBooks() {
  return useContext(BooksContext);
}