import { useNavigate, useParams } from 'react-router-dom';
import './BookDetails.css';
import { useCallback, useEffect, useState } from 'react';
import { getBookById } from '../../api/services/books';
import { Book, BookAvailability } from '../../types/books-types';
import { useAuthContext } from '../../context/AuthContext';
import { useLoaderContext } from '../../context/LoaderContext';
import { showToast } from '../../utils/toastUtils';
import CommonModal from '../../components/CommonModal/CommonModal';
import ManageBookStockForm from '../../components/ManageBookStocks/ManageBookStockForm';
import { manageBookStock } from '../../api/services/book-availability';
import { placeOrder } from '../../api/services/order';
import { number } from 'yup';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>();
  const [showManageBookStocksModal, setShowManageBookStocksModal] = useState<boolean>(false);
  const { user } = useAuthContext();
  const { showLoader, hideLoader } = useLoaderContext();

  const [quantity, setQuantity] = useState(0);

  // Increment the quantity
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrement the quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

   // Handle manual input change
   const handleQuantityChange = (event) => {
    const value = event.target.value;
    // Make sure the input is a valid positive number
    if (value === "" || /^[1-9][0-9]*$/.test(value)) {
      setQuantity(Number(value));
    }
  };

  const handleBackNav = () => {
    navigate("/");
  }

  const handleManageBookStocks = () => {
    setShowManageBookStocksModal(true);
  }

  const closeModal = () => {
    setShowManageBookStocksModal(false);
  }

  const onSubmitManageBookStocks = (uodateAvailableCopies: number) => {
    const payload: BookAvailability = {
      bookId: book?.id,
      availableCopies: uodateAvailableCopies
    }
    showLoader();
    manageBookStock(payload).then(() => {
      showToast("Updated Stocks successfully!", 'success');
    }, error => {
      if (error.status === 400) {
        showToast(error.response.data.message, 'error');
      }
    }).finally(() => {
      closeModal();
      hideLoader();
      fetchBookById();
    });
  }

  const handleBuyNow = () => {
    showLoader();
    placeOrder(book?.id as number, quantity).then(() => {
      showToast("Order placed successfully!", 'success');
      setQuantity(0);
    }, error => {
      if (error.status === 400) {
        showToast(error.response.data.message, 'error');
      }
    }).finally(() => {
      hideLoader();
      fetchBookById();
    });
  }

   // Convert the `publishedDate` to a string (if it exists)
   const formattedPublishedDate = book?.publishedDate
   ? new Date(book.publishedDate).toLocaleDateString() // or use .toString(), .toDateString(), etc.
   : "No date available"; // Fallback if `publishedDate` is undefined

  
  const fetchBookById = useCallback(async () => {
    getBookById(id).then(book => {
      setBook(book);
    });
  }, []);

  const getBookCopies = (_bookAvailability: number | undefined) => {
    return _bookAvailability && _bookAvailability > 0;
  }

  useEffect(() => {
    fetchBookById();
  }, []);


  return (
    <>
      <label className='back-nav' onClick={handleBackNav}>
        <i className="fa-solid fa-arrow-left"></i> Back
      </label>
      
      <div className="book-detail-container">

        <div className="book-detail-body">
          <div className="book-detail-image">
            <img src='../../../books-pic.jpeg' alt={book?.title} />
          </div>

          <div className="book-detail-info">
            <div className="book-detail-header">
              <h2 className="book-detail-title">{book?.title}</h2>
              <h4 className="book-detail-author">by {book?.author}</h4>
            </div>
            <p className="book-detail-price">${book?.price}</p>
            <div className="book-detail-availableCopies-container">
              { getBookCopies(book?.availableCopies) === true && (
                <span>Hurry Up, Only {book?.availableCopies} left!.</span>
              )}
              { !getBookCopies(book?.availableCopies) && (
                <span className='no-copies'>Out of Stock!.</span>
              )}
            </div>
            <p className="book-detail-description">{book?.description}</p>
            <p className="book-detail-publisher">Publisher: <span className='book-detail-values'>{book?.publisher}</span></p>
            <p className="book-detail-year">Published Date: <span className='book-detail-values'>{formattedPublishedDate}</span></p>
            <p className="book-detail-pages">Pages: <span className='book-detail-values'>{book?.pages}</span></p>
            
            { !user && (
              <div className="quantity-container">
                <label className="">Quantity : </label>
                <div className="quantity-controls">
                  <button onClick={decrementQuantity} disabled={!getBookCopies(book?.availableCopies)}>-</button>
                  <span>{quantity}</span>
                  {/* Input field to update quantity */}
                  {/* <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    style={{ width: "50px", textAlign: "center" }}
                  /> */}
                  <button onClick={incrementQuantity} disabled={!getBookCopies(book?.availableCopies)}>+</button>
                </div>
              </div>
            )}

            <div className="book-detail-actions">
              {/* <button className="add-to-cart-btn">Add to Cart</button> */}
              { user && (
                <button className="manage-stocks-btn" onClick={handleManageBookStocks}>Manage Stocks</button>
              )}
              { !user && (
                <button className="buy-now-btn" onClick={handleBuyNow} disabled={!quantity}>Buy Now</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reusable Modal */}
      <CommonModal
        show={showManageBookStocksModal}
        onClose={closeModal}
        title="Manage Book Stocks"
        onConfirm={closeModal}
        confirmText="Confirm"
        showFooter={false}
      >
        <ManageBookStockForm bookInfo={book} onSubmit={(updateAvailability: number) => onSubmitManageBookStocks(updateAvailability)} />
      </CommonModal>
    </>
  );
};

export default BookDetails;
