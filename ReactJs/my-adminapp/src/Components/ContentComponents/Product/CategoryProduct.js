import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Form} from 'react-bootstrap';

export class CategoryProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productId: this.props.productId,
            productCategory: "",
            categories: [],
            product: "",
            languageId: this.props.languageId
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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
        fetch('http://localhost:5002/product/categoryassign', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                Id: this.state.productId,
            })
        })
            .then(response => response.json())
            .then(
                data => {
                    this.setState({ productCategory: data, categories: data.Categories })
                }
            )
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:5002/product/newcategoryassign',{
            method:'POST',
            credentials: 'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                Id:this.props.productId,
                Categories:this.state.categories
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

    handleChange(e,categoryId) {
        let isChecked = e.target.checked;
        const newCategories = this.state.categories;
        newCategories.map(category => {
            if (category.Id == categoryId){
                category.Selected = isChecked
            }
        });
        this.setState({categories : newCategories});

        const newProductCategory = this.state.productCategory;
        newProductCategory.Categories = this.state.categories;
        this.setState({productCategory : newProductCategory});
      }

    render() {
        const { productCategory, categories } = this.state;
        return (
            <div>
                <div id="layoutSidenav" >
                    <div id="layoutSidenav_content">
                        <main>
                            <div class="container-fluid">
                                <h1 class="mt-4">Assign category</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item"><a href="/">Master page</a></li>
                                    <li class="breadcrumb-item active">Assign category</li>
                                </ol>
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <NavLink class="btn btn-success" to="/list_product">Back to list</NavLink>
                                    </div>

                                    <div class="card-body">
                                        <div class="col-md-4">
                                            <Form onSubmit={this.handleSubmit}>
                                                <div asp-validation-summary="ModelOnly" class="text-danger"></div>
                                                {categories.map(item =>
                                                    <tr key={item.Id}>
                                                        <Form.Group controlId={item.Id}>
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <input type="checkbox" checked={item.Selected} onChange={e => this.handleChange(e,item.Id)} checkedDefault={item.Selected} />
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="mr-2">{item.Name}</div>
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
