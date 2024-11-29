import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function InputSelect({name, label, formValues, setFormValues=()=>{}, validation={}, setValidation=()=>{},
                                        options, optionLabel="label", optionId="value",
                                        inline=false, required=false, fullWidth=true, loading=false}) {
    const error = validation[name]?.error
    const handleChange = (e, newOption) => {
        const newValue = newOption ? newOption[optionId] : null
        setFormValues(prevState => ({
            ...prevState,
            [name]: newValue
        }))
        if(error && newOption){
            setValidation(prevState => ({
                ...prevState,
                [name]: {error: false, helper: ""},
            }))
        }
    }
    return(
        <Autocomplete
            name={name}
            options={options}
            getOptionLabel={option => option[optionLabel] || ""}
            value={options.find(o=>o[optionId]===formValues[name])??null}
            onChange={handleChange}
            fullWidth={fullWidth}
            renderInput={(params) =>
                <TextField {...params}
                           label={label}
                           variant={inline?"standard":"outlined"}
                           required={required}
                           helperText={validation[name]?.helper}
                           error={error}
                />
            }
            loading={loading}
        />
    )
}
