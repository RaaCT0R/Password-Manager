import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import TodayIcon from '@material-ui/icons/Today';

export default function InputDate({name, label, formValues, setFormValues=()=>{},
                                      inline=false, required=false, fullWidth=true}) {
    const handleChange = (date) => {
        setFormValues(prevState => ({
            ...prevState,
            [name]: date
        }))
    }
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                label={label}
                inputVariant={inline?"standard":"outlined"}
                fullWidth={fullWidth}
                required={required}
                format="dd/MM/yyyy"
                // disableToolbar
                // variant="inline"
                value={formValues[name]}
                onChange={handleChange}
                KeyboardButtonProps={{edge: "end"}}
                keyboardIcon={<TodayIcon fontSize="small"/>}
                autoOk
                disableFuture
            />
        </MuiPickersUtilsProvider>
    )
}
