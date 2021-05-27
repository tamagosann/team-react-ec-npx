import React from 'react';
import { TextField } from '@material-ui/core';

const DateInput = (props) => {
    return (
        <TextField
            fullWidth={props.fullWidth}
            margin='dense'
            label={props.label}
            type="date"
            required={props.required}
            // defaultValue={}
            InputLabelProps={{
                shrink: true,
            }}
            value={props.deadline}
            onChange={props.onChange}
      />
    )
}

export default DateInput;