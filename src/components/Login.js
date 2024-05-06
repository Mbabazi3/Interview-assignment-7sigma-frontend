import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidation } from "./loginValidation";

export default function Login() {
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  // const loginHandler = async (username, password) => {

  // };

  // curl -X POST -H "Content-Type: multipart/form-data" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3MTUwMTMwMTYsImV4cCI6MzYwMTcxNTAxMzAxNn0.Pk-6M_OWCiqwQn8RVddjtP9n6sHVtvcxv1ZqO6mGS0c" -F "file=./pic.png" http://localhost:3000/upload/upload

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={loginValidation}
      onSubmit={async (values, { resetForm }) => {
        setIsSubmitting();
        await axios
          .post("http://localhost:5001/auth/login", values)
          .then((response) => {
            const resData = response.data;
            const token = resData.jwtToken;
            localStorage.setItem("token", token);

            dispatch(login(resData));
            setStatusMessage(resData.message);
          })
          .catch((error) => {
            console.log(error);
            setStatusMessage(error.response.data.message);
          })
          .finally(() => {
            resetForm();
            setIsSubmitting(false);
          });
      }}
    >
      {(formik) => {
        const { errors, touched, handleSubmit } = formik;
        return (
          <Form className="form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="control-row">
              <div className="control no-margin">
                <label htmlFor="email">Username</label>
                <ErrorMessage name="username" component="p" className="error" />
                <Field
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className={
                    errors.username && touched.username ? "input-error" : null
                  }
                />
              </div>

              <div className="control no-margin">
                <label htmlFor="password">Password</label>
                <ErrorMessage name="password" component="p" className="error" />
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
              </div>

              <button type="submit" className="button">
                Login
              </button>
            </div>
            <p
              className={
                statusMessage === "Login Successful"
                  ? "sucess-msg"
                  : "error-msg"
              }
            >
              {!isSubmitting && statusMessage}
            </p>
          </Form>
        );
      }}
    </Formik>
  );
}
