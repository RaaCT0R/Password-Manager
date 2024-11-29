import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    wrapper: {
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function ButtonPro({loading=false, variant="contained", color="primary", className="", onClick=()=>{}, ...probs}) {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Button
                disabled={loading}
                variant={variant}
                color={color}
                className={`width-medium ${className}`}
                onClick={onClick}
                {...probs}
            >
                {probs.children}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
}
