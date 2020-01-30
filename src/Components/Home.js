import React, {Component} from 'react';
import { Alert } from 'react-bootstrap';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'

class Home extends Component {

    state = {
        username: Cookies.get('username'),
        user: [],
        isLoading: true
    }

    componentDidMount() {
        fetch('http://localhost:8080/spring-mvc-1/api/students/'+this.state.username)
            .then(function(response) {
                return response.json()
            })
            .then(jsonData => {
                this.setState({user: jsonData, isLoading: false})
                console.log(this.state.user, this.props)
            })
    }

    render() {
        const { isLoading } = this.state;
        const { user } = this.state;
        return (
            <React.Fragment>
            {!isLoading ? (
                <Alert variant="success" className="mt-5">
                    <Alert.Heading>My Profile</Alert.Heading>
                    <br />
                    <p>Username: {user.username}</p>
                    <p>Name: {user.userInformation.name}</p>
                    <p>Email: {user.userInformation.email}</p>
                    <p>Department: {user.userInformation.departmentName}</p>
                    <Link to="/edit">Edit Information</Link>
                </Alert>
            ) : (
                <h3>Loading...</h3>
            )}
            </React.Fragment>
        );
    }
}

export default Home;