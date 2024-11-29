import React from "react";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";

export default function InputPassword({name, label, formValues, setFormValues=()=>{},
                                      inline=false, required=false, fullWidth=true}) {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleChange = (e) => {
        const newValue = e.target.value
        setFormValues(prevState => ({
            ...prevState,
            [name]: newValue
        }))
    }
    return(
        <TextField
            // name={name}
            label={label}
            type={showPassword ? 'text' : 'password'}
            variant={inline?"standard":"outlined"}
            value={formValues[name]}
            onChange={handleChange}
            fullWidth={fullWidth}
            required={required}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                        >
                            {showPassword ? <Visibility fontSize="small"/> : <VisibilityOff fontSize="small"/>}
                        </IconButton>
                    </InputAdornment>
                )
            }}

        />
    )
}
