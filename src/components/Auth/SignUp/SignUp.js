import React,{useState,useEffect} from 'react'
import '../auth.scss'
import {AiOutlineEye,AiOutlineEyeInvisible,AiOutlineClose} from 'react-icons/ai'
// import { useGlobalContext } from '../../context'
// import { createUser } from '../../services/userService'
import { Formik,Form,ErrorMessage,Field, FastField } from 'formik'
import * as Yup from 'yup'
import {createUser} from '../../../services/authService'
import { Alert,AlertTitle } from '@mui/material'
import { useDispatch } from 'react-redux'

const Register = ({setIsFormAuth}) => {
  //! State
    const dispatch = useDispatch();

  const [checkEye,setCheckEye] = useState({
    isEye: false,
    isEyeSecond: false
  });

  //! Function
  const handleCreateUser = async (values, formikBag) => {
    const alertFail = document.getElementById('alert-fail-signup');
    const alertSuccess = document.getElementById('alert-success-signup');
    const userSignUp = {
        name:values.name,
        password: values.password,
        email:values.email,
        phoneNumber: values.phoneNumber,
    }
    const data = await createUser(userSignUp);
    if(data && data?.status === 200) {
        alertSuccess.classList.add('show');
        alertSuccess.classList.add('showAlert');
        alertSuccess.classList.remove('hide');
        formikBag.resetForm();
    }else{
        const value = data?.response?.data?.msg;
        document.getElementById('content-fail').innerText = value;
        alertFail.classList.add('show');
        alertFail.classList.add('showAlert');
        alertFail.classList.remove('hide');
    }

    setTimeout(() => {
        alertFail.classList.add('hide');
        alertFail.classList.remove('show');
        alertSuccess.classList.add('hide');
        alertSuccess.classList.remove('show');
    },5000)
  }
  


  //! Render
  return (
      <>
        <div id='alert-fail-signup' className='alertAuth hide'>
            <Alert sx={{padding:'12px 20px',}} severity="error">
                <AlertTitle>SignUp Failed</AlertTitle>
                <div id='content-fail' style={{display: 'inline-block'}}>This is an error alert</div> — <strong>check it out!</strong>
            </Alert>
        </div>
        <div id='alert-success-signup' className='alertAuth hide'>
            <Alert severity="success">
                <AlertTitle>Successfully</AlertTitle>
                <div id='content-success' style={{display: 'inline-block'}}>Sign up successful</div> — <strong>Congratulation!!!</strong>
            </Alert>
        </div>
        <div  className='wrap-login'>
            <div className='wrap-login-container'>
                <div className='wrap-login-container-content'>
                    <AiOutlineClose className='close-icon' onClick={() => setIsFormAuth((prev) => {
                        return{
                            ...prev,
                            isSignUp:false
                        }
                    })}/>
                    <Formik
                        initialValues={{
                            name: '',
                            phoneNumber:  '',
                            email:  '',
                            password: '',
                            checkPassword:  ''
                        }}
                        validationSchema= { Yup.object({
                            name: Yup.string()
                                .required('Pls enter your name!')
                                .trim(),
                            phoneNumber: Yup.string()
                                .required('Pls enter your phone number!')
                                .max(10,'Invalid phone number!')
                                .min(10,'Invalid phone number!')
                                .trim(),
                            email: Yup.string()
                                .required('Pls enter your email!')
                                .email('Invalid email!')
                                .trim(),        
                            password: Yup.string()
                                .required('Pls enter your password!')
                                .min(6,'Password need more than 6 characters!')
                                .trim(),
                            checkPassword: Yup.string()
                                .required('Pls re-enter your password again!')
                                .trim()
                                // .when('password', (password, field) =>
                                // password ? field.required().oneOf([Yup.ref('password')]) : field)
                                .oneOf([Yup.ref('password')], 'Passwords must match')
                                
                        })}
                        validateOnMount={false}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit = {(values, formikBag) => handleCreateUser(values, formikBag)}
                        
                    > 
                      {(helperFormik) => {
                        return(
                          <Form className='wrap-login-container-content-form'>
                              <h3 className='wrap-login-container-content-form-title'>Sign up</h3>
                              <div className='wrap-login-container-content-form-item'>
                                  <FastField  name='phoneNumber' type='text' id='phoneNumber' placeholder='You phone number' className={helperFormik.errors.phoneNumber && 'border-err'}/>
                                  <span className='err-text'>
                                      <ErrorMessage name='phoneNumber'/>
                                  </span>
                              </div>
                              <div className='wrap-login-container-content-form-item'>
                                  <FastField name='name' type='text' id='name' placeholder='Your name' className={helperFormik.errors.name && 'border-err'}/>
                                  <span className='err-text'>
                                      <ErrorMessage name='name'/>
                                  </span>
                              </div>
                              <div className='wrap-login-container-content-form-item'>
                                  <FastField name='email' type='text' id='email' placeholder='Your email' className={helperFormik.errors.email && 'border-err'}/>
                                  <span id='errTextEmail' className='err-text'>
                                      <ErrorMessage name='email'/>
                                  </span>
                              </div>
                              <div className='wrap-login-container-content-form-item'>
                                  <div className='relative'>
                                      <Field name='password' type={`${checkEye.isEye ? 'text' : 'password'}`} id='password' placeholder='Password must be at least 6 characters' className={helperFormik.errors.password && 'border-err'}/>
                                      <span id='eyePass' className='wrap-login-container-content-form-item-icon' onClick={() => setCheckEye((prev) => {
                                          return{
                                              ...prev,
                                              isEye: !checkEye.isEye
                                          }
                                      })}>
                                      {!checkEye.isEye ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                                      </span>
                                  </div>
                                  {<ErrorMessage name='password'/> ?
                                  <span  className='err-text'>
                                      <ErrorMessage name='password'/>
                                      
                                  </span> : null}
                              </div>
                              <div className='wrap-login-container-content-form-item'>
                                  <div className='relative'>
                                      <Field name='checkPassword' type={`${checkEye.isEyeSecond ? 'text' : 'password'}`} id='checkPassword' placeholder='Confirm your password' className={helperFormik.errors.checkPassword && 'border-err'} />
                                      <span id='eyeCheckPass' className='wrap-login-container-content-form-item-icon' onClick={() => setCheckEye((prev) => {
                                          return{
                                              ...prev,
                                              isEyeSecond: !checkEye.isEyeSecond
                                          }
                                      })}>
                                      {!checkEye.isEyeSecond ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                                      </span>
                                  </div>
                                  <span  className='err-text'>
                                      <ErrorMessage name='checkPassword'/>
                                  </span>
                              </div>
                              <button type='submit' className='wrap-login-container-content-form-btn'>
                                  Sign up
                              </button>
                          </Form>
                        )
                      }}
                    </Formik>
                    <div className='wrap-login-container-content-other-option center'>
                        <span onClick={() => setIsFormAuth((prev) => {
                            return{
                                ...prev,
                                isLogin: true,
                                isSignUp: false,
                            }
                        })}>Login</span>
                        
                    </div>
                </div>
            </div>
        </div>
      </>
  )
}

export default Register