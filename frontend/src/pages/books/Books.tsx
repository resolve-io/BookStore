// src/components/BooksList.js

import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import { getAllBooks } from "../../api/services/books";
import { Book } from "../../types/books-types";

const Books = () => {

  const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
      getAllBooks().then((resp) => {
        console.log(resp)
        setBooks(resp);
      });
    }, []);

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default Books;
