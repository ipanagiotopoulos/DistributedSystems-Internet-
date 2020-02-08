import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Alert} from 'react-bootstrap'

class CreateApplication extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: Cookies.get('username'),
            user: [],
            departmentName: '',
            city: '',
            personalIncome: '',
            familyIncome: '',
            parent1_employmentStatus: '',
            parent2_employmentStatus: '',
            siblingsStudents: '',
            isLoading: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/spring-mvc-1/api/students/'+this.state.username)
            .then(function(response) {
                return response.json()
            })
            .then(jsonData => {
                this.setState({user: jsonData, isLoading: false})
            })
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var answer = {
            username: this.state.username,
            departmentName: this.state.user.userInformation.departmentName,
            city: this.state.city,
            personalIncome: this.state.personalIncome,
            familyIncome: this.state.familyIncome,
            parent1_employmentStatus: this.state.parent1_employmentStatus,
            parent2_employmentStatus: this.state.parent2_employmentStatus,
            siblingsStudents: this.state.siblingsStudents,
            active: null
        }
        console.log(answer)
        fetch('http://localhost:8080/spring-mvc-1/api/addApplication', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(answer),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Accept': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                alert('Successful Application')
                this.props.history.push('/');
            } else {
                alert('Error')
            }
        })
    }

    render() {
        const { isLoading } = this.state;
        const { user } = this.state;
        const application = user.application;
        return (
            <React.Fragment>
            {!isLoading ? (
                application!=null ? (
                    <Alert variant="danger" className="mt-5">
                        <Alert.Heading>Application Exists</Alert.Heading>
                        <p>Navigate to Show Application</p>
                    </Alert>
                ): (
                    <React.Fragment>
                    {/* <Alert variant="success" className="mt-5">
                    <Alert.Heading>Application Form</Alert.Heading> */}
                    <br />
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 mt-5 mx-auto">
                                    <form onSubmit={this.handleSubmit}>
                                    <h1 className="h3 mb-3 font-weight-normal">Application Form</h1>
                                    <div className="form-group">
                                        <label>City</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        placeholder="City"
                                        value={this.state.city}
                                        onChange={this.handleChange}
                                        required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Personal Income</label>
                                        <input
                                        type="number"
                                        className="form-control"
                                        name="personalIncome"
                                        placeholder="Personal Income"
                                        value={this.state.personalIncome}
                                        onChange={this.handleChange}
                                        required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Family Income</label>
                                        <input
                                        type="number"
                                        className="form-control"
                                        name="familyIncome"
                                        placeholder="Family Income"
                                        value={this.state.familyIncome}
                                        onChange={this.handleChange}
                                        required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Parent 1 Employment Status</label>
                                        <select
                                        name="parent1_employmentStatus"
                                        className="form-control"
                                        value={this.state.parent1_employmentStatus} 
                                        onChange={this.handleChange}
                                        required>
                                            <option value="" defaultValue>Select Employment Status</option>
                                            <option value="emp">Employed</option>
                                            <option value="unemp">Unemployed</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Parent 2 Employment Status</label>
                                        <select
                                        name="parent2_employmentStatus"
                                        className="form-control"
                                        value={this.state.parent2_employmentStatus} 
                                        onChange={this.handleChange}
                                        required>
                                            <option value="" defaultValue>Select Employment Status</option>
                                            <option value="emp">Employed</option>
                                            <option value="unemp">Unemployed</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Siblings Students</label>
                                        <input
                                        type="number"
                                        className="form-control"
                                        name="siblingsStudents"
                                        placeholder="Sibling Students"
                                        value={this.state.siblingsStudents}
                                        onChange={this.handleChange}
                                        required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary btn-block"
                                    >
                                        Send Application
                                    </button>
                                    </form>
                                </div>
                                </div>
                            </div>






                     {/* </Alert> */}
                     </React.Fragment>
                )
            ) : (
                <h3>Loading...</h3>
            )}
            </React.Fragment>
        );
    }
}

export default CreateApplication