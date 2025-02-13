import { Link } from 'react-router-dom';
import './Header.css';
import { useAuthContext } from '../../context/AuthContext';
import { useLoaderContext } from '../../context/LoaderContext';

const Header = () => {
  const { user, logout } = useAuthContext();
  const { showLoader, hideLoader } = useLoaderContext();


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
                  {user.username}
                </Link>
                <ul className="dropdown-menu user-menu">
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
