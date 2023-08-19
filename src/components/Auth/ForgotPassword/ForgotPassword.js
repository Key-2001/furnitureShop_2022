import React,{useState,useEffect} from 'react'
import '../auth.scss'
import {AiOutlineEye,AiOutlineEyeInvisible,AiOutlineClose} from 'react-icons/ai'
import { FastField, Form, Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup'
import { useSelector,useDispatch } from 'react-redux';
import { sendCheckEmail, setDefaultErrCode } from '../../../redux/features/resetSlice';
import { Alert, AlertTitle } from '@mui/material';
import Loading from '../../LoadingScreen/Loading';

const ForgotPassword = ({setIsFormAuth}) => {
    const {errCode,msg,isLoading} = useSelector(store => store.resetPass)

    const [isMsgBox,setIsMsgBox] = useState(false) 
    const dispatch = useDispatch();
    useEffect(() => {
        if(errCode=== 10){
            setIsMsgBox(true)
        }
    },[errCode])
    const handleClose = () => {
        setIsMsgBox(false);
        setIsFormAuth((prev) => {
            return{
                ...prev,
                isForgotPassword:false
            }
        })
        dispatch(setDefaultErrCode());
    }
    if(isMsgBox){
        return(
            <div className='wrap-login'>
                <div className='wrap-login-container'>
                    <div className='wrap-login-container-content'>
                        <AiOutlineClose className='close-icon' onClick={() => handleClose()}/>
                        <h3 className='wrap-login-container-content-form-title'>
                            Password retrieval
                        </h3>
                        {isLoading && <Loading isForgotPass={true}/>}
                        <div className='wrap-login-container-content-other-option center'>
                            <span style={{fontSize:'18px'}}>Please check your email!!</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    

  return (
      <>
        <div id='alert-fail' className='alertAuth hide'>
            <Alert sx={{padding:'12px 20px',}} severity="error">
                <AlertTitle>Failed</AlertTitle>
                <div id='content-fail' style={{display: 'inline-block'}}>{msg}</div> — <strong>check it out!</strong>
            </Alert>
        </div>
        <div className='wrap-login'>
            <div className='wrap-login-container'>
                <div className='wrap-login-container-content'>
                    <AiOutlineClose className='close-icon' onClick={() => setIsFormAuth((prev) => {
                        return{
                            ...prev,
                            isForgotPassword:false
                        }
                    })}/>
                    <Formik 
                        initialValues={{
                            email:''
                        }}
                        enableReinitialize
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .required('Required!')
                                .trim()
                                .email('Invalid email!')
                        })}
                        onSubmit={(values,formikBag) => {
                            const {email} = values;
                            setIsMsgBox(true)
                            dispatch(sendCheckEmail(email))
                        }}
                    >
                        <Form className='wrap-login-container-content-form'>
                            <h3 className='wrap-login-container-content-form-title'>
                                Password retrieval
                            </h3>
                            <div className='wrap-login-container-content-form-item'>
                                <FastField type='email' name='email' id='email' placeholder='Your email!!!'/>
                                <span id='errTextEmail' className='err-text'>
                                    <ErrorMessage name='email'/>
                                </span>
                            </div>
                            <button type='submit' className='wrap-login-container-content-form-btn'>
                                Check
                            </button>
                            
                        </Form>

                    </Formik>
                    <div className='wrap-login-container-content-other-option center'>
                        <span onClick={() => setIsFormAuth((prev) => {
                            return{
                                ...prev,
                                isLogin: true,
                                isForgotPassword: false,
                            }
                        })}>Login</span>
                    </div>
                </div>
            </div>
        </div>
      </>
  )
};

export default ForgotPassword