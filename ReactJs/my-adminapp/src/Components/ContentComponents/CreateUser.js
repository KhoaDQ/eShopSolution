import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';




export class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:5002/user/create',{
            method:'POST',
            credentials: 'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                FirstName:e.target.FirstName.value,
                LastName:e.target.LastName.value,
                Dob:e.target.Dob.value,
                Email:e.target.Email.value,
                PhoneNumber:e.target.PhoneNumber.value,
                UserName:e.target.UserName.value,
                Password:e.target.Password.value,
                ConfirmPassword:e.target.ConfirmPassword.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render() {
        return (
            <div>
                <div id="layoutSidenav" >
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">
                                <h1 className="mt-4">Create user</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item"><a href="/">Master page</a></li>
                                    <li className="breadcrumb-item active">Create user</li>
                                </ol>
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <NavLink className="btn btn-success" to="/list_user">Back to list</NavLink>
                                    </div>

                                    <div className="card-body">
                                        <div className="col-md-4">
                                            <Form onSubmit={this.handleSubmit}>
                                                <Form.Group controlId="FirstName">
                                                    <Form.Label>FirstName</Form.Label>
                                                    <Form.Control type="text" name="FirstName" required
                                                        //disabled
                                                        placeholder="FirstName" />
                                                </Form.Group>

                                                <Form.Group controlId="LastName">
                                                    <Form.Label>LastName</Form.Label>
                                                    <Form.Control type="text" name="LastName" required
                                                        placeholder="LastName" />
                                                </Form.Group>

                                                <Form.Group controlId="Dob">
                                                    <Form.Label>Date Of Birth</Form.Label>
                                                    <Form.Control type="text" name="Dob"
                                                        placeholder="Date Of Birth" />
                                                </Form.Group>

                                                <Form.Group controlId="Email">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="text" name="Email"
                                                        placeholder="Email" />
                                                </Form.Group>

                                                <Form.Group controlId="PhoneNumber">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control typeof="text" name="PhoneNumber"
                                                        placeholder="PhoneNumber" />
                                                </Form.Group>
                                                <Form.Group controlId="UserName">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control typeof="text" name="UserName" required
                                                        placeholder="UserName" />
                                                </Form.Group>
                                                <Form.Group controlId="Password">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control typeof="text" name="Password" required
                                                        placeholder="Password" />
                                                </Form.Group>
                                                <Form.Group controlId="ConfirmPassword">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control typeof="text" name="ConfirmPassword" required
                                                        placeholder="ConfirmPassword" />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Button variant="primary" type="submit">
                                                        Save
                                                    </Button>
                                                </Form.Group>
                                            </Form>
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
