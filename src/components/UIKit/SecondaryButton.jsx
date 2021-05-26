import React from 'react';
import { Button } from '@material-ui/core';

const SecondaryButton = (props) => {
    return (
        <Button className={props.className} variant="contained" color="secondary" onClick={props.onClick}>
            {props.label}
        </Button>
    )
};

export default SecondaryButton;