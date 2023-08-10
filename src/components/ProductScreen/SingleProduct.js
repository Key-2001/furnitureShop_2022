import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct } from "../../redux/features/singleProductSlice";
import { BsCheck, BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Loading from "../LoadingScreen/Loading";
import { addCart } from "../../redux/features/cartSlice";
import { Alert } from "@mui/material";
import "./SingleProduct.scss";
import { padding } from "@mui/system";
import { useGetProductId } from "../../hooks/products/productHook";
import {toastTify} from "../../helper/Toastify";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const SingleProduct = () => {
  //! State
  const { id } = useParams();
  const dispatch = useDispatch();
  const {cartProducts} = useSelector(store => store.cartProducts);
  const productAdded = (cartProducts || []).filter(el => el?.id === id);
  const { data: product, isLoading, error, refresh } = useGetProductId(id);
  console.log("cartProducts",cartProducts,' - ',product);
  const {
    name,
    price,
    images,
    description,
    company,
    colors,
    stock,
    stars,
    reviews,
    category,
    shipping,
  } = product;
  console.log("product", product);
  const [imgMain, setImgMain] = useState("");
  const [amountSingleProduct, setAmountSingleProduct] = useState(1);
  const [starList, setStarList] = useState([0, 1, 2, 3, 4]);
  const [cartItem, setCartItem] = useState({});
  

  const [stockCurrent, setStockCurrent] = useState({});

  //! Function
  const handleClickAddCartItem = () => {
    // const alertFail = document.getElementById("alert-fail");
    // const alertSuccess = document.getElementById("alert-product-success");
    console.log("cartItem",cartItem, productAdded);
    if (!stockCurrent) {
      // alertFail.classList.add("show");
      // alertFail.classList.add("showAlert");
      // alertFail.classList.remove("hide");
      toastTify("error",'Please enter product color!')
    } else {
      const checkProductWithColor =  (productAdded || []).find(el => el.color === stockCurrent.color);
      console.log("checkProductWithColor",productAdded,checkProductWithColor,cartItem, "stock", stockCurrent);
      if(checkProductWithColor && ((checkProductWithColor.amountCart + cartItem.amountCart) > stockCurrent.amount)){
        toastTify("warn",'The product is out of stock!')
        return
      }
      dispatch(addCart(cartItem));
      // alertSuccess.classList.add("show");
      // alertSuccess.classList.add("showAlert");
      // alertSuccess.classList.remove("hide");
      toastTify("success",'Add product Successfully!')
    }

    // setTimeout(() => {
    //   alertFail.classList.add("hide");
    //   alertFail.classList.remove("show");
    //   alertSuccess.classList.add("hide");
    //   alertSuccess.classList.remove("show");
    // }, 4000);
  };

  const handleChangeColorProduct = (item) => {
    setStockCurrent(item);
    setAmountSingleProduct(1);
  }

  //! Effect
  useEffect(() => {
    if (images) {
      setImgMain(product?.images[0]);
      setStockCurrent(product?.stock[0]);
    }
  }, [images]);

  useEffect(() => {
    const {
      name,
      price,
      images,
      description,
      company,
      colors,
      stock,
      stars,
      reviews,
      category,
      shipping,
    } = product;
    if(images){
        setCartItem(() => {
          return {
            img: images[0],
            id,
            name,
            category,
            shipping,
            price,
            color: stockCurrent.color,
            company,
            amountCart: amountSingleProduct,
            maxQuantity: stockCurrent.amount
          };
        });
    }
    // console.log(cartItem,'cartItem')
  }, [stockCurrent, amountSingleProduct, product]);

  //! Render
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {/* <div id="alert-fail" className="alert hide">
        <Alert
          data-aos="fade-left"
          sx={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "1rem 2rem",
          }}
          severity="error"
        >
          Please enter product color!
        </Alert>
      </div>
      <div id="alert-product-success" className="alert hide">
        <Alert
          data-aos="fade-left"
          sx={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "1rem 2rem",
          }}
          severity="success"
        >
          Add product Successfully!
        </Alert>
      </div> */}
        <ToastContainer />
      <section className="title-section">
        <div className="section-center">
          <h3>
            <Link to="/">Home</Link>
            <Link to="/products">/ Products</Link> / {name}
          </h3>
        </div>
      </section>
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <section className="img-section">
            <img src={imgMain} alt="main_img" className="main" />
            {images && (
              <div className="gallery">
                {images?.map((url, index) => {
                  return (
                    <img
                      key={index}
                      src={url}
                      alt=""
                      className={`${imgMain === url ? "active" : ""}`}
                      onClick={() => setImgMain(url)}
                    />
                  );
                })}
              </div>
            )}
          </section>
          <section className="content">
            <h2>{name}</h2>
            <div className="review">
              <div className="stars">
                {starList.map((starItem) => {
                  let temp = stars - starItem;

                  if (temp >= 1) {
                    return (
                      <span key={starItem}>
                        <BsStarFill />
                      </span>
                    );
                  } else if (temp > 0 && temp < 1) {
                    return (
                      <span key={starItem}>
                        <BsStarHalf />
                      </span>
                    );
                  } else {
                    return (
                      <span key={starItem}>
                        <BsStar />
                      </span>
                    );
                  }
                })}
              </div>
              <p className="reviewer">({reviews} customer reviewers)</p>
            </div>
            <h5>${price}</h5>
            <p className="description">{description}</p>
            <p className="info">
              <span>available:</span>
              {stockCurrent?.amount} products in stock
            </p>
            <p className="info">
              <span>SKU:</span> {id}
            </p>
            <p className="info">
              <span>brand:</span> {company}
            </p>

            {stock && (
              <div className="colors-single-product info">
                <span>colors:</span>
                <div style={{ display: "flex" }}>
                  {stock.map((el, index) => {
                    const { amount, color } = el;
                    return (
                      <button
                        key={index}
                        type="button"
                        className={`${
                          stockCurrent.color === color
                            ? "color-btn active"
                            : "color-btn"
                        }`}
                        style={{ backgroundColor: `${color}` }}
                        onClick={() => handleChangeColorProduct(el)}
                      >
                        <BsCheck className="check-icon" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="btn-cart-container">
              <div className="amounts-btn">
                {amountSingleProduct === 1 ? (
                  <button disabled style={{cursor: 'no-drop'}} type="button" className="dec-btn">
                    <AiOutlineMinus />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="dec-btn"
                    onClick={() =>
                      setAmountSingleProduct(amountSingleProduct - 1)
                    }
                  >
                    <AiOutlineMinus />
                  </button>
                )}
                <h2>{amountSingleProduct}</h2>
                {amountSingleProduct === stockCurrent?.amount ? (
                  <button disabled style={{cursor: 'no-drop'}} type="button" className="inc-btn">
                    <AiOutlinePlus />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inc-btn"
                    onClick={() =>
                      setAmountSingleProduct(amountSingleProduct + 1)
                    }
                  >
                    <AiOutlinePlus />
                  </button>
                )}
              </div>
              {/* <Link to='/cart' className='btn' onClick={() => handleAddCartItem(cartItem)}>add to cart</Link> */}
              <button className="btn" onClick={() => handleClickAddCartItem()}>
                add to cart
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
