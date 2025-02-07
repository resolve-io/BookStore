import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";
import { fetchAllBooks, fetchAllBooksBySearch } from "../../api/services/books";
import { Book } from "../../types/books-types";

import { useAuthContext } from "../../context/AuthContext";
import { useLoaderContext } from "../../context/LoaderContext";

import "./Books.css";
import BookSearch from "../../components/BookSearch/BookSearch";


const Books = () => {

  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[] | null>(null);
  const { user } = useAuthContext();
  const { showLoader, hideLoader } = useLoaderContext();

  const handleAddBook = () => {
    navigate('/add-book');
  }

  const fetchBooksBySearch = async (searchTerm: string) => {
    if (!searchTerm) return getAllBooks(); // Don't search if the search term is empty

    showLoader();  // Assuming this is a function that shows a loader
    try {
      const books = await fetchAllBooksBySearch(searchTerm); // Call the correct function to fetch books
      setBooks(books);
    } catch (err) {
      console.log(err); // Handle any error
    } finally {
      hideLoader(); // Assuming this hides the loader
    }
  }

  const handleOnSearchBooks = (searchTerm: string) => {
    fetchBooksBySearch(searchTerm);
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
          <BookSearch onSearch={(searchTerm: string) => handleOnSearchBooks(searchTerm)} />
          <button className="buy-now-btn" onClick={handleAddBook}>Add Book</button>
        </div>
      )}
      <div className="book-list">
        {books?.map((book) => (
            <BookCard key={book.id} book={book} />
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
