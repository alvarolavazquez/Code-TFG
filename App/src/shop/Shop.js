import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import  {CardContent} from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {read} from './api-shop.js'
import Products from '../product/Products'
import {listByShopURL} from '../product/api-productURL.js'
import {listByShopAPI} from '../product/api-productAPI.js'
import auth from "../auth/auth-helper";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing.unit,
    color: theme.palette.openTitle
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  productTitle: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    width: '100%',
    fontSize: '1.2em'
  }
})

class Shop extends Component {
  constructor({match}) {
    super()
    this.state = {
      shop: '',
      products:[],
      aux1: [],
      aux2: []
    }
    this.match = match
  }

  loadProducts = () => {
    listByShopURL({
      shopId: this.match.params.shopId
    }).then((data)=>{
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({aux1: data})
      }
    })
    
    listByShopAPI({
      shopId: this.match.params.shopId
    }).then((data)=>{
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({aux2: data})
      }
    })
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated();
    this.loadProducts()
    read({
      shopId: this.match.params.shopId
    },
    { t: jwt.token }).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({shop: data})
      }
    })
  }

  render() {
    const {classes} = this.props
    this.state.products =this.state.aux1.concat(this.state.aux2)
    
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={4} sm={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography type="headline" component="h2" className={classes.title}>
                  {this.state.shop.name}
                </Typography>
                <br/>
                <Avatar src={"http://localhost:3000/api/shops/logo/"+this.state.shop._id} className={classes.bigAvatar}/><br/>
                  <Typography type="subheading" component="h2" className={classes.subheading}>
                    {this.state.shop.description}
                  </Typography><br/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8} sm={8}>
            <Card>
              <Typography type="title" component="h2" className={classes.productTitle}>Productos</Typography>
              <Products products={this.state.products} searched={false}/>
            </Card>
          </Grid>
        </Grid>
      </div>)
  }
}

Shop.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Shop)
