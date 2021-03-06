import React, { Component } from 'react';
import Home from './scenes/Home'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import DeckCreation from "./scenes/DeckCreation"
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import SignInScreen from "./scenes/SignIn";
import SignUpScreen from "./scenes/SignUp";
import Lobby from "./scenes/Lobby";
import Game from "./scenes/Game"
const initialState = {
  connected: false,
  user: '',
  token: '',
  email: '',
  useractive: false,
  waitforrequests: false
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
	 case 'SETREQUESTWAITINACTIVE':
      return Object.assign({}, state, {
        waitforrequests: false
      });
	 case 'SETREQUESTWAITACTIVE':
      return Object.assign({}, state, {
        waitforrequests: true
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
      <Route  path={baseUrl +'/signin'} component={SignInScreen}/>
      <Route  path={baseUrl+'/signup'} component={SignUpScreen}/>
      <Route  path={baseUrl+'/accueilUser'} component={Lobby}/>
      <Route  path={baseUrl+'/composerDeck'} component={DeckCreation}/>
      <Route  path={baseUrl+'/game'} component={Game}/>
    </div>
    <Footer />
    </div>
      </Router>
  </Provider>
    );
  }
}

export default App;