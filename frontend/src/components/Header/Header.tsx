import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search logic (e.g., filter books or redirect to a search results page)
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">BookStore</Link>
      </div>
      <div className="right-container">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <nav className="nav-links">
          <ul>
            <li>
              <Link to="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </Link>
            </li>
            <li>
              <Link to="/account">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
