import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { AuthUser } from "../../types/auth-types";
import { useLoaderContext } from "../../context/LoaderContext";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useAuthContext();
  const { showLoader, hideLoader } = useLoaderContext();

  const handleSubmit = async (cred: AuthUser) => {
    showLoader();
    // Here, you would send a request to the backend to authenticate the user
    // For this example, let's assume a successful login:
    login(cred).then(() => {
      hideLoader();
      navigate("/");
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
        >
          <Form className="login-form">
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="login-form-group">
              <button type="submit" className="submit-btn">Login</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
