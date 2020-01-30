import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

class Navigation extends Component {

    logout = (event) => {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
        })
    }

    render() {
        return (
            <Navbar className="navbar navbar-dark bg-dark shadow-md">
                <a className="navbar-brand" href="/">Harokopio</a>   
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/showApplication">Show Application</a>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/createApplication" className="nav-link">Create Application</NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 mx-4">
                        <FontAwesomeIcon icon={faGithub} size="2x" className="mx-1" style={{color: "rgba(98,110,129,1)"}}/>
                        <FontAwesomeIcon icon={faFacebook} size="2x" className="mx-1" style={{color: "rgba(98,110,129,1)"}}/>
                        <FontAwesomeIcon icon={faLinkedin} size="2x" className="mx-1" style={{color: "rgba(98,110,129,1)"}}/>
                        {/*<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>*/}
                        <NavLink to="/login" className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={this.logout}>Logout</NavLink>
                    </form>
                 </div>
            </Navbar>
        );
    }
}

export default Navigation;