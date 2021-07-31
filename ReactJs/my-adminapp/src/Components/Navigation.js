//import { result } from 'lodash';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../css/styles.css';




export class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkAdmin: "true",
            resultLanguage: "",
            currentLanguageId: "",
            languages: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
    }



    // Call API
    refreshList() {
        fetch('http://localhost:5002/language/LanguageResult', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        )
            .then(response => response.json())
            .then(
                data => {
                    this.setState({
                        resultLanguage: data,
                        currentLanguageId: data.CurrentLanguageId,
                        languages: data.Languages
                    })
                }
            )
    }

    async callApiChange() {
        await fetch('http://localhost:5002/language/CallChangeLanguage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body:JSON.stringify({
                CurrentLanguageId:this.state.currentLanguageId
            })
        }
        )
    }

    async handleSubmit(e) {
        e.preventDefault();
        await fetch('http://localhost:5002/user/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
            .then(

                this.setState({ checkAdmin: false })

            );


        setTimeout(() => {
            this.afterSubmit();
        }, 100);
    }

    afterSubmit() {
        this.props.handleAdminLogout(this.state.checkAdmin);
    }


    onChangeLanguage(event){
        this.setState({currentLanguageId: event.target.value});

        setTimeout(() => {
            this.afterChange();
        }, 100);
        
    }

    async afterChange(){
        await this.callApiChange();
        this.refreshList();
        this.props.handleLanguage(this.state.currentLanguageId);
    }

    componentDidMount() {
        this.refreshList();
    }


    render() {
        const { languages } = this.state;
        return (
            <div className="myNav">
                <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

                    <a className="navbar-brand ps-3" href="/index.html">Admin App</a>

                    <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="/#!"><i className="fas fa-bars"></i></button>

                    <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                            <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                        </div>
                    </form>
                    <Form.Control
                        as="select"
                        custom
                        value ={this.state.currentLanguageId}
                        onChange={this.onChangeLanguage}
                        id="frmChangeLanguage"
                        className="d-none d-md-inline-block form-inline ml-0 mr-0 mr-md-3 my-2 my-md-0"
                    >
                        {languages.map((language) => (

                            <option key={language.Id} value={language.Id}>{language.Name}</option>
                        )
                        )
                        }
                    </Form.Control>
                    <ul className="navbar-nav ml-auto ml-md-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/#!">Settings</a></li>
                                <li><a className="dropdown-item" href="/#!">Activity Log</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <Form onSubmit={this.handleSubmit}>
                                    <Button type="submit" className="dropdown-item">Logout</Button>
                                </Form>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

