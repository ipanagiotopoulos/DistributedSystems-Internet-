import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Navigation from './Layout/Navigation';
import Login from './Components/Login';
import Layout from './Layout/Layout';
import Footer from './Layout/Footer';
import NoMatch from './Components/NoMatch';
import withAuth from './withAuth';
import Secret from './Components/Secret';
import ShowApplication from './Components/ShowApplication';
import CreateApplication from './Components/CreateApplication';
import Register from './Components/Register';

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <Router>
            <Navigation />
            <Layout>
              <Switch>
                <Route exact path="/" component={withAuth(Home)}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/showApplication" component={withAuth(ShowApplication)} />
                <Route exact path="/createApplication" component={withAuth(CreateApplication)} />
                <Route exact path="/secret" component={withAuth(Secret)} />
                <Route component={NoMatch} />
              </Switch>
            </Layout>
          <Footer />
          </Router>
        </React.Fragment>
    );
  }
}

export default App;