import React, { useState, useEffect } from "react";
import "../auth.scss";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineClose,
} from "react-icons/ai";
import { FastField, Form, Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUserRedux } from "../../../redux/features/authSlice";
import { loginUser } from "../../../services/authService";
import { Alert, AlertTitle } from "@mui/material";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Login = ({ setIsFormAuth }) => {
  const [isEye, setIsEye] = useState(false);
  const dispatch = useDispatch();
  const { errCode, msg, name } = useSelector((store) => store.auth);

  const responseFacebook = (response) => {
    console.log("resFace", response);
  };
  useEffect(() => {
    if (errCode === 10) {
      setIsFormAuth((prev) => {
        return {
          ...prev,
          isLogin: false,
          isForgotPassword: false,
          isSignUp: false,
        };
      });
    }
  }, [errCode]);

  return (
    <>
      <div id="alert-fail" className="alertAuth hide">
        <Alert sx={{ padding: "12px 20px" }} severity="error">
          <AlertTitle>Login Failed</AlertTitle>
          <div id="content-fail" style={{ display: "inline-block" }}>
            {msg}
          </div>{" "}
          — <strong>check it out!</strong>
        </Alert>
      </div>
      <div className="wrap-login">
        <div className="wrap-login-container">
          <div className="wrap-login-container-content">
            <AiOutlineClose
              className="close-icon"
              onClick={() =>
                setIsFormAuth((prev) => {
                  return {
                    ...prev,
                    isLogin: false,
                  };
                })
              }
            />
            <Formik
              initialValues={{
                phoneNumber: "",
                password: "",
              }}
              enableReinitialize
              validationSchema={Yup.object({
                phoneNumber: Yup.string()
                  .required("Require!")
                  .max(10, "Invalid phone number!")
                  .min(10, "Invalid phone number!")
                  .trim(),
                password: Yup.string()
                  .required("Require!")
                  .min(6, "Invalid password!")
                  .trim(),
              })}
              onSubmit={(values, formikBag) => {
                dispatch(loginUserRedux(values));
              }}
            >
              {(helperFormik) => {
                return (
                  <Form className="wrap-login-container-content-form">
                    <h3 className="wrap-login-container-content-form-title">
                      Login
                    </h3>
                    <div className="wrap-login-container-content-form-item">
                      <FastField
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone number"
                        className={
                          helperFormik.errors.phoneNumber && "border-err"
                        }
                      />
                      <span className="err-text">
                        <ErrorMessage name="phoneNumber" />
                      </span>
                    </div>
                    <div className="wrap-login-container-content-form-item">
                      <div className="relative">
                        <Field
                          name="password"
                          type={`${isEye ? "text" : "password"}`}
                          id="password"
                          placeholder="Password must be at least 6 characters!"
                          className={
                            helperFormik.errors.password && "border-err"
                          }
                        />
                        <span
                          id="eyePass"
                          className="wrap-login-container-content-form-item-icon"
                          onClick={() => setIsEye((prev) => !prev)}
                        >
                          {!isEye ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </span>
                      </div>
                      {<ErrorMessage name="password" /> ? (
                        <span className="err-text">
                          <ErrorMessage name="password" />
                        </span>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className="wrap-login-container-content-form-btn"
                    >
                      Login
                    </button>
                  </Form>
                );
              }}
            </Formik>
            {/* <div className="login-or-divider">hoặc</div> */}
            {/* <div className='wrap-login-container-content-form-facebook'>
                        <div className='wrap-login-container-content-form-facebook-inner'>
                            Đăng nhập với Facebook
                        </div>
                        <div className='wrap-login-container-content-form-facebook-img'>
                            <img src='https://www.coolmate.me/images/facebook.svg' alt='facebookLogo'/>
                        </div>
                    </div>
                    <div className='wrap-login-container-content-form-google'>
                        <div className='wrap-login-container-content-form-google-inner'>
                            Đăng nhập với Google
                        </div>
                        <div className='wrap-login-container-content-form-google-img'>
                            <img src='https://www.coolmate.me/images/google.svg' alt='googleLogo'/>
                        </div>
                    </div> */}
            <div className="wrap-login-container-content-other-option">
              <span
                onClick={() =>
                  setIsFormAuth((prev) => {
                    return {
                      ...prev,
                      isLogin: false,
                      isSignUp: true,
                    };
                  })
                }
              >
                Sign up
              </span>
              <span
                onClick={() =>
                  setIsFormAuth((prev) => {
                    return {
                      ...prev,
                      isLogin: false,
                      isForgotPassword: true,
                    };
                  })
                }
              >
                Forgot password
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
