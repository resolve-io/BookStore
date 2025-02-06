import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Books from './pages/books/Books';
import BookDetails from './pages/book-details/BookDetails';

import './App.css'
import Header from './components/Header/Header';
import AddBook from './pages/add-book/AddBook';
import LoginForm from './pages/login/LoginForm';
import Loader from './components/Loader/Loader';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/add-book/" element={<AddBook />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
      <Loader />
    </Router>
  );
}

export default App;

