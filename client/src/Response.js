import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class Response extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Container maxWidth="md" >
            <Box border={1} borderRadius={5} p={1} mb={2}>
              <Typography variant="body2" align="left" color="primary">
                Input
              </Typography>
              <Typography variant="h6" align="left">
                {this.props.input}
              </Typography>
            </Box>
    
            <Box border={1} borderRadius={5} p={1}>
              <Typography variant="body2" align="left" color="primary">
                Predict
              </Typography>
              <Typography variant="h6" align="left">
                {this.props.predict}
              </Typography>
            </Box>
          </Container>
        );
    }
}

export default Response