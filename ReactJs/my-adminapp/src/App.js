import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './css/styles.css';
import './js/scripts';
import 'bootstrap';
import { Navigation } from './Components/Navigation';
import { LayoutSlidenav } from './Components/LayoutSlidenav';
import { Login } from './Components/Login';
import { SlidenavContent } from './Components/SlidenavContent';

import { ListUser } from './Components/ContentComponents/ListUser';
import { CreateUser } from './Components/ContentComponents/CreateUser';
import { EditUser } from './Components/ContentComponents/EditUser';
import { DetailUser } from './Components/ContentComponents/DetailUser';
import { RoleUser } from './Components/ContentComponents/RoleUser';

import { ListProduct } from './Components/ContentComponents/Product/ListProduct';
import { CreateProduct } from './Components/ContentComponents/Product/CreateProduct';
import { EditProduct } from './Components/ContentComponents/Product/EditProduct';
import { CategoryProduct } from './Components/ContentComponents/Product/CategoryProduct';


import { Footer } from './Components/Footer';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //User
      editUserId: "",
      detailUserId: "",
      roleUserId: "",
      //Product
      editProductId: "",
      categoryProductId: "",

      languageId: "vi",
      strSearchApp: "",
      isAdmin: false,
    }
  }

  componentDidMount() {
    console.log(this.state.isAdmin);
  }


  //Login
  handleAdminLoginFunction = (content) => {
    this.setState({
      isAdmin: content,
    })
  }

  handleAdminLogoutFunction = (content) => {
    this.setState({
      isAdmin: content,
    })
  }

  //Language
  handleLanguageFunction = (content) => {
    this.setState({
      languageId: content,
    })
  }

  //User
  handleEditUserIdFunction = (content) => {
    this.setState({
      editUserId: content,
    })
  }

  handleDetailUserIdFunction = (content) => {
    this.setState({
      detailUserId: content,
    })
  }

  handleRoleUserIdFunction = (content) => {
    this.setState({
      roleUserId: content,
    })
  }

  //Product
  handleEditProductIdFunction = (content) => {
    this.setState({
      editProductId: content,
    })
  }

  handleCategoryProductIdFunction = (content) => {
    this.setState({
      categoryProductId: content,
    })
  }


  render() {

    return (
      <BrowserRouter>
        <div className="sb-nav-fixed">
          {this.state.isAdmin == false &&
            <div>
              <Login handleAdminLogin={this.handleAdminLoginFunction} />
            </div>}

          {this.state.isAdmin &&
            <div>
              <Navigation handleAdminLogout={this.handleAdminLogoutFunction} handleLanguage={this.handleLanguageFunction} />
              <LayoutSlidenav />
              <Switch>
                <Route path="/" component={SlidenavContent} exact />
                <Route
                  path="/list_user"
                  render={props => <ListUser {...props} 
                  handleEditUserId={this.handleEditUserIdFunction} 
                  handleDetailUserId={this.handleDetailUserIdFunction} 
                  handleRoleUserId={this.handleRoleUserIdFunction} />}
                />
                <Route
                  path="/create_user"
                  render={props => <CreateUser {...props} />}
                />
                <Route
                  path="/edit_user"
                  render={props => <EditUser {...props} userId={this.state.editUserId} />}
                />
                <Route
                  path="/detail_user"
                  render={props => <DetailUser {...props} userId={this.state.detailUserId} />}
                />
                <Route
                  path="/role_user"
                  render={props => <RoleUser {...props} userId={this.state.roleUserId} />}
                />
                <Route
                  path="/list_product"
                  render={props => <ListProduct {...props} 
                  handleEditProductId={this.handleEditProductIdFunction} 
                  handleDetailProductId={this.handleDetailProductIdFunction} 
                  handleCategoryProductId={this.handleCategoryProductIdFunction}
                  languageId= {this.state.languageId}/>}
                />
                <Route
                  path="/create_product"
                  render={props => <CreateProduct {...props} languageId= {this.state.languageId}/>}
                />
                <Route
                  path="/edit_product"
                  render={props => <EditProduct {...props} productId={this.state.editProductId} languageId= {this.state.languageId}/>}
                />
                <Route
                  path="/category_product"
                  render={props => <CategoryProduct {...props} productId={this.state.categoryProductId} languageId= {this.state.languageId}/>}
                />
              </Switch>
              <Footer />
            </div>}
        </div>
      </BrowserRouter>
    );
  }
}

