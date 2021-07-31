import React, { Component } from 'react';
import { filter, includes } from 'lodash';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { Form,FormControl } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

export class ListUser extends Component {


    constructor(props) {
        super(props);
        this.state = {

            dataUsers: [],
            strSearch: ""
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Call API
    refreshList() {
        fetch('http://localhost:5002/user/getall',
            {
                credentials: 'include'
            }
        )
            .then(response => response.json())
            .then(
                data => {
                    this.setState({ dataUsers: data })
                }
            )
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.refreshList();
    }

    handleEditUser(content) {
        this.props.handleEditUserId(content);
    }

    handleDetailUser(content) {
        this.props.handleDetailUserId(content);
    }

    handleRoleUser(content) {
        this.props.handleRoleUserId(content);
    }

    deleteUser(userId) {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:5002/user/delete', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    Id: userId,
                })
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                },
                    (error) => {
                        alert('Failed');
                    })

            setTimeout(() => {
                this.refreshList();
            }, 1000);
        }
    }

    handleChange(event) {
        this.setState({ strSearch: event.target.value });
    }
    handleSearch() {
        console.log(this.state.strSearch);
    }

    render() {
        let users = [];
        const { dataUsers } = this.state;

        users = filter(
            dataUsers, (item) => {
                return includes(item.Email, this.state.strSearch);
            }
        );
        return (
            <div>
                <div id="layoutSidenav" >
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">
                                <h1 className="mt-4">List of User</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item"><NavLink to="/">Dashboard</NavLink></li>
                                    <li className="breadcrumb-item active">List of User</li>
                                </ol>
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-md-6 col-xs-12">
                                                <NavLink className="btn btn-success" to="/create_user">Create new</NavLink>

                                            </div>
                                            <div className="col-md-6 col-xs-12">
                                                <Form>
                                                    <div className="row">
                                                        <div className="col-md-3"></div>

                                                        <div className="col-md-9">
                                                            <FormControl value={this.state.strSearch} type="text" placeholder="Search by email" ref="search" onChange={this.handleChange} />

                                                        </div>

                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body">

                                        <div className="table-responsive">
                                            <div className="Admin">
                                                <Table className="mt-4" striped bordered hover size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>First Name</th>
                                                            <th>Last Name</th>
                                                            <th>Phone number</th>
                                                            <th>Username</th>
                                                            <th>Email</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {users.map(user =>
                                                            <tr key={user.Id}>
                                                                <td>{user.FirstName}</td>
                                                                <td>{user.LastName}</td>
                                                                <td>{user.PhoneNumber}</td>
                                                                <td>{user.UserName}</td>
                                                                <td>{user.Email}</td>
                                                                <td>
                                                                    <ButtonToolbar>
                                                                        <NavLink className="btn btn-success mr-3" to="/detail_user" onClick={() => this.handleDetailUser(user.Id)}>Details</NavLink>
                                                                        <NavLink className="btn btn-warning mr-3" to="/role_user" onClick={() => this.handleRoleUser(user.Id)}>Assign</NavLink>
                                                                        <NavLink className="btn btn-info mr-3" to="/edit_user" onClick={() => this.handleEditUser(user.Id)}>Edit</NavLink>
                                                                        <Button variant='danger' className="p-1"
                                                                            onClick={() => this.deleteUser(user.Id)}>
                                                                            Delete
                                                                        </Button>
                                                                    </ButtonToolbar>
                                                                </td>
                                                            </tr>)
                                                        }
                                                    </tbody>
                                                </Table>

                                            </div>
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
