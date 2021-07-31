import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Form} from 'react-bootstrap';


export class RoleUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            userRole: "",
            roles: [],
            user: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.state.userId);
        this.refreshList();
    }

    // Call API
    refreshList() {
        fetch('http://localhost:5002/user/roleassign', {
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
                    this.setState({ userRole: data, roles: data.Roles })
                }
            )
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:5002/user/newroleassign',{
            method:'POST',
            credentials: 'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                Id:this.props.userId,
                Roles:this.state.roles
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

    handleChange(e,roleId) {
        let isChecked = e.target.checked;
        const newRoles = this.state.roles;
        newRoles.map(role => {
            if (role.Id == roleId){
                role.Selected = isChecked
            }
        });
        this.setState({roles : newRoles});

        const newUserRole = this.state.userRole;
        newUserRole.Roles = this.state.roles;
        this.setState({userRole : newUserRole});
      }

    render() {
        const { userRole, roles } = this.state;
        return (
            <div>
                <div id="layoutSidenav" >
                    <div id="layoutSidenav_content">
                        <main>
                            <div class="container-fluid">
                                <h1 class="mt-4">Assign role</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item"><a href="/">Master page</a></li>
                                    <li class="breadcrumb-item active">Assign role</li>
                                </ol>
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <NavLink class="btn btn-success" to="/list_user">Back to list</NavLink>
                                    </div>

                                    <div class="card-body">
                                        <div class="col-md-4">
                                            <Form onSubmit={this.handleSubmit}>
                                                <div asp-validation-summary="ModelOnly" class="text-danger"></div>
                                                {roles.map(role =>
                                                    <tr key={role.Id}>
                                                        <Form.Group controlId={role.Id}>
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <input type="checkbox" checked={role.Selected} onChange={e => this.handleChange(e,role.Id)} checkedDefault={role.Selected} />
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="mr-2">{role.Name}</div>
                                                                </div>
                                                            </div>
                                                        </Form.Group>
                                                    </tr>)
                                                }
                                                <div class="form-group">
                                                    <input type="submit" value="Save" class="btn btn-primary" />
                                                </div>
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
