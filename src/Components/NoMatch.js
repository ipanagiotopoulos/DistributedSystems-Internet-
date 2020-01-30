import React, {Component} from 'react';
import { Alert } from 'react-bootstrap';

class NoMatch extends Component {
    render() {
        return (
            <Alert variant="danger" className="mt-5">
                <Alert.Heading>404</Alert.Heading>
                <p>Page Not Found</p>
            </Alert>
        );
    }
}

export default NoMatch;