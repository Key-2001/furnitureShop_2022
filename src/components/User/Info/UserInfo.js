import React, { Fragment, useEffect, useState } from "react";
import "./userInfo.scss";
import "../user.scss";
import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  changePasswordAction,
  updateUserAction,
} from "../../../redux/features/authSlice";
import { getAccessToken, getUserInfo } from "../../../helper";
import { ToastContainer } from "react-toastify";
import { useGetAddressPersonal } from "../../../hooks/users/useGetAddressPersonal";
import emptyImgUrl from "../../../public/img/empty-img.png";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineClose,
} from "react-icons/ai";

const UserInfo = (props) => {
  //! Props
  const { phoneNumber, name, email, address } = props;
  //! Selector
  const { statusCodeChangePassword } = useSelector((store) => store.auth);
  //! State
  const dispatch = useDispatch();
  const userLoginInfo = getUserInfo();
  const {
    data: listAddressPersonal,
    isLoading: isLoadingPersonalAddress,
    error: errorPersonalAddress,
    refresh: refreshPersonalAddress,
  } = useGetAddressPersonal(userLoginInfo?._id);
  const [isEye, setIsEye] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isTogglePass, setIsTogglePass] = useState(false);
  const [isToggleAddress, setIsToggleAddress] = useState(false);
  const initialValues = {
    name: name ?? "",
    phoneNumber: phoneNumber ?? "",
    email: email ?? "",
    address: address ?? "",
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  };
  //! Function
  const handleSubmit = (values, formikBag) => {
    if (!isTogglePass) {
      dispatch(updateUserAction({ token: getAccessToken(), values: values }));
    } else {
      dispatch(
        changePasswordAction({ token: getAccessToken(), values: values })
      );
    }
  };

  const handleChange = (helperFormik, name, value) => {
    helperFormik?.setFieldValue(name, value);
  };
  const checkValidateChangePassword = (values) => {
    if (!isTogglePass) {
      return true;
    } else {
      if (
        !values?.oldPassword ||
        !values?.newPassword ||
        !values?.newPasswordConfirm
      ) {
        return false;
      } else if (values?.newPassword !== values?.newPasswordConfirm) {
        return false;
      } else {
        return true;
      }
    }
  };

  const handleClickAddressPersonal = () => {
    setIsToggleAddress(!isToggleAddress);
    setIsTogglePass(false);
  };

  const handleClickPasswordToggle = () => {
    setIsTogglePass(!isTogglePass);
    setIsToggleAddress(false);
  };
  //! Effect
  useEffect(() => {
    if (statusCodeChangePassword) {
      setIsTogglePass(false);
    }
  }, [statusCodeChangePassword]);
  //! Render
  return (
    <Fragment>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validateOnMount
        onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
      >
        {(helperFormik) => {
          let isCheckBtn = checkValidateChangePassword(helperFormik.values);
          return (
            <Form>
              <div className="info-account">
                <h3>Profile account</h3>
                <div className="info-account-item">
                  <div className="title-info">Full name</div>
                  <div className="content-info">
                    <FastField
                      name="name"
                      placeholder="Your name"
                      onChange={(e) =>
                        handleChange(
                          helperFormik,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={false}
                    />
                  </div>
                </div>
                <div className="info-account-item">
                  <div className="title-info">Phone number</div>
                  <div className="content-info">
                    <FastField
                      type="text"
                      name="phoneNumber"
                      placeholder="Your phone number"
                      onChange={(e) =>
                        handleChange(
                          helperFormik,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="info-account-item">
                  <div className="title-info">Email</div>
                  <div className="content-info">
                    <FastField
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={email}
                      disabled
                    />
                  </div>
                </div>
                <div className="info-account-item">
                  <div className="title-info">Address</div>
                  <div className="content-info">
                    <FastField
                      type="text"
                      name="address"
                      placeholder="Your address"
                      onChange={(e) =>
                        handleChange(
                          helperFormik,
                          e.target.name,
                          e.target.value
                        )
                      }
                      disabled={isTogglePass}
                    />
                  </div>
                </div>
                <div className="option-user">
                  <div
                    className={`${
                      isTogglePass ? "pass-toggle is-active" : "pass-toggle"
                    }`}
                    onClick={handleClickPasswordToggle}
                  >
                    Change password
                  </div>
                  {/* <div className={`${isToggleAddress ? 'address-toggle is-active' : 'address-toggle'}`} onClick={handleClickAddressPersonal}>
                                  Delivery address
                                </div> */}
                </div>
                {isToggleAddress && (
                  <>
                    {listAddressPersonal?.length === 0 && (
                      <img
                        className="empty-img-wrap"
                        src={emptyImgUrl}
                        alt="empty-img"
                      />
                    )}
                  </>
                )}
                {isTogglePass && (
                  <div className="wrap-toggle">
                    <div className="info-account-item">
                      <div className="title-info">Old password</div>
                      <div className="content-info">
                        <input
                          id="old-pass"
                          name="oldPassword"
                          type={`${isEye.oldPassword ? "text" : "password"}`}
                          placeholder="Old password ..."
                          onChange={(e) =>
                            handleChange(
                              helperFormik,
                              e.target.name,
                              e.target.value
                            )
                          }
                        />
                        <span
                          className="eye-wrap"
                          onClick={() =>
                            setIsEye((prev) => {
                              return {
                                ...prev,
                                oldPassword: !prev.oldPassword,
                              };
                            })
                          }
                        >
                          {!isEye.oldPassword ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </span>
                        {helperFormik.errors.oldPassword && (
                          <span className="err">
                            {helperFormik.errors.oldPassword}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="info-account-item">
                      <div className="title-info">New password</div>
                      <div className="content-info">
                        <input
                          id="new-pass"
                          name="newPassword"
                          type={`${isEye.newPassword ? "text" : "password"}`}
                          placeholder="New password"
                          onChange={(e) =>
                            handleChange(
                              helperFormik,
                              e.target.name,
                              e.target.value
                            )
                          }
                        />
                        <span
                          className="eye-wrap"
                          onClick={() =>
                            setIsEye((prev) => {
                              return {
                                ...prev,
                                newPassword: !prev.newPassword,
                              };
                            })
                          }
                        >
                          {!isEye.newPassword ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </span>
                        {helperFormik.errors.newPassword && (
                          <span className="err">
                            {helperFormik.errors.newPassword}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="info-account-item">
                      <div className="title-info">Confirm password</div>
                      <div className="content-info">
                        <input
                          id="check-pass"
                          name="newPasswordConfirm"
                          type={`${
                            isEye.confirmPassword ? "text" : "password"
                          }`}
                          placeholder="Confirm new password"
                          onChange={(e) =>
                            handleChange(
                              helperFormik,
                              e.target.name,
                              e.target.value
                            )
                          }
                        />
                        <span
                          className="eye-wrap"
                          onClick={() =>
                            setIsEye((prev) => {
                              return {
                                ...prev,
                                confirmPassword: !prev.confirmPassword,
                              };
                            })
                          }
                        >
                          {!isEye.confirmPassword ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </span>
                        {helperFormik.errors.newPasswordConfirm && (
                          <span className="err">
                            {helperFormik.errors.newPasswordConfirm}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`info-account-btn ${
                    !isTogglePass && !isToggleAddress ? "start" : "end"
                  } ${!isCheckBtn ? "btn-disabled" : ""}`}
                >
                  {!isTogglePass ? (
                    <button type="submit">Update profile</button>
                  ) : (
                    <button type="submit" disabled={!isCheckBtn}>
                      Update password
                    </button>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default UserInfo;
