import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./ManageBookStockForm.css"

const ManageBookStockForm = ({ bookInfo, onSubmit }) => {
  // Formik initial values
  const initialValues = {
    bookAvailability: ''
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    bookAvailability: Yup.number()
      .required('Available Copies is required')
      .min(0, 'Available Copies must be 0 or greater') 
      .typeError('Available Copies must be a valid number')
  });

  // Submit handler
  const handleSubmit = ({bookAvailability}) => {
    onSubmit(bookAvailability);
  };

  return (
    <div className="manage-book-stocks-modal container">
      <p>Available Copies: {bookInfo?.availableCopies}</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="bookAvailability" className="form-label">Update Stocks/Copies</label>
            <Field
              type="text"
              id="bookAvailability"
              name="bookAvailability"
              className="form-control"
            />
            <ErrorMessage name="bookAvailability" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ManageBookStockForm;
