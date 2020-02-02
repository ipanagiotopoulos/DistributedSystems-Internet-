import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    var answer = {
      username: this.state.username,
      password: this.state.password
    }
    fetch('http://localhost:4000/authenticate', {
      method: 'POST',
      body: JSON.stringify(answer),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Accept': 'application/json'
      },
      credentials: 'include'
    })
    .then(res => {
      console.log(res.status)
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        console.log('HEllooooooooooo')
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label >Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
              <Link to="/register"
                className="btn btn-lg btn-secondary btn-block"
              >
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login