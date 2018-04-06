import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './scenes/Home'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import SignInScreen from "./scenes/SignIn";
import SignUpScreen from "./scenes/SignUp";
import Lobby from "./scenes/Lobby";
import ComposerDeck from "./scenes/ComposerDeck";
const initialState = {
  connected: false,
  user: '',
  token: '',
  email: '',
  useractive: false,
};

function reducer(state = initialState, action) {
  switch(action.type) {
	case 'CONNECT':
      return Object.assign({}, state, {
        connected: true
      });
	case 'DISCONNECT':
      return Object.assign({}, state, {
        connected: false
      });
	case 'SETUSER':
      return Object.assign({}, state, {
        user: action.value
      });
	case 'SETTOKEN':
      return Object.assign({}, state, {
        token: action.value
      });
	case 'SETEMAIL':
      return Object.assign({}, state, {
        email: action.value
      });
	case 'SETUSERACTIVE':
      return Object.assign({}, state, {
        useractive: true
      });
	case 'SETUSERINACTIVE':
      return Object.assign({}, state, {
        useractive: false
      });
    default:
      return state;
  }
}
const store = createStore(reducer);
const baseUrl = process.env.PUBLIC_URL;

const styles = {
  container: {
    textAlign: 'center',
  	backgroundColor: '#F5F5F5',
  },

  main: {
    paddingTop:'80px',
  },
}

class App extends Component {
  render() {
    return (
	<Provider store={store}>
      <Router>
	    <div>
		<Header />
		<div style={styles.main}> 
		  <Route exact path={baseUrl +'/'} component={Home}/>
		  <Route  path='/signin' component={SignInScreen}/>
		  <Route  path='/signup' component={SignUpScreen}/>
		  <Route  path='/accueilUser' component={Lobby}/>
      <Route  path='/composerDeck' component={ComposerDeck}/>
		</div>
		<Footer />
		</div>
      </Router>
	</Provider>
    );
  }
}

export default App;
