import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import {CardMedia}  from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import Icon from '@material-ui/core/Icon'
import List  from '@material-ui/core/List'
import {ListItem, ListItemSecondaryAction} from '@material-ui/core/'; 
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import auth from '../auth/auth-helper'
import {listByShopURL} from '../product/api-productURL.js'
import {listByShopAPI} from '../product/api-productAPI.js'
import DeleteProductURL from '../product/DeleteProductURL'
import DeleteProductAPI from '../product/DeleteProductAPI'

const styles = theme => ({
  products: {
    padding: '24px'
  },
  addButton:{
    float:'right'
  },
  leftIcon: {
    marginRight: "8px"
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  cover: {
    width: 110,
    height: 100,
    margin: '8px'
  },
  details: {
    padding: '10px'
  },
})
class MyProducts extends Component {
  state = {
    products: [],
    aux1: [],
    aux2: []
  }

  loadProducts = () => {
    listByShopURL({
      shopId: this.props.shopId
    }).then((data)=>{
      if (data?.error!== undefined) {
        this.setState({error: data.error})
      } else {
        this.setState({aux1: data})
      }
    })
    
    listByShopAPI({
      shopId: this.props.shopId
    }).then((data)=>{
      if (data?.error!== undefined) {
        this.setState({error: data.error})
      } else {
        this.setState({aux2: data})
      }
    })
    
  }

  componentDidMount = () => {
   this.loadProducts()
  }

  removeProduct = (product) => {
    const updatedProducts = this.state.products
    const index = updatedProducts.indexOf(product)
    updatedProducts.splice(index, 1)
    this.setState({shops: updatedProducts})
  }

  render() {
    const {classes} = this.props
    if(this.state?.aux1!== undefined && this.state?.aux2!== undefined)this.state.products =this.state.aux1.concat(this.state.aux2);

    return (
      <Card className={classes.products}>
        <Typography type="title" className={classes.title}>
          Producto
          <span className={classes.addButton}>
            <Link to={"/seller/"+this.props.shopId+"/products/select"}>
              <Button color="primary" variant="raised">
                <Icon className={classes.leftIcon}>add_box</Icon>  Nuevo Producto
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
        {this.state.products.map((product, i) => {
            return <span key={i}>
              <ListItem>
              {
                (product?.type!== undefined)?product.type==='URL' && (<span>
                  <CardMedia
                    className={classes.cover}
                    image={'http://localhost:3000/api/products/URL/photo/'+product._id+"?" + new Date().getTime()}
                    title={product.name}
                  /></span>):null
              }
              {
                (product?.type!== undefined)?product.type==='API' && (<span>
                  <CardMedia
                    className={classes.cover}
                    image={'http://localhost:3000/api/products/API/photo/'+product._id+"?" + new Date().getTime()}
                    title={product.name}
                /></span>):null
              }
              
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.productTitle}>
                    {(product?.name!== undefined)?product.name:null}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    Cantidad: {(product?.quantity!== undefined)?product.quantity:null} | Precio: €{(product?.quantity!== undefined)?product.price:null}
                  </Typography>
                </div>
                <ListItemSecondaryAction>
                  <Link to={"/seller/"+product.shop+"/"+product.type+"/"+product._id+"/edit"}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit/>
                    </IconButton>
                  </Link>
                  {
                    (product?.type!== undefined)?product.type==='URL' && (<span>
                      <DeleteProductURL product={product} shopId={this.props.shopId} onRemove={this.removeProduct}/></span>):null
                  }
                  {
                    (product?.type!== undefined)?product.type==='API' && (<span>
                      <DeleteProductAPI product={product} shopId={this.props.shopId} onRemove={this.removeProduct}/></span>):null
                  }
                  
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/></span>})
        }
        </List>
      </Card>)
  }
}
MyProducts.propTypes = {
  classes: PropTypes.object.isRequired,
  shopId: PropTypes.string.isRequired
}

export default withStyles(styles)(MyProducts)
