import axios from '../axios'
import { attachTokenToHeader } from '../axios'
const createUser = (data) => {
    return axios.post('/users',data)
}
const loginUser = (data) => {
    return axios.post('/users/login',data)
}
const sendEmail = (data) => {
    console.log('email',data);
    return axios.post('/users/send-mail',data)
}
const resetPassword = (data,token) => {
    return axios.post('/users/reset-password',data,attachTokenToHeader(token))
}
const loginWithToken = (token) => {
    return axios.post('/users/login-with-token',attachTokenToHeader(token))
}
const logoutUser = (token) => {
    return axios.post('/users/logout',attachTokenToHeader(token))
}

export {createUser,loginUser,sendEmail,resetPassword,loginWithToken,logoutUser}