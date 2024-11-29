import React from "react";
import TextField from "@material-ui/core/TextField";

export default function InputText({name, label, formValues, setFormValues=()=>{}, validation={}, setValidation=()=>{},
                                      inline=false, required=false, fullWidth=true, multiline=false, rows=3}) {
    const error = validation[name]?.error
    const handleChange = (e) => {
        const newValue = e.target.value
        setFormValues(prevState => ({
            ...prevState,
            [name]: newValue
        }))
        if(error && newValue){
            setValidation(prevState => ({
                ...prevState,
                [name]: {error: false, helper: ""},
            }))
        }
    }
    return(
        <TextField
            name={name}
            label={label}
            variant={inline?"standard":"outlined"}
            value={formValues[name]}
            onChange={handleChange}
            fullWidth={fullWidth}
            required={required}
            helperText={validation[name]?.helper}
            error={error}
            multiline={multiline}
            rows={rows}
        />
    )
}
