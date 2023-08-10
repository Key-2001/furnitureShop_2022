import React, { useState, useEffect } from "react";
import Loading from "../LoadingScreen/Loading";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, getProducts } from "../../redux/features/productsSlice";
import {
  getAmount,
  getOrderTotal,
  getShippingFee,
  getTotal,
} from "../../redux/features/cartSlice";
import { useGetAllProduct } from "../../hooks/products/productHook";
import { categoryList } from "../../constant/categoryList";
import { companyList } from "../../constant/companyList";
import { colorsList } from "../../constant/colorsList";
import { shippingValues } from "../../constant/valueShipping";
import { FaBars } from "react-icons/fa";
import { AiFillAppstore } from "react-icons/ai";

const getTypeRender = () => {
  const data = localStorage.getItem("typeRender");
  if (data === "true") {
    return true;
  } else if (data === "false") {
    return false;
  } else {
    return true;
  }
};

const getSortType = () => {
  const data = localStorage.getItem("sortType");
  return data ? data : "priceLowest";
};

const Products = () => {
  //! State
  // const {isLoading, products, dataDefault,characteristics} = useSelector((store) => store.products);
  const { amount, cartProducts } = useSelector((store) => store.cartProducts);
  
  const dispatch = useDispatch();
  const [query, setQuery] = useState({
    name: "",
    category: "",
    company: "",
    color: "",
    price: 500,
    shipping: false,
    sort: getSortType(),
  });
  const { data: products, isLoading, error, refresh } = useGetAllProduct(query);
  
  const [isTypeRender, setIsTypeRender] = useState(getTypeRender());

  //! Effect
  useEffect(() => {
    localStorage.setItem("typeRender", isTypeRender);
  }, [isTypeRender]);

  useEffect(() => {
    dispatch(getAmount());
    dispatch(getTotal());
    dispatch(getShippingFee());
    dispatch(getOrderTotal());
  }, [cartProducts]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //! Function
  const handleChangeQueryName = (e) => {
    setQuery({ ...query, name: e.target.value });
  };

  const handleChangeQueryCategory = (e) => {
    setQuery({ ...query, category: e.target.value });
  };

  const handleChangeCompanyQuery = (e) => {
    setQuery({ ...query, company: e.target.value });
  };

  const handleChangeColorQuery = (e) => {
    setQuery({ ...query, color: e.target.value });
  };

  const handleChangePriceQuery = (e) => {
    setQuery({ ...query, price: e.target.value });
  };

  const handleChangeShippingQuery = (e) => {
    setQuery({ ...query, shipping: !query.shipping });
  };

  const handleChangeSort = (e) => {
    setQuery({ ...query, sort: e.target.value });
    localStorage.setItem("sortType", e.target.value);
  };

  const handleClearFilter = () => {
    setQuery((prev) => {
      return {
        ...prev,
        name: "",
        category: "",
        company: "",
        color: "",
        price: 500,
        shipping: false,
        sort: getSortType(),
      };
    });
    window.scrollTo(0, 0);
  };

  

  //! Render
  return (
    <>
      <section className="title-section">
        <div className="section-center">
          <h3>
            <Link to="/">Home</Link> / products
          </h3>
        </div>
      </section>
      <section className="section-center products-section">
        <div className="classify-options">
          <div className="content">
            <form>
              <div className="form-control">
                <input
                  type="text"
                  name="text"
                  placeholder="Search"
                  className="search-input"
                  value={query?.name}
                  onChange={handleChangeQueryName}
                />
              </div>
              <div className="form-control">
                <h5>category</h5>
                <div className="wrap-category">
                  <button
                    type="button"
                    name="category"
                    className={`${
                      query?.category === "" ? "null active" : "null"
                    }`}
                    value=""
                    onClick={handleChangeQueryCategory}
                  >
                    all
                  </button>
                  {categoryList &&
                    categoryList.map((item, index) => (
                      <button
                        type="button"
                        key={index}
                        name="category"
                        value={item.value}
                        className={`${
                          item.value === query?.category
                            ? "null active"
                            : "null"
                        }`}
                        onClick={handleChangeQueryCategory}
                      >
                        {item.label}
                      </button>
                    ))}
                </div>
              </div>
              <div className="form-control">
                <h5>company</h5>
                <select
                  name="company"
                  className="company"
                  value={query?.company}
                  onChange={handleChangeCompanyQuery}
                >
                  <option value="all">all</option>
                  {companyList &&
                    companyList.map((item, index) => (
                      <option key={index} value={item?.value}>
                        {item?.label}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-control">
                <h5>colors</h5>
                <div className="colors">
                  <button
                    type="button"
                    name="color"
                    value=""
                    className={`${
                      query?.color === "" ? "all-btn active" : "all-btn"
                    }`}
                    onClick={handleChangeColorQuery}
                  >
                    all
                  </button>
                  {colorsList &&
                    colorsList.map((item, index) => (
                      <button
                        type="button"
                        key={index}
                        name="color"
                        value={item?.value}
                        className={`${
                          query?.color === item?.value
                            ? "color-btn active"
                            : "color-btn"
                        }`}
                        style={{ backgroundColor: `${item.value}` }}
                        onClick={handleChangeColorQuery}
                      >
                        <BsCheck className="check-icon" />
                      </button>
                    ))}
                </div>
              </div>
              <div className="form-control">
                <h5>price</h5>
                <p className="price">${query?.price}</p>
                <input
                  type="range"
                  min="0"
                  max="4000"
                  name="price"
                  value={query?.price}
                  onChange={handleChangePriceQuery}
                />
              </div>
              <div className="form-control shipping">
                <label htmlFor="shipping">free shipping</label>
                <input
                  id="shipping"
                  type="checkbox"
                  name="shipping"
                  value={query?.shipping}
                  style={{ width: "1rem", height: "1rem" }}
                  onClick={handleChangeShippingQuery}
                />
              </div>
            </form>
            <button
              type="button"
              className="clear-btn"
              onClick={handleClearFilter}
            >
              clear filter
            </button>
          </div>
        </div>
        <div>
          {/* -------- */}
          <section className="nav-product">
            <div className="btn-container">
              <button
                className={`${isTypeRender ? "active" : ""}`}
                onClick={() => setIsTypeRender(true)}
              >
                <AiFillAppstore />
              </button>
              <button
                className={`${!isTypeRender ? "active" : ""}`}
                onClick={() => setIsTypeRender(false)}
              >
                <FaBars />
              </button>
            </div>
            <p>{products?.length || 0} products found</p>
            <hr />
            <form>
              <label htmlFor="sort">sort by</label>
              <select
                name="sort"
                id="sort"
                className="sort-input"
                onChange={handleChangeSort}
                value={query?.sort}
              >
                <option value="priceLowest">price (lowest)</option>
                <option value="priceHighest">price (highest)</option>
                <option value="nameA">name (a - z)</option>
                <option value="nameZ">name (z - a)</option>
              </select>
            </form>
          </section>
          {/* --------- */}
          {isLoading && <Loading />}
          {!isLoading && (products?.length === 0 || !products) && (
            <h5>Sorry, no products matched your search</h5>
          )}
          <section className="wrap-product-center">
            <div
              className={`${
                isTypeRender
                  ? "products-container"
                  : "products-container-column"
              }`}
            >
              {products?.map((product) => {
                const { _id: id, name, price, images, description } = product;
                const text = description.slice(0, 150);
                return (
                  <article key={id} className="featured">
                    <div className="container">
                      <img src={images[0]} alt={name} />
                      <Link to={`/products/${id}`} className="link">
                        <BiSearchAlt2 />
                      </Link>
                    </div>
                    {isTypeRender && (
                      <div className="footer-featured" style={{textTransform: 'unset'}}>
                        <h5>{name}</h5>
                        <p style={{textTransform: 'unset'}}>${price}</p>
                      </div>
                    )}

                    {!isTypeRender && (
                      <div>
                        <h4>{name}</h4>
                        <h5 style={{textTransform: 'unset'}}>${price}</h5>
                        <p>{text}...</p>

                        <Link to={`/products/${id}`} className="btn">
                          details
                        </Link>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Products;
