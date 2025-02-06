import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";
import { deleteBook, fetchAllBooks } from "../../api/services/books";
import { Book } from "../../types/books-types";

import { useAuthContext } from "../../context/AuthContext";
import { useLoaderContext } from "../../context/LoaderContext";

import "./Books.css";


const Books = () => {

  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[] | null>(null);
  const { user } = useAuthContext();
  const { showLoader, hideLoader } = useLoaderContext();

  const handleDeleteBook = async (bookId: number | undefined) => {
    showLoader();
    await deleteBook(bookId as number).then(() => {
      getAllBooks();
    }).finally(() => {
      hideLoader();
    });
  };

  const handleAddBook = () => {
    navigate('/add-book');
  }

  // The callback to get all books
  const getAllBooks = useCallback(async () => {
    showLoader();  // Assuming this is a function that shows a loader
    try {
      const books = await fetchAllBooks(); // Call the correct function to fetch books
      setBooks(books); // Set books in the state
    } catch (err) {
      console.log(err); // Handle any error
    } finally {
      hideLoader(); // Assuming this hides the loader
    }
  }, []);

  // Assuming you have a useEffect or some event to trigger fetching books
  useEffect(() => {
    getAllBooks(); // Fetch books on component mount or on some trigger
  }, [getAllBooks]); // Adding getAllBooks as dependency to useCallback

  return (
    <>
      { user && (
        <div className="user-actions-add-book">
          <button className="buy-now-btn" onClick={handleAddBook}>Add Book</button>
        </div>
      )}
      <div className="book-list">
        {books?.map((book) => (
          <div className="book-card-container" key={book.id}>
            { user && (
              <span className="book-card-delete-action" onClick={() => handleDeleteBook(book.id)}>
                <i className="fa-solid fa-circle-xmark"></i>
              </span>
            )}
            <BookCard book={book} />
          </div>
        ))}
      </div>

      <div className="store-empty">
        {(!books || books.length === 0) && (
          <p> No Books Available, Please try someother times...</p>
        )}
      </div>
    </>
  );
};

export default Books;
