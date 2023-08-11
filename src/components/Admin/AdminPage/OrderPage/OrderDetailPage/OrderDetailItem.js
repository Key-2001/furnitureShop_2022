import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DialogImg from '../../../../../common/UploadImg/DialogImg';
import ImgItem from '../../../../../common/UploadImg/ImgItem';

const OrderDetailItem = React.memo((props) => {
    //! Props
    const {order} = props
    //! State
    const [isOpenDialogImg, setIsOpenDialogImg] = useState(false);
    //! Function

    //!Effect

    //! Render
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={order?._d}
                id={order?._id}
            >
                <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Grid item xs={3}>
                        {order?.name}
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{backgroundColor: `${order?.color}`, width: '40px', height: '40px', borderRadius: '8px'}}/>
                    </Grid>
                    <Grid item xs={3}>
                        Quantity: {order?.amount}
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Box>
                            <ImgItem src={order?.img} index={order?.name} sx={{width: '100px', height: '100px'}}/>
                        </Box>
                    </Grid>
                    <Grid item xs={5} sx={{display: 'flex'}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sx={{display: 'flex'}}>
                                <Box sx={{width: '50%'}}>
                                    <Typography variant='subtitle2'>
                                        Price
                                    </Typography>
                                </Box>
                                <Box sx={{width: '50%'}}>
                                    <Typography variant="body2" sx={{color: '#ab7a5f', fontWeight: '500'}}>
                                        {`${order?.price} đ`}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{display: 'flex'}}>
                                <Box sx={{width: '50%'}}>
                                    <Typography variant='subtitle2'>
                                        Total
                                    </Typography>
                                </Box>
                                <Box sx={{width: '50%'}}>
                                    <Typography variant="body2" sx={{color: '#ab7a5f', fontWeight: '500'}}>
                                        {`${order?.price * order?.amount} đ`}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
})

export default OrderDetailItem