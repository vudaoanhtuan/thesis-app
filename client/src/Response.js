import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

import { withStyles, makeStyles } from '@material-ui/core/styles';


const ScoreChip = withStyles({
  root: {
    background: '#52af77',
    width: 60,
    marginRight: 10
  },
})(Chip);


class Response extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const list_res = [<Divider key="top_divider"/>]
        for (const i in this.props.predict) {
          list_res.push(
            <div key={i}>
              <ListItem>
                <ScoreChip
                  size="small"
                  label={this.props.predict[i]['score'].toFixed(4)}
                  color="primary"
                />
                <ListItemText primary={this.props.predict[i]['text']} />
              </ListItem>
              <Divider/>
            </div>
          )
        }
        return (
        <Container maxWidth="md" >
          <Typography variant="h5">Top Prediction</Typography>
          <List component="nav">
            {list_res}
          </List>
        </Container>
        );
    }
}

export default Response