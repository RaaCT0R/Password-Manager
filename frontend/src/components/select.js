import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

class SelectField extends React.Component {
    constructor(props) {
        super(props);
        // this.myRef  = React.createRef();
    }
    render() {
        // return <div ref={this.wrapper}>{this.props.children}</div>;
        const {options, loaded} = this.props;

        return (
            <TextField
                {...this.props}
                select fullWidth
                SelectProps={{
                    native: true,
                }}
                disabled={loaded==='false'}
                InputProps={{
                    endAdornment: (
                        loaded==='false' && (<InputAdornment >
                            <CircularProgress/>
                        </InputAdornment>)
                    )
                }}
            >
                <option value="" hidden></option>
                {(loaded==='true' || typeof loaded==='undefined') &&
                    options.map( i => (
                        // <MenuItem key={i.value} value={i.value}>{i.label}</MenuItem>
                        <option key={i.value} value={i.value}>{i.label}</option>
                    ))
                }
            </TextField>
        )
    }
}

export default SelectField;

// export default function SelectField(props){
//     const {variant, id, label, options, value, onChange, required, loaded} = props;
//     // React.useEffect(() => {
//     //     console.log("component updated",options,loaded);
//     // });
//     return (
//         <FormControl
//             variant={variant?variant:null}
//             required={required?required:null}
//             fullWidth
//         >
//             <InputLabel id={id+"-label"}>
//                 {label}
//             </InputLabel>
//             <Select id={id}
//                     labelId={id+"-label"}
//                     label={label}
//                     autoWidth
//                 value={value}
//                 onChange={onChange}
//             >
//                 <ListSubheader>{label}:</ListSubheader>
//                 {loaded || typeof loaded==='undefined'
//                     ?options.map( i => {
//                         return(
//                             <MenuItem key={i.value} value={i.value}>{i.label}</MenuItem>
//                         )
//                     })
//                     :<CircularProgress className="mx-3" size="2rem"/>
//                 }
//             </Select>
//         </FormControl>
//     )
// }