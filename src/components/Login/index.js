import { Form, Formik, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import loginLogo from "../../assets/images/login_logo.png";
import ButtonComponent from "../../elements/UI/ButtonComponent";
import "./login.scss";


const Login = () => {
  const initialValues = {
    username: "",
    clientCode: "",
    password: "",
  };

  const handleSubmit = () => {

  };
  return (
    <>
      <div className="login-page">
        <div className="row h-100 justify-content-md-between">
          <div className="col-md-6 h-100">
            <div className="login-form">
              <div className="login-logo">
                <img className="img-fluid" src={loginLogo} alt="login-logo" />
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {() => {
                  return (
                    <Form>
                      <div className="row mt-0 mt-lg-3">
                        <div className="col-lg-12 mb-2">
                          <label htmlFor="email">
                            Username or email address
                          </label>
                          <Field
                            type="text"
                            name="username"
                            className={"form-control"}
                          />
                          <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="username"
                          />
                        </div>

                        <div className="col-lg-12">
                          <label htmlFor="password">Password</label>
                          <Field
                            type="password"
                            name="password"
                            className={"form-control"}
                          />
                          <ErrorMessage
                            className="text-danger"
                            component="div"
                            name="password"
                          />
                        </div>
                        <div className="col-lg-12  mb-4 text-right">
                          <NavLink to="/">Forgot password?</NavLink>
                        </div>
                        <div className="col-lg-12 mb-0">
                          <ButtonComponent
                            color="primary"
                            className="w-100"
                            type="submit"
                          >
                            LOGIN
                          </ButtonComponent>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <ul className="login-links w-100">
              <li>
                Lovepreet Singh&nbsp;&nbsp;|&nbsp;&nbsp;Copyright&nbsp;©&nbsp;2021
              </li>
              <li>
                <a href="/">Terms</a>
                <a href="/">Conditions</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
