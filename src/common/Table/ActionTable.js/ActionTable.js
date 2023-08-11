import React, { Fragment, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  menuList: {
    
  },
  menuItem: {
    backgroundColor: '#000'
  }
})

const ActionTable = React.memo((props) => {
    //! Props
    const {handleEdit, handleDelete,handleDetailView, params} = props;
    //! State
    const classes = useStyles();
    const [isOpenDialogConfirmDelete, setIsOpenDialogConfirmDelete] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    //! Function
    const handleClose = () => {
      setAnchorEl(null)
    }
    const handleClick = (e) => {
      setAnchorEl(e.currentTarget)
    }
    const handleClickEditMenuItem = () => {
      handleEdit && handleEdit();
      setAnchorEl(null);
    }
    const handleClickDeleteMenuItem = () => {
      handleDelete && handleDelete();
      setAnchorEl(null);
    }
    const handleConfirmDeleteUser = () => {
      setIsOpenDialogConfirmDelete(true);
    }
    const handleCloseDialogDelete = () => {
      setIsOpenDialogConfirmDelete(false);
    }
    //! Effect

    //! Render
  const dialogDeleteRender = () => {
    return(
      <Dialog
        open={isOpenDialogConfirmDelete}
        onClose={handleCloseDialogDelete}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete user {`${params?.row?.name} ?` }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialogDelete}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Fragment>
      {dialogDeleteRender()}
        <IconButton
          aria-label='action'
          sx={{marginRight:'.5rem'}}
          component='label'
          id="action-table-menu"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon/>
        </IconButton>
        <Menu
          id='action-table-menu'
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          MenuListProps={{
          'aria-labelledby': 'action-table-menu',
          }}
        >
          {
            handleDetailView && 
            <MenuItem sx={{fontSize: '13px'}} onClick={handleDetailView} disableRipple>
              <InfoIcon sx={{width: '13px', height: '13px', marginRight: '.25rem'}}/>
              Detail
            </MenuItem>
          }
          {
            handleEdit && 
            <MenuItem sx={{fontSize: '13px'}} onClick={handleClickEditMenuItem} disableRipple>
              <EditIcon sx={{width: '13px', height: '13px', marginRight: '.25rem'}}/>
              Edit
            </MenuItem>
          }
          {
            handleDelete && 
            <MenuItem sx={{fontSize: '13px'}} onClick={handleConfirmDeleteUser} disableRipple>
              <DeleteIcon sx={{width: '13px', height: '13px', marginRight: '.25rem'}}/>
              Delete
            </MenuItem>
          }
        </Menu>
    </Fragment>
  )
})

export default ActionTable