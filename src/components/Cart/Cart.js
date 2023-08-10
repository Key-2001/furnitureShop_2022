import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
import {MdOutlineRemoveShoppingCart} from 'react-icons/md'
import { useSelector,useDispatch } from 'react-redux';
import { clearCart, removeCartItem, toggleAmountCartItem } from '../../redux/features/cartSlice';
import CheckoutDialog from './Checkout/CheckoutDialog';
import { FastField, Form, Formik } from 'formik';
import InputCustom from '../../common/Input/Input';
import './Cart.scss'
import useGetDiscountWithCode from '../../hooks/discount/useGetDetailDiscountWithCode';
import { getDiscountDetail } from '../../services/discountService';
import { getDiscountDetailAction, setDiscountDefault } from '../../redux/features/discountSlice';
import { Backdrop, CircularProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { toastTify } from '../../helper/Toastify';

const Cart = (props) => {
    //! State
    const {total,shippingFee,amount,orderTotal,cartProducts} = useSelector(store => store.cartProducts);
    const discountState = useSelector(store => store.discount);
    const {isLoginUser} = useSelector(store => store.auth);
    const {setIsFormAuth, isFormAuth} = props;
    const dispatch = useDispatch();
    console.log("cartProducts",cartProducts);
    console.log("discountState",discountState?.discount?.valueDiscount?.includes('%'), parseInt(discountState?.discount?.valueDiscount));
    if(cartProducts.length === 0){
        return(
            <section className='wrap-empty'>
                <div className='empty-cart'>
                    <h2>your cart is empty</h2>
                    <Link to='/products' className='btn'>fill it</Link>
                </div>

            </section>
        )
    }
    //! Function
    const handleClickLogin = () => {
        setIsFormAuth((prev) => ({...prev,isLogin: true}))
    }

    const handleSubmitForm = async (values, formikBag) => {
        const {discountCode} = values;
        if(discountCode){
            dispatch(getDiscountDetailAction({discountCode}))
        }else{
            dispatch(setDiscountDefault())
        }
    }

    const renderOrderTotal = () => {
        let newOrderTotal = 0;
        if(discountState?.discount?.valueDiscount){
            if(discountState?.discount?.valueDiscount?.includes('%')){
                newOrderTotal = orderTotal - orderTotal/100*parseInt(discountState?.discount?.valueDiscount);
            }else{
                newOrderTotal = orderTotal - parseInt(discountState?.discount?.valueDiscount);
            }
            return newOrderTotal;
        }
        return orderTotal;
    }

    //! Effect


    //! Render
    return (
        <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={discountState.isLoading}
            // onClick={handleClose}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
        <ToastContainer />
            <section className='title-section'>
                <div className='section-center'>
                    <h3>
                        <Link to='/'>Home</Link> / cart
                    </h3>
                </div>
            </section>
            <section className='cart-center section section-center page'>
                <div className='title-cart'>
                    <div className='content-title'>
                        <h5>item</h5>
                        <h5>price</h5>
                        <h5>quantity</h5>
                        <h5>subtotal</h5>
                        <span style={{width:'2rem'}}></span>
                    </div>
                    <hr/>
                </div>
                <div className='carts-content'>
                    {cartProducts.map((cart) => {
                        const {id,img,name,color,price,stock,shipping,amountCart, maxQuantity} = cart;
                        return(
                            <article key={`${id}-${color}`} className='cart-item'>
                                <div className='img-title'>
                                    <img src={img} alt={name}/>
                                    <div>
                                        <h5 className='name-cart'>{name}</h5>
                                        <p className='color-cart'>
                                            color: <span style={{backgroundColor:`${color}`}}/>
                                        </p>
                                        <h5 className='price-small'>${price}</h5>
                                    </div> 
                                </div>
                                <h5 className='price-cart'>${price}</h5>
                                <div className='amounts-btn'>
                                    {amountCart===1 ? 
                                    <button disabled style={{cursor: 'no-drop'}} type='button' className='dec-btn' >
                                        <AiOutlineMinus/>
                                    </button>
                                    : 
                                    <button  type='button' className='dec-btn' onClick={() => dispatch(toggleAmountCartItem({id,msg:'dec',color}))}>
                                        <AiOutlineMinus/>
                                    </button>
                                    }
                                    <h3>{amountCart}</h3>
                                    {amountCart === maxQuantity ?
                                    <button disabled  type='button' style={{cursor: 'no-drop'}} className='inc-btn'  >
                                        <AiOutlinePlus/>
                                    </button>
                                    :
                                    <button  type='button' className='inc-btn' onClick={() => dispatch(toggleAmountCartItem({id,msg:'inc', color}))}>
                                        <AiOutlinePlus/>
                                    </button>
                                    }
                                </div>
                                <h5 className='subtotal'>${price*amountCart}</h5>
                                <button className='remove-btn' onClick={() => dispatch(removeCartItem({id, color})) }><MdOutlineRemoveShoppingCart/></button>
                            </article>
                        )
                    })}
                </div>
                <hr/>
                <div className='links-container'>
                    <Link className='link-btn' to='/products'>continue shopping</Link>
                    <button type='button' className='link-btn clear-btn' onClick={() => dispatch(clearCart())}>   
                        clear shopping cart
                    </button>
                </div>
                <section className='total-price'>
                    <div>
                        <article>
                            <h5>subtotal : <span>${total}</span></h5>
                            <p>discount : <span>{(discountState?.discount && discountState?.discount?.amountUse>0)? discountState?.discount?.valueDiscount : ''}</span></p>
                            <p>shipping fee : <span>${shippingFee}</span></p>
                            <hr/>
                            <h4>order total : <span>${renderOrderTotal()}</span></h4>
                        </article>
                        <Formik
                            initialValues={{
                                discountCode: ''
                            }}
                            onSubmit={(values, formikBag) => handleSubmitForm(values, formikBag)}
                        >
                            {(helperFormik) => {
                                return(
                                    <Form className='form-discount'>
                                        <FastField
                                            component={InputCustom}
                                            name='discountCode'
                                            placeholder='Discount code ...'
                                            variant='outlined'
                                            sx={{marginTop:'.25rem', width: '100%'}}
                                        />
                                    </Form>
                                )
                            }}
                        </Formik>
                        {isLoginUser ? <CheckoutDialog/> 
                        : 
                        <button type='button' className='btn btn-checkout' onClick={handleClickLogin}>login</button>}
                    </div>
                </section>
            </section>
        </>
    )
}

export default Cart
