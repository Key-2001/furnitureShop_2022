import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Paper, styled, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useGetProductId } from '../../../../hooks/products/productHook';
import { FastField, Form, Formik } from 'formik';
import InputCustom from '../../../../common/Input/Input';
import SelectCustom from '../../../../common/Select/Select';
import { companyList } from '../../../../constant/companyList';
import { categoryList } from '../../../../constant/categoryList';
import RadioButtonCustom from '../../../../common/RadioInput/RadioButton';
import { shippingValues } from '../../../../constant/valueShipping';
import InputMutiline from '../../../../common/Input/InputMutiline';
import * as yup from 'yup'
import AddIcon from "@mui/icons-material/Add";
import { cloneDeep } from 'lodash';
import { colorsList } from '../../../../constant/colorsList';
import RemoveIcon from "@mui/icons-material/Remove";
import UploadImg from '../../../../common/UploadImg/UploadImg';
import ButtonCustom from '../../../../common/Button/Button';
import {updateProduct} from '../../../../services/adminPage/productService'


const BackgroundForm = styled(Paper)(({ theme }) => ({
    height: "100%",
    overflowY: "scroll",
    padding: "2rem 3rem",
    position: "relative",
    "&:before": {
      content: "''",
      width: "500px",
      height: "300px",
      backgroundColor: theme.palette.defaultLayout.colorIconNav,
      clipPath: "polygon(0 0, 100% 0, 0 100%)",
      position: "absolute",
      left: 0,
      top: 0,
      opacity: 0.5,
    },
    "&:after": {},
}));

