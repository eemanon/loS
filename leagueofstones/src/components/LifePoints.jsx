import React from 'react';

const styles = {
	container: {
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		padding: '8px',
	},
	heart: {
    	fontFamily: 'impact',
    	textAlign: 'center',
    	color: 'white',
		fontSize: '2vw',
		backgroundImage: 'url('+process.env.PUBLIC_URL+'/images/heart.png'+')',
    	backgroundRepeat: 'no-repeat',
    	backgroundSize: 'contain',
		display: 'inline-block',
		width: '100%',
		height: '100%',
		paddingTop: '25%', 
	}
}

class LifePoints extends React.Component {
	render(){
		return(
			<div style={styles.heart} onClick={this.props.attackPlayer} >{Math.round(this.props.value,1)}</div>
		);
	}

}

export default LifePoints;