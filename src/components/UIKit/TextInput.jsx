import React from 'react';
import Textfield from '@material-ui/core/TextField';

const TextInput = (props) => {
    return (
        <Textfield 
            fullWidth={props.fullWidth}
            label={props.label}
            margin='dense'
            multiline={props.multiline}
            required={props.required}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
        />
    )
}

export default TextInput