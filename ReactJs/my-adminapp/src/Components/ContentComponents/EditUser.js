import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import {Button,Form} from 'react-bootstrap';




export class EditUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            user: ""
        }
        this.handleSubmit=this.handleSubmit.bind(this);
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

    handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:5002/user/update',{
            method:'PUT',
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
                Id:this.state.userId
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
                            <div class="container-fluid">
                                <h1 class="mt-4">Edit user</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item"><a href="/">Master page</a></li>
                                    <li class="breadcrumb-item active">Edit user</li>
                                </ol>
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <NavLink class="btn btn-success" to="/list_user">Back to list</NavLink>
                                    </div>

                                    <div class="card-body">
                                        <div class="col-md-4">
                                            <Form onSubmit={this.handleSubmit}>
                                                <Form.Group controlId="FirstName">
                                                    <Form.Label>FirstName</Form.Label>
                                                    <Form.Control type="text" name="FirstName" //required
                                                        //disabled
                                                        defaultValue={this.state.user.FirstName}
                                                        placeholder="FirstName" />
                                                </Form.Group>

                                                <Form.Group controlId="LastName">
                                                    <Form.Label>LastName</Form.Label>
                                                    <Form.Control type="text" name="LastName" required
                                                        defaultValue={this.state.user.LastName}
                                                        placeholder="LastName" />
                                                </Form.Group>

                                                <Form.Group controlId="Dob">
                                                    <Form.Label>Date Of Birth</Form.Label>
                                                    <Form.Control type="text" name="Dob"
                                                        defaultValue={this.state.user.Dob}
                                                        placeholder="Date Of Birth" />
                                                </Form.Group>

                                                <Form.Group controlId="Email">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="text" name="Email"
                                                        defaultValue={this.state.user.Email}
                                                        placeholder="Email" />
                                                </Form.Group>

                                                <Form.Group controlId="PhoneNumber">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control typeof="text" name="PhoneNumber"
                                                        defaultValue={this.state.user.PhoneNumber}
                                                        placeholder="PhoneNumber" />
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
