import React, { Component } from 'react';
import bcrypt from 'bcryptjs';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
        users: [],
        username: '',
        password: '',
        enabled: '1',
        departmentName: '',
        name: '',
        email: '',
        active: 'inactive',
        authorityRole: 'ROLE_STUDENT',
        hash: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  passwordVisibilityHandler = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  onChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.state.password.toString(), salt)
    this.setState({hashedPassword: hash});

    fetch('http://localhost:8080/spring-mvc-1/api/user/'+this.state.username+'/')
        .then(user => user.json())
        .then(user => {
            if(Object.keys(user).length=='0'){
                var answer1 = {
                    username: this.state.username,
                    password: this.state.hashedPassword,
                    enabled: '1',            
                }

                var answer2 = {
                    username: this.state.username,
                    name: this.state.name,
                    email: this.state.email,
                    departmentName: this.state.departmentName,
                    points: '',
                    activated: 'inactive'
                }

                var answer3 = {
                    username: this.state.username,
                    authorityRole: 'ROLE_STUDENT'
                }
                fetch('http://localhost:8080/spring-mvc-1/api/addUser', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(answer1)
                })
                .then(res => {
                    if(res.status == 200) {
                        fetch('http://localhost:8080/spring-mvc-1/api/addUserInformation', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': 'http://localhost:3000',
                                'Accept': 'application/json'
                            },
                            method: 'POST',
                            credentials: 'include',
                            body: JSON.stringify(answer2)
                        })
                        .then(res => {
                            if(res.status == 200) {
                                fetch('http://localhost:8080/spring-mvc-1/api/addAuthority', {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                                        'Accept': 'application/json'
                                    },
                                    method: 'POST',
                                    credentials: 'include',
                                    body: JSON.stringify(answer3)
                                })
                                .then(res => {
                                    if (res.status == 200){
                                        alert('User created!')
                                        this.props.history.push('/');
                                    } else {
                                        alert('Error inserting authority')
                                    }
                                })
                            } else {
                                alert('Error inserting userInformation')
                            }
                        })
                    } else {
                        alert('Error inserting user')
                    }
                })
            } else {
                alert('Username exists!')
            }
        })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
                <input
                  type="checkbox" onClick={this.passwordVisibilityHandler}
                /> Show Password
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter name"
                  value={this.state.name}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                  <label>Department</label>
                  <select
                    name="departmentName"
                    className="form-control"
                    value={this.state.departmentName} 
                    onChange={this.onChange} 
                    required
                  >
                    <option value="" defaultValue>Select Department</option>
                    <option value="Informatics">Informatics</option>
                    <option value="Geography">Geography</option>
                    <option value="Dietics">Dietics</option>
                    <option value="Economics">Economics</option>
                  </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                >
                    Register
                </button>
             </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register