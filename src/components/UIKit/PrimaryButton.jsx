import React from 'react';
import { Button } from '@material-ui/core';

const PrimaryButton = (props) => {
    return (
        <Button className={props.className} variant="contained" color="primary" onClick={props.onClick}>
            {props.label}
        </Button>
    )
};

export default PrimaryButton;