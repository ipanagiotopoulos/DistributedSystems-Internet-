import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class Students extends Component {

    state = {
        students: []
    }

    componentDidMount() {
        this.getStudents();
    }

    getStudents = () => {
        fetch('http://localhost:8080/spring-mvc-1/api/students')
            .then(response => response.json())
            .then(response => this.setState({ students: response.data }))
            .catch(err => console.error(err))
    }

    renderStudent = ({username, password, name, department, activated }) => (
        <tr key={username}>
            <td>{username}</td> 
            <td>{password}</td> 
            <td>{name}</td> 
            <td>{department}</td> 
            <td>{activated == 1 ? 'Activated' : 'Not Activated'}</td>
        </tr>
    );

    render() {
        const { students } = this.state;
        return (
            <React.Fragment>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Activated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(this.renderStudent)}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}
export default Students;