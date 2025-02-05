import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Books from './pages/books/Books';
import BookDetails from './pages/book-details/BookDetails';

import './App.css'
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

