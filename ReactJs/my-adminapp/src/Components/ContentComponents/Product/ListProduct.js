import React, { Component } from 'react';
import { filter, includes } from 'lodash';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { Form, FormControl } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

export class ListProduct extends Component {


    constructor(props) {
        super(props);
        this.state = {
            categoryId: "",
            categories: [],
            languageId: this.props.languageId,
            dataProducts: [],
            strSearch: "",
            filterCategory: ""
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
    }

    // Call API
    refreshList() {
        fetch('http://localhost:5002/product/getall?languageId=' + this.state.languageId + "&categoryId=" + this.state.categoryId,
            {
                credentials: 'include'
            }
        )
            .then(response => response.json())
            .then(
                data => {
                    this.setState({ dataProducts: data.products, categories: data.categories })
                }
            )
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.refreshList();
    }

    handleEditProduct(content) {
        this.props.handleEditProductId(content);
    }

    handleCategoryProduct(content) {
        this.props.handleCategoryProductId(content);
    }

    deleteProduct(productId) {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:5002/product/delete', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    Id: productId,
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
    onChangeCategory(event){
        this.setState({categoryId: event.target.value});

        setTimeout(() => {
            this.afterChange();
        }, 100);
        
    }
    async afterChange(){
        this.refreshList();
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.languageId !== this.state.languageId) {
            await this.setState({ languageId: nextProps.languageId });
            this.refreshList();
        }
    }

    render() {
        let products = [];
        const { dataProducts , categories} = this.state;

        products = filter(
            dataProducts, (item) => {
                return includes(item.Name, this.state.strSearch);
            }
        );
        return (
            <div>
                <div id="layoutSidenav" >
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">
                                <h1 className="mt-4">List of Product</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item"><NavLink to="/">Dashboard</NavLink></li>
                                    <li className="breadcrumb-item active">List of Product</li>
                                </ol>
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-md-6 col-xs-12">
                                                <NavLink className="btn btn-success" to="/create_product">Create new</NavLink>

                                            </div>
                                            <div className="col-md-6 col-xs-12">
                                                <Form>
                                                    <div className="row">

                                                        <div className="col-md-7">
                                                            <FormControl value={this.state.strSearch} type="text" placeholder="Search by name" ref="search" onChange={this.handleChange} />
                                                        </div>
                                                        <div class="col-md-5">
                                                            <Form.Control
                                                                as="select"
                                                                custom
                                                                value={this.state.categoryId}
                                                                onChange={this.onChangeCategory}
                                                                id="frmChangeLanguage"
                                                                className="d-none d-md-inline-block form-inline ml-0 mr-0 mr-md-3 my-2 my-md-0"
                                                            >
                                                                <option value="">---Choose category---</option>
                                                                {categories.map((item) => (

                                                                    <option key={item.Id} value={item.Id}>{item.Name}</option>
                                                                )
                                                                )
                                                                }
                                                            </Form.Control>
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
                                                            <th>Id</th>
                                                            <th>Name</th>
                                                            <th>Origin Price</th>
                                                            <th>Price</th>
                                                            <th>Status</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {products.map(item =>
                                                            <tr key={item.Id}>
                                                                <td>{item.Id}</td>
                                                                <td>{item.Name}</td>
                                                                <td>{item.OriginalPrice}</td>
                                                                <td>{item.Price}</td>
                                                                <td>{item.Stock}</td>
                                                                <td>
                                                                    <ButtonToolbar>
                                                                        <NavLink className="btn btn-warning mr-3" to="/category_product" onClick={() => this.handleCategoryProduct(item.Id)}>Assign</NavLink>
                                                                        <NavLink className="btn btn-info mr-3" to="/edit_product" onClick={() => this.handleEditProduct(item.Id)}>Edit</NavLink>
                                                                        <Button variant='danger' className="p-1"
                                                                            onClick={() => this.deleteProduct(item.Id)}>
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
