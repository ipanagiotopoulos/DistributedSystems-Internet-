import React, {Component} from 'react';
import Cookies from 'js-cookie';

class Edit extends Component {

    state = {
        username: Cookies.get('username'),
        user: {},
        name: '',
        email: '',
        isLoading: true
    }

    componentDidMount() {
        fetch('http://localhost:8080/spring-mvc-1/api/students/'+this.state.username)
            .then(function(response) {
                return response.json()
            })
            .then(jsonData => {
                console.log(jsonData);
                this.setState({user: jsonData, name: jsonData.userInformation.name, email: jsonData.userInformation.email, isLoading: false})
                console.log(this.state)
            })
    }

    onChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        var body = {
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            departmentName: this.state.user.userInformation.departmentName,
            points: this.state.user.userInformation.points,
            activated: this.state.user.userInformation.activated
        }
        fetch('http://localhost:8080/spring-mvc-1/api/editUser', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Accept': 'application/json'
            },
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(body)
        }).then(res => {
            if(res.status==200) {
                alert('Details updated!')
                this.props.history.push('/');
            }
        })
    }

    render() {
        const { isLoading } = this.state;
        const { user } = this.state;
        return (
            <React.Fragment>
            {!isLoading ? (
                <div className="container">
                <div className="row">
                  <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Edit details</h1>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.onChange}
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
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg btn-success btn-block"
                        >
                            Submit
                        </button>
                     </form>
                  </div>
                </div>
              </div>
            ) : (
                <h3>Loading...</h3>
            )}
            </React.Fragment>
        );
    }
}

export default Edit;