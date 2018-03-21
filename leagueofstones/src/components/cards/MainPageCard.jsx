import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import SearchBar from '../tools/SearchBar.jsx';
import IconButton from 'material-ui/IconButton';
import { SocialIcon } from 'react-social-icons';

const styles = {
  card: {
    margin: 'auto 10px',
    minHeight: '400px',
    marginBottom: '20px'
  },
  media: {
    height: '200px',
  },
  info: {
    fontStyle: 'italic',
  },
  indication: {
    fontWeight: 'bold',
    paddingTop: '50px',
    position: 'absolute',
    bottom: '0',
    right: '0',
    left: '0',
    marginBottom: '20px'
  },
  icons: {
    width: 'unset',
    height: 'unset',
    margin: '10px'
  }
};

class MainPageCard extends React.Component {
	render() {
	  return (
		  <Card style={styles.card}>
			     {this.props.children}
		  </Card>
	  );
	}
}


MainPageCard.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPageCard);
