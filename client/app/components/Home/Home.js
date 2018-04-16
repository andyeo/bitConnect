import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage,
} from '../../Utils/storage';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
    };

  }

  componentDidMount() {
    const token = getFromStorage('the_main_app');
    if (token) {
      //verify token
       fetch('/api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            token,
            isLoading: false
          });
        } else {  
          this.setState({
            isLoading false,   
          });
      }
     });     
    } else {
      this.setState({
        isLoading: false,
      });
    }
 
  }
    /*
    fetch('/api/counters')
      .then(res => res.json())
      .then(json => {
        this.setState({
          counters: json
        });
      });
      */
 

  
  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword

    } = this.state;

    if (isLoading){
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
        return (
        <div>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
                ) : (null)
            }
            <p> Sign In </p>
            <input type="email" placeholder="Email" value={signInEmail} /><br />
            <input type="password" placeholder="Password" value={signInPassword} /><br />
            <button>Sign In</button>
          </div>
          <br />
          <br />
        <div>
            <p> Sign Up </p>
            <input type="text" placeholder="First Name" /><br />
            <input type="text" placeholder="Last Name" /><br />
            <input type="text" placeholder="Steam ID" /><br />
            <input type="text" placeholder="Epic ID" /><br />
            <input type="email" placeholder="Email" /><br />
            <input type="password" placeholder="Password" /><br />
            <button>Sign Up</button>
        </div>
        );
    } 

      return (
        <div>
             <p>Account</p>
        </div>
     );
  }
}

export default Home;
