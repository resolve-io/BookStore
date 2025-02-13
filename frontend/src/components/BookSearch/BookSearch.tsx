/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Field, Form } from 'formik';
import "./BookSearch.css"
import { debounce } from 'lodash'


const BookSearch = ({ onSearch }: any) => {

  // Debounced function to call fetchData
  const debouncedFetchBooks = debounce((searchQuery:string) => {
    onSearch(searchQuery);
  }, 500); // 500ms debounce delay


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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e); // Formik's default onChange
                  debouncedFetchBooks(e.target.value); // Update searchTerm state
                }}
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
