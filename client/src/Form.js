import React from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import Response from './Response'

const axios = require('axios').default;
const api_address = process.env['REACT_APP_API_ADDRESS'];

const PercentSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 4,
      borderRadius: 4,
    },
    rail: {
      height: 4,
      borderRadius: 4,
    },
  })(Slider);

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            beam_size: 1,
            lm_alpha: 0.0,
            submit_button_available: true
        }
    }

    inputChangeHandler(event) {
        this.setState({
            input: event.target.value
        })
    }

    handleSliderLM(event, value) {
        this.setState({
            lm_alpha: value / 100
        })
    };
    
    handleSliderBeam(event, value) {
        this.setState({
            beam_size: value
        })
    };

    show_response(event) {
        const element = <CircularProgress/>
        ReactDOM.render(element, document.getElementById("response"))
        const text = this.state.input;
        const lm_alpha = this.state.lm_alpha;
        const beam_size = this.state.beam_size;
        axios.post(api_address, {
            text: text,
            lm_alpha: lm_alpha,
            beam_size: beam_size
        })
        .then(function (response) {
            const pred = response.data
            const element = <Response predict={pred}/>
            ReactDOM.render(element, document.getElementById("response"))
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    clear_button_clicked(event) {
        this.setState({
            input: ""
        })
        ReactDOM.render(null, document.getElementById("response"))
    }

    render() {
        return (
            <Container maxWidth="md">
                <FormControl fullWidth>
                <TextField
                    id="form-input-text"
                    placeholder="Input your text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline={true}
                    onChange={this.inputChangeHandler.bind(this)}
                    value={this.state.input}
                    />

                {/* <Typography align="left" variant="h5">Option</Typography> */}

                <Typography id="beam_size" align="left">beam_size: {this.state.beam_size}</Typography>
                <PercentSlider 
                    valueLabelDisplay="off" 
                    aria-labelledby="beam_size" 
                    defaultValue={1} 
                    min={1} 
                    max={10}
                    onChange={this.handleSliderBeam.bind(this)}
                />

                <Typography  id="lm_alpha" align="left">lm_alpha: {this.state.lm_alpha}</Typography>
                <PercentSlider 
                    valueLabelDisplay="off" 
                    aria-labelledby="lm_alpha" 
                    defaultValue={0} 
                    scale={(x) => x / 100}
                    onChange={this.handleSliderLM.bind(this)}
                />
                <br></br>
                </FormControl>

                <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    disabled={!this.state.submit_button_available}
                    onClick={this.show_response.bind(this)}
                >
                    Submit
                </Button>
                {' '}
                <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    onClick={this.clear_button_clicked.bind(this)}
                >
                    Clear
                </Button>
            </Container>
        );
    }

}

export default Form;