const EditProduct = () => {
    //! State
    const {id} = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const {data: productID, error, isLoading, refresh} = useGetProductId(id);
    console.log("productID",productID);
    const {name, price, images, company, description, category, shipping, stock, reviews, stars} = productID;
    const initialValues = {
        name: name || "",
        price: price || 0,
        products: images || [],
        company: company || "",
        description: description || "",
        category: category || "",
        shipping: shipping || false,
        stock: stock || [{ color: "", amount: 0 }],
        reviews: reviews || 0,
        stars: stars || 3,
      };
    const validate = yup.object().shape({
        name: yup.string().required("Required!"),
        price: yup.number().required("Required!"),
        // stock: yup.array().required("Required!").min(1,"Pls enter color product!"),
        // color: yup.string().required("Required!"),
        // amount: yup.number().required("Required!"),
        company: yup.string().required("Required!"),
        description: yup.string().required("Required!"),
        category: yup.string().required("Required!"),
    });
    //! Function

    const handleBack = () => {
        navigate("/admin/products", { replace: true });
    }

    const handleSubmit = async (values, formikBag) => {
      console.log("values",values);
      const bodyFormData = new FormData();
      bodyFormData.append("name", values.name);
      bodyFormData.append("price",values.price);
      values.products.forEach((el) => bodyFormData.append("products", el));
      bodyFormData.append('stock', JSON.stringify(values.stock));
      bodyFormData.append("company", values.company);
      bodyFormData.append("description", values.description);
      bodyFormData.append("category", values.category);
      bodyFormData.append("shipping", values.shipping);
      bodyFormData.append("reviews", values.reviews);
      bodyFormData.append("stars", values.stars);
      try {
        const response = await updateProduct(id,bodyFormData);
        console.log("response",response);
      } catch (error) {
        console.log("error",error);
      }
    }

    const handleAddProduct = (helperFormik) => {
        const { values, setFieldValue } = helperFormik;
        setFieldValue("stock", [...values.stock, { amount: 0, color: "" }]);
    };
    
    const handleRemoveProduct = (index, helperFormik) => {
    const { values, setFieldValue } = helperFormik;
    let tempArr = cloneDeep(values.stock).filter((el, idx) => idx !== index);
    setFieldValue("stock", tempArr);
    };


    //! Effect

    //! Render
  return (
    <div className="container-admin">
      <BackgroundForm elevation={3}>
        <CloseIcon
          onClick={handleBack}
          sx={{
            position: "absolute",
            top: "2rem",
            right: "2rem",
            cursor: "pointer",
            "&:hover": { transform: "scale(1.2)" },
          }}
        />
        <Typography variant="h3" component="h1" sx={{ marginBottom: "2rem" }}>
          Create New Product
        </Typography>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validate}
          onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
        >
          {(helperFormik) => {
              console.log("helperFormik",helperFormik);
            return (
              <Form>
                <Grid container>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <FastField
                      component={InputCustom}
                      label="ProductName"
                      name="name"
                      placeholder="ProductName..."
                      sx={{ width: "95%" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <FastField
                      component={InputCustom}
                      label="Price"
                      name="price"
                      placeholder="Price..."
                      sx={{ width: "95%" }}
                      type="number"
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: "2rem" }}>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <FastField
                      component={SelectCustom}
                      name="company"
                      label="Company"
                      dataOption={companyList}
                      sx={{ width: "95%" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <FastField
                      component={SelectCustom}
                      name="category"
                      label="Category"
                      dataOption={categoryList}
                      sx={{ width: "95%" }}
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: "2rem" }}>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <FastField
                      component={RadioButtonCustom}
                      title="FreeShip"
                      name="shipping"
                      dataOption={shippingValues}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <FastField
                      component={InputMutiline}
                      name="description"
                      label="Description"
                      placeholder="Description..."
                      sx={{ width: "95%" }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    marginTop: "2rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    xs={11}
                    sx={{
                      height: "1px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: theme.palette.defaultLayout.colorBtn,
                    }}
                  />
                  <Grid
                    item
                    xs={1}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AddIcon
                      sx={{ cursor: "pointer", fontSize: "25px" }}
                      onClick={() => handleAddProduct(helperFormik)}
                    />
                  </Grid>
                </Grid>

                {/* {helperFormik.values.stock?.length > 0 && ( */}
                <Grid container sx={{ marginTop: "2rem" }}>
                  {helperFormik.values.stock?.map((el, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          width: "100%",
                          marginBottom: "1rem",
                        }}
                      >
                        <Grid item xs={5.5} sx={{ display: "flex" }}>
                          <FastField
                            component={InputCustom}
                            name={`stock[${index}].amount`}
                            label="Amount"
                            sx={{ width: "95%" }}
                            type="number"
                            placeholder="Amount...."
                          />
                          {/* <FastField
                                  component={SelectCustom}
                                  name="category"
                                  label="Category"
                                  dataOption={categoryList}
                                  sx={{width:'95%'}}
                                /> */}
                        </Grid>
                        <Grid item xs={5.5} sx={{ display: "flex" }}>
                          <FastField
                            component={SelectCustom}
                            name={`stock[${index}].color`}
                            label="Color"
                            dataOption={colorsList}
                            sx={{ width: "95%" }}
                          />
                          {/* <FastField
                                  component={SelectCustom}
                                  name="category"
                                  label="Category"
                                  dataOption={categoryList}
                                  sx={{width:'95%'}}
                                /> */}
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <RemoveIcon
                            onClick={() =>
                              handleRemoveProduct(index, helperFormik)
                            }
                          />
                        </Grid>
                      </div>
                    );
                  })}
                </Grid>
                {/* )} */}
                <Grid container sx={{ marginTop: "2rem" }}>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <FastField component={UploadImg} name="products" />
                  </Grid>
                </Grid>
                <Grid container sx={{ marginTop: "2rem" }}>
                  {/* <Grid item xs={4} sx={{display: 'flex', justifyContent: 'flex-start'}}>
                    <FastField
                      component={InputCustom}
                      name='stock'
                      label='Stock'
                      placeholder="Amount ...."
                      type="number"
                      sx={{width: '95%'}}
                    />
                  </Grid> */}
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <FastField
                      component={InputCustom}
                      name="reviews"
                      label="Reviews"
                      placeholder="Reviews amount ...."
                      type="number"
                      sx={{ width: "95%" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <FastField
                      component={InputCustom}
                      name="stars"
                      label="Stars"
                      placeholder="Stars ...."
                      type="number"
                      sx={{ width: "95%" }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{ marginTop: "2.5rem", paddingBottom: "3rem" }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <ButtonCustom
                      title="Create"
                      type="submit"
                      variant="contained"
                      sx={{
                        height: "45px",
                        width: "140px",
                        position: "absolute",
                        zIndex: 1,
                      }}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </BackgroundForm>
    </div>
  )
}

export default EditProduct