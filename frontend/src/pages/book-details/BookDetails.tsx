import { useNavigate, useParams } from 'react-router-dom';
import './BookDetails.css';
import { useEffect, useState } from 'react';
import { getBookById } from '../../api/services/books';
import { Book } from '../../types/books-types';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>();

  const handleBackNav = () => {
    navigate("/");
  }

  useEffect(() => {
    getBookById(id).then(book => {
      setBook(book);
    });
  }, []);


  return (
    <>
      <label className='back-nav' onClick={handleBackNav}>
        <i className="fa-solid fa-arrow-left"></i> Back
      </label>
      
      <div className="book-detail-container">
        
        <div className="book-detail-header">
          <h2 className="book-detail-title">{book?.title}</h2>
          <h4 className="book-detail-author">by {book?.author}</h4>
        </div>

        <div className="book-detail-body">
          <div className="book-detail-image">
            <img src='../../../books.jpeg' alt={book?.title} />
          </div>

          <div className="book-detail-info">
            <p className="book-detail-price">${book?.price}</p>
            <p className="book-detail-description">{book?.description}</p>
            <p className="book-detail-publisher">Publisher: <span className='book-detail-values'>{book?.publisher}</span></p>
            <p className="book-detail-year">Year: <span className='book-detail-values'>{book?.publishedYear}</span></p>
            <p className="book-detail-pages">Pages: <span className='book-detail-values'>{book?.pages}</span></p>

            <div className="book-detail-actions">
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="buy-now-btn">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
