import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';




export class CreateProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            languageId: this.props.languageId,
            file: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.languageId !== this.state.languageId) {
            this.setState({ languageId: nextProps.languageId });
        }
    }


    handleSubmit(e) {

        const form = new FormData();

        form.append("Name", e.target.Name.value);
        form.append("Price", e.target.Price.value);
        form.append("OriginalPrice", e.target.OriginalPrice.value);
        form.append("Stock", e.target.Stock.value);
        form.append("Description", e.target.Description.value);
        form.append("Details", e.target.Details.value);
        form.append("SeoDescription", e.target.SeoDescription.value);
        form.append("SeoTitle", e.target.SeoTitle.value);
        form.append("SeoAlias", e.target.SeoAlias.value);
        form.append("LanguageId", this.state.languageId);
        form.append("ThumbnailImage", this.state.file)

        e.preventDefault();
        fetch('http://localhost:5002/product/create', {
            method: 'POST',
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
                            <div className="container-fluid">
                                <h1 className="mt-4">Create new product</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item"><a href="/">Master page</a></li>
                                    <li className="breadcrumb-item active">Create new product</li>
                                </ol>
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <NavLink className="btn btn-success" to="/list_product">Back to list</NavLink>
                                    </div>

                                    <div className="card-body">
                                        <div className="col-md-4">
                                            <Form onSubmit={this.handleSubmit}>
                                                <Form.Group controlId="Name">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control type="text" name="Name"
                                                        //disabled
                                                        placeholder="Name" />
                                                </Form.Group>

                                                <Form.Group controlId="Price">
                                                    <Form.Label>Price</Form.Label>
                                                    <Form.Control type="number" name="Price"
                                                        placeholder="Price" />
                                                </Form.Group>

                                                <Form.Group controlId="OriginalPrice">
                                                    <Form.Label>Original Price</Form.Label>
                                                    <Form.Control type="number" name="OriginalPrice"
                                                        placeholder="Original Price" />
                                                </Form.Group>

                                                <Form.Group controlId="Stock">
                                                    <Form.Label>Stock</Form.Label>
                                                    <Form.Control type="number" name="Stock"
                                                        placeholder="Stock" />
                                                </Form.Group>

                                                <Form.Group controlId="Description">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control type="text" name="Description"
                                                        placeholder="Description" cols="5" />
                                                </Form.Group>
                                                <Form.Group controlId="Details">
                                                    <Form.Label>Details</Form.Label>
                                                    <Form.Control type="text" name="Details"
                                                        placeholder="Details" />
                                                </Form.Group>
                                                <Form.Group controlId="SeoDescription">
                                                    <Form.Label>Seo Description</Form.Label>
                                                    <Form.Control type="text" name="SeoDescription"
                                                        placeholder="SeoDescription" />
                                                </Form.Group>
                                                <Form.Group controlId="SeoTitle">
                                                    <Form.Label>Seo Title</Form.Label>
                                                    <Form.Control type="text" name="SeoTitle"
                                                        placeholder="SeoTitle" />
                                                </Form.Group>
                                                <Form.Group controlId="SeoAlias">
                                                    <Form.Label>Seo Alias</Form.Label>
                                                    <Form.Control type="text" name="SeoAlias"
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
