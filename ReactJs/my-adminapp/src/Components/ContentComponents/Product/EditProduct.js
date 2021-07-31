import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

export class EditProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productId: this.props.productId,
            product: "",
            languageId: this.props.languageId,
            file: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.languageId !== this.state.languageId) {
            this.setState({ languageId: nextProps.languageId });
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    // Call API
    refreshList() {
        fetch('http://localhost:5002/product/getbyid', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                Id: this.state.productId,
                LanguageId: this.state.languageId
            })
        })
            .then(response => response.json())
            .then(
                data => {
                    this.setState({ product: data })
                }
            )
    }

    handleSubmit(e) {
        const form = new FormData();

        form.append("Name", e.target.Name.value);
        form.append("Description", e.target.Description.value);
        form.append("Details", e.target.Details.value);
        form.append("SeoDescription", e.target.SeoDescription.value);
        form.append("SeoTitle", e.target.SeoTitle.value);
        form.append("SeoAlias", e.target.SeoAlias.value);
        form.append("LanguageId", this.state.languageId);
        form.append("Id", this.state.productId);
        form.append("ThumbnailImage", this.state.file)

        e.preventDefault();
        fetch('http://localhost:5002/product/update', {
            method: 'PUT',
            credentials: 'include',
            // headers: {
            //     'Accept': 'multipart/form-data',
            //     'Content-Type':'multipart/form-data'
            // },
            body: form
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }

    handleImageChange(e) {
        e.preventDefault();
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <div>
                <div id="layoutSidenav" >
                    <div id="layoutSidenav_content">
                        <main>
                            <div class="container-fluid">
                                <h1 class="mt-4">Edit product</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item"><a href="/">Master page</a></li>
                                    <li class="breadcrumb-item active">Edit product</li>
                                </ol>
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <NavLink class="btn btn-success" to="/list_product">Back to list</NavLink>
                                    </div>
                                    <div className="card-body">
                                        <div className="col-md-4">
                                            <Form onSubmit={this.handleSubmit}>
                                                <Form.Group controlId="Name">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control type="text" name="Name"
                                                        //disabled
                                                        defaultValue={this.state.product.Name}
                                                        placeholder="Name" />
                                                </Form.Group>

                                                <Form.Group controlId="Description">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control type="text" name="Description"
                                                        defaultValue={this.state.product.Description}
                                                        placeholder="Description" cols="5" />
                                                </Form.Group>
                                                <Form.Group controlId="Details">
                                                    <Form.Label>Details</Form.Label>
                                                    <Form.Control type="text" name="Details"
                                                    defaultValue={this.state.product.Details}
                                                        placeholder="Details" />
                                                </Form.Group>
                                                <Form.Group controlId="SeoDescription">
                                                    <Form.Label>Seo Description</Form.Label>
                                                    <Form.Control type="text" name="SeoDescription"
                                                    defaultValue={this.state.product.SeoDescription}
                                                        placeholder="SeoDescription" />
                                                </Form.Group>
                                                <Form.Group controlId="SeoTitle">
                                                    <Form.Label>Seo Title</Form.Label>
                                                    <Form.Control type="text" name="SeoTitle"
                                                    defaultValue={this.state.product.SeoTitle}
                                                        placeholder="SeoTitle" />
                                                </Form.Group>
                                                <Form.Group controlId="SeoAlias">
                                                    <Form.Label>Seo Alias</Form.Label>
                                                    <Form.Control type="text" name="SeoAlias"
                                                    defaultValue={this.state.product.SeoAlias}
                                                        placeholder="SeoAlias" />
                                                </Form.Group>
                                                <Form.Group controlId="ThumbnailImage">
                                                    <Form.Label>Thumbnail Image</Form.Label>
                                                    <Form.Control type="file" name="ThumbnailImage"
                                                        placeholder="ThumbnailImage" onChange={this.handleImageChange} />
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
