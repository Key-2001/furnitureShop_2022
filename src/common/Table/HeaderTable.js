import styled from "@emotion/styled";
import { Box, Button, Paper, Popover, TextField } from "@mui/material";
import React, { useState } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import InputCustom from "../Input/Input";
import AddIcon from '@mui/icons-material/Add';
import ButtonCustom from "../Button/Button";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; 
import { DateRangePicker } from 'react-date-range';
import moment from "moment";
import DateRangePickerCommon from "../DateRangePicker/DateRangePickerCommon";
//! MUI_Custom
const HeaderTableLeft = styled(Box)(({ theme }) => ({
    "&>form":{
        display: "flex",
        alignItems: "center",

    }
}));

const HeaderTableRight = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center"
}));

const flexCenterIcon = {
  display: "flex",
  alignItems: "center",
  height: '100%',
  color: "#102a42",
  cursor: "pointer",
};

const HeaderTable = (props) => {
  //! State
  const path =
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];
  const { filterData, setFilterData, placeholder, refresh,
          handleFullScreen, handleCreate,handleRefreshData,
          isDateRange, dateRange, setDateRange} = props;
    const [valueTextField, setValueTextField] = useState("");
  //!Function

   const handleFilter = (e) => {
       e.preventDefault();
    setFilterData(valueTextField)
   } 

   const handleRefresh = () => {
    handleRefreshData && handleRefreshData()
    // refresh && refresh();
   }
   
   const handleSelect = (ranges) => {
    console.log("hoatlaCheckRanges", ranges);
   }
   

  //! Render
  
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        padding: ".75rem 1rem",
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <HeaderTableLeft>
        {isDateRange && <DateRangePickerCommon dateRange={dateRange} setDateRange={setDateRange}/>}
        {/* <form onSubmit={(e) => handleFilter(e)}>
            <TextField
                id="filter-table"
                label={`${path}`}
                placeholder={`Filter ${placeholder}...`}
                value={valueTextField}
                onChange={(e) => setValueTextField(e.target.value)}
                variant="standard"
            />
            <ButtonCustom
              variant="contained"
              title="Filter"
              sx={{
                  backgroundColor: "#ab7a5f",
                  "&:hover": { backgroundColor: "#b99179" },
                  marginLeft: ".5rem",
              }}
              type="submit"
            />
        </form>     */}
          
      </HeaderTableLeft>
      <HeaderTableRight>
        {handleCreate && 
        <ButtonCustom
          variant="contained"
          startIcon={<AddIcon/>}
          title="Create"
          sx={{marginRight:'1rem'}}
          onClick={handleCreate}
        />}
        {
          handleRefreshData && 
          <ReplayIcon sx={flexCenterIcon} onClick={handleRefresh}/>
        }
      </HeaderTableRight>
    </Paper>
  );
};

export default HeaderTable;
