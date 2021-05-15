import React from "react";
// import { Redirect } from 'react-router';
// import { sessionService } from 'redux-react-session';
import { BrowserRouter as Router, Switch } from "react-router-dom";
// import SignIn from './temp_admin/SignIn';
import Admin_Panel from "./Admin_Panel/Home";
// import ProtectedRoute from './helper_components/protectedRoute';
import UnProtectedRoute from "./helper_components/unProtectedRoute";
import Contact from "./Landing_Page/Contact/Contact";
import Home from "./Landing_Page/Home/Home";
import Login from "./Landing_Page/Login/Login";
import Team from "./Landing_Page/Team/Team";
import SignIn from "./Landing_Page/SignIn/SignIn";
import componentWrapper from "./Landing_Page/Wrapper";
import About from "./Landing_Page/About/About";
import ReactGA from "react-ga";
import OfflineOrder from "./Admin_Panel/OfflineOrder/OfflineOrder";
import MenuEditHome from "./Admin_Panel/MenuEdit/MenuEditHome";

ReactGA.initialize(`${process.env.REACT_APP_GA_INIT_API_KEY}`);

export default (
  <Router>
    <Switch>
      {/* <UnProtectedRoute exact path="/sign" component={SignIn} /> */}
      <UnProtectedRoute exact path="/admin-panel" component={Admin_Panel} />
      <UnProtectedRoute path="/createOfflineOrders" component={OfflineOrder} />
      <UnProtectedRoute
        path="/admin-panel/edit-menu"
        component={MenuEditHome}
      />
      <UnProtectedRoute
        path="/about-us"
        component={() => componentWrapper(About)}
      />
      <UnProtectedRoute
        path="/contact"
        component={() => componentWrapper(Contact)}
      />
      <UnProtectedRoute
        path="/login"
        component={() => componentWrapper(Login)}
      />
      <UnProtectedRoute
        path="/signup"
        component={() => componentWrapper(SignIn)}
      />
      <UnProtectedRoute path="/team" component={() => componentWrapper(Team)} />
      <UnProtectedRoute path="/" component={() => componentWrapper(Home)} />
    </Switch>
  </Router>
);
