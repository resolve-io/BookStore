import { useNavigate } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
  const { title, author, price, description, availableCopies } = book;
  const navigate = useNavigate();

  const handleView = () => {
    navigate('/book/' + book.id);
  }

  return (
    <div className="book-card">
      {/* <div className="book-card-image">
        <img src={image} alt={title} />
      </div> */}
      <div className="book-card-content">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">by {author}</p>
        <p className="book-price">${price}</p>
        <p className="book-description multi-line-ellipsis">{description}</p>
        <span className='book-stocks-availablity'>
          { availableCopies > 0 && <span>Hurry Up, Only {availableCopies} left!.</span> }
          { !availableCopies && <span className='no-copies'>Out of Stock!.</span> }
          <button className="book-card-button" onClick={handleView}>View</button>
        </span>
      </div>
    </div>
  );
};

export default BookCard;
