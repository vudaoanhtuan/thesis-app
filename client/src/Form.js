import React from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import Response from './Response'

const axios = require('axios').default;
const api_address = process.env['REACT_APP_API_ADDRESS'];

class Form extends React.Component {
    render() {
        return (
            <Container maxWidth="md">
                <FormControl fullWidth>
                <TextField
                    id="form-input-text"
                    placeholder="Input your text"
                    fullWidth
                    margin="normal"
                    variant='outlined'
                />
                </FormControl>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    onClick={() => this.show_response()}
                >
                    Submit
                </Button>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    onClick={() => {
                        const e = document.getElementById("form-input-text");
                        e.value = "";
                    }}
                >
                    Clear
                </Button>
            </Container>
        );
    }

    show_response() {
        const e = document.getElementById("form-input-text");
        const text = e.value;
        axios.post(api_address, {
            text: text
        })
        .then(function (response) {
            const input = response.data['input']
            const pred = response.data['predict']
            const element = <Response input={input} predict={pred}/>
            ReactDOM.render(element, document.getElementById("response"))
        })
        .catch(function (error) {
            console.log(error);
        });

    }
}

export default Form;
