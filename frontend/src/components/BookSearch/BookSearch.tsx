import { Formik, Field, Form } from 'formik';
import "./BookSearch.css"

const BookSearch = ({ onSearch }) => {
  return (
    <div className='book-search-form-container'>
      <Formik
        initialValues={{ searchTerm: '' }}
        onSubmit={(values) => {
          onSearch(values.searchTerm);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div>
              <Field
                id="searchTerm"
                name="searchTerm"
                type="text"
                value={values.searchTerm}
                onChange={handleChange}
                placeholder="Search for books"
              />
            </div>
            <button type="submit" className='search-btn'>
                <i className="fas fa-search"></i>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookSearch;
