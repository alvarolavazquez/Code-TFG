import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from '../auth/auth-helper'
import {withRouter} from 'react-router-dom'
import CartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import cart from '../cart/cart-helper'
//import classes from '*.module.css'
import logo from '../assets/images/e-commerce-logo.png';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const isActive = (history, path) => {

  if (history.location.pathname === path)
    return 'active'
}
const isPartActive = (history, path) => {

  if (history.location.pathname===path)
    return  'btn btn-primary'
}

const Menu = withRouter(({history}) => (
  <AppBar position="static">
    <Navbar className="navbarMenu" expand="lg">
        <Navbar.Brand href="#home">
            <img src={logo} alt ="e-commerce" height="25px"/>
            MERN Marketplace
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">
                    <Button aria-label="Home" class={isPartActive(history, "/")}>Home <HomeIcon /></Button>
                </Nav.Link>
                <Nav.Link href="/shops/all"><Button class={isPartActive(history, "/shops/all")}>Tiendas </Button></Nav.Link>
                <Nav.Link href="/cart">
                    <Button class={isPartActive(history, "/cart")}>
                        Carrrito
                        <Badge color="secondary" badgeContent={cart.itemTotal()} style={{'marginLeft': '7px'}}>
                        <CartIcon />
                        </Badge>
                    </Button>
                </Nav.Link>
                <div style={{'position':'absolute', 'right': '50px'}}>
                    <span style={{'float': 'right'}}>
                        <NavDropdown className="navbarMenu" title="Cuenta" id="basic-nav-dropdown">
                            {
                                !auth.isAuthenticated() && (<span>
                                    <NavDropdown.Item href="/signup" className={isActive(history, "/signup")}>
                                        Registrarse
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/signin" className={isActive(history, "/signin")}>
                                        Identificarse
                                    </NavDropdown.Item>
                                </span>)
                            }
                            {
                                auth.isAuthenticated() && (<span>

                                
                                <NavDropdown.Item href="/seller/shops" className={isActive(history, "/seller/shops")}>
                                    Mis Tiendas
                                </NavDropdown.Item>
                                
                                <NavDropdown.Item href={"/user/" + auth.isAuthenticated().user._id} className={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                                    Mi Perfil
                                </NavDropdown.Item>

                                <NavDropdown.Item href={"/MyOrders/" + auth.isAuthenticated().user._id}  className={isActive(history, "/MyOrders/" + auth.isAuthenticated().user._id)}>
                                    Mis Pedidos
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => {auth.signout(() => history.push('/'))}}>
                                    Desconectarse
                                </NavDropdown.Item>
                                </span>)
                            }
                        </NavDropdown>
                    </span>
                </div>
            </Nav>
        </Navbar.Collapse>
    </Navbar> 
  </AppBar>

))

export default Menu