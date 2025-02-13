import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";
import { fetchAllBooks, fetchAllBooksBySearch } from "../../api/services/books";
import { PaginatedResponse } from "../../types/common-types";

import { useAuthContext } from "../../context/AuthContext";
import { useLoaderContext } from "../../context/LoaderContext";

import "./Books.css";
import BookSearch from "../../components/BookSearch/BookSearch";
import PaginationComponent from "../../components/Pagination/Pagination";
import { Book } from "../../types/books-types";


const Books = () => {

  const navigate = useNavigate();
  const [listOfBooks, setListOfBooks] = useState<PaginatedResponse<Book> | null>(null);
  const { user } = useAuthContext();
  const { showLoader, hideLoader } = useLoaderContext();

  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageSize = function (pageSize: number) {
    setPageSize(pageSize)
  }

  const handleAddBook = () => {
    navigate('/add-book');
  }

  const fetchBooksBySearch = async (searchTerm: string) => {
    if (!searchTerm) return getAllBooks(currentPage, pageSize); // Don't search if the search term is empty

    showLoader();  // Assuming this is a function that shows a loader
    try {
      const booksResponse = await fetchAllBooksBySearch(searchTerm); // Call the correct function to fetch books
      setListOfBooks(booksResponse);
      setTotalPages(booksResponse?.totalCount)
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
  const getAllBooks = useCallback(async (_currentPage: number, _pageSize: number) => {
    const params = {
      page: _currentPage,
      size: _pageSize
    }
    showLoader();  // Assuming this is a function that shows a loader
    try {
      const booksResponse = await fetchAllBooks(params); // Call the correct function to fetch books
      setListOfBooks(booksResponse); // Set books in the state
      setTotalPages(booksResponse?.totalCount)
    } catch (err) {
      console.log(err); // Handle any error
    } finally {
      hideLoader(); // Assuming this hides the loader
    }
  }, []);

  // Assuming you have a useEffect or some event to trigger fetching books
  // Fetch data whenever the current page changes
  useEffect(() => {
    console.log("Fetching books", pageSize)
    getAllBooks(currentPage, pageSize); // Fetch books on component mount or on some trigger
  }, [getAllBooks, currentPage, pageSize]); // Adding getAllBooks as dependency to useCallback

  return (
    <>
      { user && (
        <div className="user-actions-add-book">
          <BookSearch onSearch={(searchTerm: string) => handleOnSearchBooks(searchTerm)} />
          <button className="buy-now-btn" onClick={handleAddBook}>Add Book</button>
        </div>
      )}
        
      <div className="paginations-list">
        {/* Pagination controls */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage} // Pass setCurrentPage to PaginationComponent to update the page
            pageSize={pageSize}
            onPageSizeChange={handlePageSize} // Pass setPageSize to update page size
          />
      </div>

      { listOfBooks && listOfBooks?.data.length > 0 && (
        <>
          <div className="book-list">
            {listOfBooks?.data.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
      

      <div className="store-empty">
        {(!listOfBooks?.data || listOfBooks?.data.length === 0) && (
          <p> No Books Available</p>
        )}
      </div>
    </>
  );
};

export default Books;
