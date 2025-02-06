import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuthContext } from '../../context/AuthContext';
import { useLoaderContext } from '../../context/LoaderContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuthContext();
  const { showLoader, hideLoader } = useLoaderContext();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search logic (e.g., filter books or redirect to a search results page)
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = async () => {
    showLoader();
    await logout();
    hideLoader();
  }

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
          <ul className='nav-ul'>
            <li>
              <Link to="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </Link>
            </li>
            {/* Conditionally render based on whether the user is logged in */}
            {user ? (
              <li className="dropdown">
                <Link to="#" className="dropdown-toggle">
                  Palanivel R <i className="fas fa-caret-down"></i>
                </Link>
                <ul className="dropdown-menu">
                  {/* <li>
                    <Link to="/settings">Settings</Link>
                  </li> */}
                  <li>
                    <Link to="/" onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
