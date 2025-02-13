import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { AuthUser } from "../../types/auth-types";
import { useLoaderContext } from "../../context/LoaderContext";
import { useState } from "react";
import { authUser } from "../../api/services/auth";

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
  password: Yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);

  const { saveAuthUser } = useAuthContext();
  const { showLoader, hideLoader } = useLoaderContext();

  const handleSubmit = async (user: AuthUser) => {
    showLoader();
    // Here, you would send a request to the backend to authenticate the user
    // For this example, let's assume a successful login:
    showLoader();  // Assuming this is a function that shows a loader
    try {
      const authToken = await authUser(user); // Call the correct function to fetch books
      saveAuthUser({...user, authToken})
      navigate("/");
    } catch {
      setAuthErrorMessage("Invalid username or password")
    } finally {
      hideLoader(); // Assuming this hides the loader
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <Formik<AuthUser>
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
        >
          <Form className="login-form">
            <div className="login-form-group">
              <label htmlFor="username">username</label>
              <Field
                type="username"
                id="username"
                name="username"
                className="form-control"
                placeholder="Enter your username"
              />
              <ErrorMessage name="username" component="div" className="error-message" />
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

            {
              authErrorMessage && (
                <div className="error-message invalid">{authErrorMessage}</div>
              )
            }

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
