import { Chair, DarkMode, Dashboard, Equalizer, Logout, Person, ShoppingCart } from '@mui/icons-material'
import { Box, List,styled, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Switch, Button, useTheme } from '@mui/material'
import React from 'react'
import urlLogo from '../../../../public/img/logo.svg'
import CloseIcon from '@mui/icons-material/Close';
import { permissionsAdminPage } from './permission';
import {Link} from 'react-router-dom'
import "./sidebar.scss"
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 80,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(40px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
const BtnLogout = styled(Button)(({theme}) => ({
  width:'100%',
  letterSpacing:'2px',
  color:theme.palette.defaultLayout.colorBtn,
  borderColor:theme.palette.defaultLayout.colorBtn,
  padding:'.8rem 0',
  '&:hover':{
    backgroundColor:'rgb(0 0 0 / 3%)',
    borderColor: theme.palette.defaultLayout.hoverBtn
  }
}))
const ListOptionItem = styled(ListItem) (({theme}) => ({
  transition:'all .3 linear',
  '& .Mui-selected':{
    backgroundColor:'transparent!important',
    '& .MuiListItemIcon-root':{
      color:theme.palette.defaultLayout.colorIcon
      // transform:'scale(1.2)'
    },
    '& .MuiTypography-root':{
      fontWeight: 'bold',
      // fontSize: '18px',
      color: theme.palette.defaultLayout.colorTextFocus,
    },
  },
  '&:hover':{
    '& .MuiListItemIcon-root':{
      color:theme.palette.defaultLayout.colorIcon,
      transition:'all .3 linear'
      // transform:'scale(1.2)',
    },
    '& .MuiTypography-root':{
      fontWeight: 'bold',
      // fontSize: '18px',
      transition:'all .3 linear',
      color: theme.palette.defaultLayout.colorTextFocus,
    },
  }
}))
const CloseSidebar = styled(CloseIcon)(({theme}) =>({
  position:'absolute',
  top:'1rem',
  right:'1rem',
  transition:'all .3s linear',
  color:'#453227',
  cursor:'pointer',
  '&:hover':{
    // transform:'scale(1.2)'
  },
  
}))
const SidebarAdmin = (props) => {
  const {setIsOpenSidebar,isOpenSidebar, darkMode, setDarkMode} = props;
  const theme = useTheme();
  return (
    <Box sx={{maxWidth:{xs:'unset',sm:'300px'},
              zIndex: 10,
              width:'100%',
              height:'100vh',
              position:'fixed',
              top: "0",
              display:'flex',
              transition:'all .3s linear',
              backgroundColor: theme.palette.defaultLayout.background,
              flexDirection:'column',
              boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
              transform:{xs:`${isOpenSidebar?'translateX(0)':'translateX(-100%)'}`,md:'unset'}}}
        p={3} >
        <Box sx={{display:{xs:'unset',md:'none'}}}>
          <CloseSidebar onClick={() => setIsOpenSidebar((prev) => !prev)} />
        </Box>
        <Box sx={{display:'flex'}}>
          <img className='img-logo' src={urlLogo} alt='logo'/>
        </Box>
        <List sx={{width:'90%',height:'400px',overflowY:'scroll',borderBottom:`1px solid ${theme.palette.defaultLayout.borderColor}`}}>
          {permissionsAdminPage.map((el,index) => {
            const {name, icon, href} = el;
            // console.log("sdasd",window.location.pathname);
            return(
              <ListOptionItem key={index}>
                <ListItemButton selected={href.split("/")[2] === window.location.pathname.split("/")[2] ? true : false}>
                  <Link className='link-sidebar' to={href}>
                    <ListItemIcon >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={name} sx={{color: theme.palette.defaultLayout.colorText}}/>
                  </Link>
                </ListItemButton>
              </ListOptionItem>
            )
          })}
        
        </List>
        <Box sx={{flex:'1'}}/>
        <Stack direction='column' gap={3} sx={{display:'flex',alignItems:'center',padding:'0 32px',justifyContent:'center'}}>
          {/* <MaterialUISwitch checked={darkMode} onChange={()=>setDarkMode(!darkMode)}/> */}
          <BtnLogout startIcon={<Logout/>} variant='outlined'>Logout</BtnLogout>
        </Stack>
    </Box>
  )
}

export default SidebarAdmin