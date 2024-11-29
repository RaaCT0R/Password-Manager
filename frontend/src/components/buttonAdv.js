import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

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

export default function ButtonAdv(probs) {
    const classes = useStyles();
    const loading = (probs.loading === "true");
    // const {loading} = probs;
    // const [loading, setLoading] = React.useState(false);
    // const [success, setSuccess] = React.useState(false);

    // const buttonClassname = clsx({
    //     [classes.buttonSuccess]: success,
    // });

    return (
        <div className={classes.wrapper}>
            <Button
                {...probs}
                disabled={loading}
            >
                {probs.children}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
}
//
// ButtonAdv.propTypes = {
//     loading: PropTypes.bool, //PropTypes.oneOf([true, false, 0, 'Unknown']),//
// };
