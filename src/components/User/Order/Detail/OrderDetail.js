import React, {Fragment, useState} from 'react'
import '../order.scss'
import { makeStyles } from '@mui/styles'
import {Accordion, AccordionSummary, AccordionDetails, Typography, Chip, Grid} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { enumStatus } from '../../../../constant/enumOrder';
import { useGetCityOption } from '../../../../hooks/city/useGetCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { handleGetAddressCity } from '../../../../helper';
//! MUI Style
const useStyles = makeStyles({
  bgPink: {
    backgroundColor: '#eaded7'
  },
  bgWhiteBlue: {
    backgroundColor: '#dae2ec'
  },
  bgWhite: {
    backgroundColor: '#f1f5f8',
    '& .MuiAccordionSummary-content': {
      display: 'block'
    }
  },
  orderWrap: {
    marginBottom: '1rem',
    backgroundColor: '#eaded7'
  },
  flexDisplay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between"
  }
})

const OrderDetail = (props) => {
  //! Props
  const {order} = props;
  const classes = useStyles();
  //! State
  const [expanded, setExpanded] = useState(false);
  const enumStatusCheck = enumStatus?.find(el => el?.value === order?.status)
  const {data: listCity, isLoading} = useGetCityOption();

  const addressConvert = handleGetAddressCity(order?.address, listCity);
  //! Function
  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //! Effect

  //! Render
  return (
    <div className={classes?.orderWrap}>
      <Accordion expanded={expanded === order?._id} onChange={handleChangeExpanded(order?._id)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${order?._id}-content`}
          id={`panel${order?._id}-header`}
          className={classes?.bgWhite}
        >
        <div className={classes?.flexDisplay}>
          <Typography sx={{ fontWeight: '500', color: '#453227', flexShrink: 0 }}>
            {order?._id}
          </Typography>
          <Chip variant="outlined" sx={{  marginRight: '3rem', color: `${enumStatusCheck?.color}`, borderColor: `${enumStatusCheck?.color}` }} label={enumStatusCheck?.label}/>
        </div>
        </AccordionSummary>
        <AccordionDetails className={classes?.bgWhiteq}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant='h6' sx={{display: 'flex', alignItems: 'center', fontSize: '18px'}}>
                <LocationOnIcon/>
                Delivery address
              </Typography>
              <Typography sx={{ color: 'text.secondary', marginLeft: '.5rem', fontSize: '15px' }}>
                {order?.name}
              </Typography>
              <Typography sx={{ color: 'text.secondary', marginLeft: '.5rem', fontSize: '15px' }}>
                {order?.phoneNumber}
              </Typography>
              <Typography sx={{ color: 'text.secondary', marginLeft: '.5rem', fontSize: '15px' }}>
                {addressConvert}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6' sx={{display: 'flex',alignItems: 'center', justifyContent: 'center', fontSize: '18px'}}>
                Products
              </Typography>
              {order?.products?.map((el,ind) => {
                return(
                  <div key={`${el?._id}-${ind}`} className='order-product-wrap'>
                    <div className='order-product-wrap_info'>
                      <div className='order-product-wrap_info-header'>
                        <Typography sx={{fontSize: '13px', color: 'text.secondary'}}>
                          {el?.name}
                        </Typography>
                        <div className="order-product-wrap_info-header__color-wrap">
                          <Typography sx={{fontSize: '13px', color: 'text.secondary'}}>
                            Color
                          </Typography>
                          <div style={{backgroundColor: `${el?.color}`}} className='order-product-wrap_info-header__color'/>
                        </div>
                      </div>
                      <div className='order-product-wrap_info-img'>
                        <img src={el?.img} alt={`img-${el?.id}-${ind}`}/>
                      </div>
                    </div>
                    <div className='order-product-wrap_price'>
                      <Typography sx={{fontSize: '13px', color: 'text.secondary', textAlign: 'end'}}>
                        {`x${el?.amount}`}
                      </Typography>
                      <Typography sx={{fontSize: '14px', color: '#855f4a',textAlign: 'end', paddingBottom: '.5rem', borderBottom: '1px solid #e0e0e0'}}>
                        {`${el?.price} đ`}
                      </Typography>
                      <Typography sx={{fontSize: '14px', color: '#855f4a', textAlign: 'end', paddingTop: '.5rem'}}>
                        {`Subtotal: ${el?.price * el?.amount} đ`}
                      </Typography>
                    </div>
                  </div>
                )
              })}
              {order?.discount?.discountCode && order?.discount?.discountCode !== 'undefined' && 
                <Fragment>
                    <Grid container spacing={1} sx={{marginTop: '1rem', marginLeft: '8px'}}>
                      <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography sx={{fontSize: '15px', color: '#102a42', fontWeight: '500'}}>
                          Discount: 
                        </Typography>
                        <Typography sx={{fontSize: '12px', marginRight: '16px'}}>
                          {order?.discount?.discountCode}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography sx={{fontSize: '15px', color: '#102a42', fontWeight: '500'}}>
                          Discount value: 
                        </Typography>
                        <Typography sx={{fontSize: '12px', marginRight: '16px'}}>
                          {`${order?.discount?.discountValue} đ`}
                        </Typography>
                      </Grid>
                    </Grid>
                </Fragment>
              }
              <div className='total-price-wrap'>
                <Typography sx={{fontSize: '20px',color: '#102a42', fontWeight: '500'}}>
                  Total: 
                </Typography>
                <Typography sx={{fontSize: '16px', display: 'flex', alignItems: 'center', color: '#d1b6a8', fontWeight: '500'}}>
                  {order?.totalPriceProduct !== order?.totalPrice && 
                    <Typography className='price-underline' sx={{fontSize: '14px', marginRight: '.25rem', color: '#e66b6b'}}>
                      {`${order?.totalPriceProduct} đ`}
                    </Typography>
                  }
                  {`${order?.totalPrice} đ`}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default OrderDetail