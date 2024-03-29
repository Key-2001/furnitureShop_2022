import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const RadioButtonCustom = (props) => {
    //! State
    const {title, sx, field, form, dataOption} = props;
    // console.log("propsRadio",props);
    const name = field?.name;
    const value = field?.value;
    //! Function
    const handleChange = (e) => {
        form && form?.setFieldValue(name,e.target.value)
    }
    //! Render
  return (
    <FormControl>
        <FormLabel 
            id={`radio-button-${name}`}
            sx={{...sx}}
        >{title}</FormLabel>
        <RadioGroup
            aria-labelledby={`radio-button-${name}`}
            defaultValue={value}
            name={name}
            onChange={handleChange}
        >   
        {dataOption?.map((el,index) => {
            const {value, label} = el;
            return(
                <FormControlLabel key={el.value} value={value} control={<Radio/>} label={label}/>
            )
        })}
        </RadioGroup>
    </FormControl>
  )
}

export default RadioButtonCustom