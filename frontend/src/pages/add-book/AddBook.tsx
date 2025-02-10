import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import './AddBook.css';
import { addBook } from '../../api/services/books';
import { Book } from '../../types/books-types';
import { showToast } from '../../utils/toastUtils';
import { useLoaderContext } from '../../context/LoaderContext';

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required")
  .positive()
  .integer()
  .min(0, "Min is 0"),
  publisher: Yup.string().required("Publisher is required"),
  publishedDate: Yup.date().required("Published date is required"),
  pages: Yup.number().required("Pages is required")
  .positive()
  .integer()
  .min(0, "Min is 0"),
});
const AddBook = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoaderContext();

  const handleBackNav = () => {
    navigate("/");
  }

  const handleAddBooks = (data: Book) => {
    showLoader();
    addBook(data).then(() => {
      handleBackNav();
      showToast("Book added successfully!", 'success');
    }).finally(() => {
      hideLoader();
    });
  }

  return (
    <>
      <label className='back-nav' onClick={handleBackNav}>
        <i className="fa-solid fa-arrow-left"></i> Back
      </label>
      
      <div className="add-book-container">
        
        <div className="add-book-header">
          <h2 className="add-book-title">Create Book</h2>
        </div>

        <div className="add-book-body">
          <div className="form-container">
            <Formik
              initialValues={{
                title: "",
                author: "",
                description: "",
                price: "",
                publisher: "",
                publishedDate: "",
                pages: ""
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleAddBooks(values)
              }}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="Enter book title"
                  />
                  <ErrorMessage name="title" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <Field
                    type="text"
                    id="author"
                    name="author"
                    className="form-control"
                    placeholder="Enter book author"
                  />
                  <ErrorMessage name="author" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="genre">Description</label>
                  <Field
                    as="textarea" // Specifies that this is a textarea
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Enter book description"
                    rows="4"
                  />
                  <ErrorMessage name="description" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="genre">Price</label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                    placeholder="Enter price"
                  />
                  <ErrorMessage name="price" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="genre">Publisher</label>
                  <Field
                    type="text"
                    id="publisher"
                    name="publisher"
                    className="form-control"
                    placeholder="Enter book publisher"
                  />
                  <ErrorMessage name="publisher" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="publishedDate">Published Date</label>
                  <Field
                    type="date"
                    id="publishedDate"
                    name="publishedDate"
                    className="form-control"
                  />
                  <ErrorMessage name="publishedDate" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="genre">Total Pages</label>
                  <Field
                    type="number"
                    id="pages"
                    name="pages"
                    className="form-control"
                    placeholder="Number of pages"
                  />
                  <ErrorMessage name="pages" component="div" className="error-message" />
                </div>

                <div className="form-group add-books">
                  <button type="submit" className="submit-btn">Submit</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBook;
