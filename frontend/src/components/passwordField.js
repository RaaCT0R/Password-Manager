import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import OutlinedInput from "@material-ui/core/OutlinedInput";


export default function PassField(props) {
    const {id, label, value, onChange} = props;
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <FormControl className="w-100" variant="outlined">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                id={id}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                labelWidth={label.length*7}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>setShowPassword(!showPassword)}
                            size="small"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}
