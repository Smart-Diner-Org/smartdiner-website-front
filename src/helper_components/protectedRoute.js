import React, { Component }  from 'react';
import { Redirect } from 'react-router-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import UserProfile from '../helpers/userProfile';

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: UserProfile.getToken()
    };
  }

  render() {
    const { component: Component, ...props } = this.props
    return (
      <Route 
        {...props} 
        render={props => (
          this.state.authenticated ?
            <Component {...props} /> :
            <Redirect to='/admin-panel' />
        )}
      />
    );
  }
}
export default ProtectedRoute;