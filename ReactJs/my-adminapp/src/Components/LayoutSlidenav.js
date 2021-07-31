import React, { Component } from 'react';
import '../css/styles.css';
import '../js/scripts';
import 'bootstrap';
import { NavLink } from 'react-router-dom';





export class LayoutSlidenav extends Component {
    render() {
        return (
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading">Administration system</div>
                                <NavLink className="nav-link" to="/">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </NavLink>
                                <div className="sb-sidenav-menu-heading">System</div>


                                <a className="nav-link collapsed" href="/#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    User
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <NavLink className="nav-link" to="/list_user">List</NavLink>
                                        <NavLink className="nav-link" to="/create_user">Create new</NavLink>
                                    </nav>
                                </div>

                                <a className="nav-link collapsed" href="/#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Category
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <a className="nav-link collapsed" href="/#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                            Product
                                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </a>
                                        <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                            <NavLink className="nav-link" to="/list_product">List</NavLink>
                                            <NavLink className="nav-link" to="/create_product">Create new</NavLink>
                                            </nav>
                                        </div>
                                    </nav>
                                </div>
                                <div className="sb-sidenav-menu-heading">Addons</div>
                                <a className="nav-link" href="charts.html">
                                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                    Charts
                                </a><a className="nav-link" href="tables.html">
                                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                    Tables
                                </a>
                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            <div className="small">Logged in as:</div>
                            Start Bootstrap
                        </div>
                    </nav>
                </div>
                
            </div>
        )
    }
}