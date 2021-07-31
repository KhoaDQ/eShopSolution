import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
//import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';


export class DetailUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            user: ""
        }
    }

    componentDidMount() {
        console.log(this.state.userId);
        this.refreshList();
    }

    // Call API
    refreshList() {
        fetch('http://localhost:5002/user/getbyid', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                Id: this.state.userId,
            })
        })
            .then(response => response.json())
            .then(
                data => {
                    this.setState({ user: data })
                }
            )
    }

    render() {
        return (
            <div>
                <div id="layoutSidenav" >
                    <div id="layoutSidenav_content">
                        <main>
                            <div class="container-fluid">
                                <h1 class="mt-4">Details</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item"><a href="/">Master page</a></li>
                                    <li class="breadcrumb-item active">Details</li>
                                </ol>
                                <div class="card mb-4">
                                    <div class="card-header">
                                    <NavLink class="btn btn-success" to="/list_user">Back to list</NavLink>
                                    </div>

                                    <div class="card-body">
                                        <div class="col-md-12">
                                            <dl class="row">
                                                <dt class="col-sm-2">
                                                    FirstName
                                                </dt>
                                                <dd class="col-sm-10">
                                                    {this.state.user.FirstName}
                                                </dd>
                                                <dt class="col-sm-2">
                                                    LastName
                                                </dt>
                                                <dd class="col-sm-10">
                                                    {this.state.user.LastName}
                                                </dd>
                                                <dt class="col-sm-2">
                                                    Date of Birth
                                                </dt>
                                                <dd class="col-sm-10">
                                                    {this.state.user.Dob}
                                                </dd>
                                                <dt class="col-sm-2">
                                                    UserName
                                                </dt>
                                                <dd class="col-sm-10">
                                                    {this.state.user.UserName}
                                                </dd>
                                                <dt class="col-sm-2">
                                                    Email
                                                </dt>
                                                <dd class="col-sm-10">
                                                    {this.state.user.Email}
                                                </dd>
                                                <dt class="col-sm-2">
                                                    PhoneNumber
                                                </dt>
                                                <dd class="col-sm-10">
                                                    {this.state.user.PhoneNumber}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}
