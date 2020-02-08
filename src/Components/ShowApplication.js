import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Alert} from 'react-bootstrap'

class ShowApplication extends Component {

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
            })
    }

    render() {
        const { isLoading } = this.state;
        const { user } = this.state;
        const application = user.application;
        return (
            <React.Fragment>
            {!isLoading ? (
                application==null ? (
                    <Alert variant="danger" className="mt-5">
                        <Alert.Heading>No Application</Alert.Heading>
                        <p>Please Make New Application</p>
                    </Alert>
                ): (
                    <Alert variant={application.active === 'inactive' ? ("danger") : application.active === 'active' ? ("success") : ("warning")} className="mt-5">
                    <Alert.Heading>Application</Alert.Heading>
                    <br />
                    <p>Username: {application.username}</p>
                    <p>Department: {application.departmentName}</p>
                    <p>City: {application.city}</p>
                    <p>Income: {application.personalIncome} €</p>
                    <p>Family Income: {application.familyIncome} €</p>
                    <p>Parent 1: {application.parent1_employmentStatus === 'emp' ? ('Employed') : ('Unemployed')}</p>
                    <p>Parent 2: {application.parent2_employmentStatus === 'emp' ? ('Employed') : ('Unemployed')}</p>
                    <p>Number of Student Siblings: {application.siblingsStudents}</p>
                    <p>Application Status: <strong>{application.active === null ? ("Pending...") : application.active}</strong></p>
                    <p>Rank: {user.userInformation.rank == null ? ("-/-") : user.userInformation.rank + "/" + user.userInformation.totalRanks}</p>
                    <p>Qualifying for Free Meal: <strong>{user.userInformation.rank == null ? ("-")
                            : user.userInformation.hasFreeMeal == '1' ? ("Yes") : ("No")}</strong></p>
                    </Alert>
                )
            ) : (
                <h3>Loading...</h3>
            )}
            </React.Fragment>
        );
    }
}

export default ShowApplication