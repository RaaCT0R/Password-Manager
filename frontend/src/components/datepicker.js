import React from "react";
import TextField from "@material-ui/core/TextField";
import {getLanguage} from "react-multi-lang";
import DatePicker from "react-modern-calendar-datepicker";


export default function DateField(props){
    const {variant, id, label, value, onChange, required} = props;

    const renderDateInput = ({ ref }) => (
        <TextField id={id}
                   value={value ? value.year+'/'+value.month+'/'+value.day : ''}
                   ref={ref}
                   label={label}
                   fullWidth
                   variant={variant?variant:null}
                   required={required?required:null}
        />
    )

    return (
        <DatePicker
            value={value}
            onChange={onChange}
            renderInput={renderDateInput}
            shouldHighlightWeekends
            locale={getLanguage()}
            calendarClassName="responsive-calendar"
            className="w-100"
        />
    )
}