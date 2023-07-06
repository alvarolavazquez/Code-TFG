import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import {CardContent, CardMedia} from '@material-ui/core/'; 
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import {withStyles} from '@material-ui/core/styles'
import {read} from './api-order.js'
import {Link} from 'react-router-dom'
import auth from '../auth/auth-helper'
import DetailProduct from '../product/DetailProduct'

const styles = theme => ({
  card: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1,
    margin: 30,
  },
  cart: {
    textAlign: 'left',
    width: '100%',
    display: 'inline-flex'
  },
  details: {
    display: 'inline-block',
    width: "100%",
    padding: "4px"
  },
  content: {
    flex: '1 0 auto',
    padding: '16px 8px 0px'
  },
  cover: {
    width: 160,
    height: 125,
    margin: '8px'
  },
  info: {
    color: 'rgba(83, 170, 146, 0.82)',
    fontSize: '0.95rem',
    display: 'inline'
  },
  thanks:{
    color: 'rgb(136, 183, 107)',
    fontSize: '0.9rem',
    fontStyle: 'italic'
  },
  innerCardItems: {
    textAlign: 'left',
    margin: '24px 10px 24px 24px',
    padding: '24px 20px 40px 20px',
    backgroundColor: '#80808017'
  },
  innerCard: {
    textAlign: 'left',
    margin: '24px 24px 24px 10px',
    padding: '30px 45px 40px 45px',
    backgroundColor: '#80808017'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing.unit,
    color: theme.palette.openTitle
  },
  productTitle: {
    fontSize: '1.15em',
    marginBottom: '5px'
  },
  itemTotal: {
    float: 'right',
    marginRight: '40px',
    fontSize: '1.5em',
    color: 'rgb(72, 175, 148)'
  },
  itemShop: {
    display: 'block',
    fontSize: '1em',
    color: '#78948f'
  },
  checkout: {
    float: 'right',
    margin: '24px'
  },
  total: {
    fontSize: '1.2em',
    color: 'rgb(53, 97, 85)',
    marginRight: '16px',
    fontWeight: '600',
    verticalAlign: 'bottom'
  }
})

class Order extends Component {
  constructor({match}) {
    super()
    this.state = {
      order: {products:[], delivery_address:{}},
    }
    this.match = match
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    read({
      orderId: this.match.params.orderId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({order: data})
      }
    })
  }

  getTotal(){
    return this.state.order.products.reduce((a, b) => {
       const quantity = b.status == "Cancelled" ? 0 : b.quantity
        return a + (quantity*b.product.price)
    }, 0)
  }

  render() {
    const {classes} = this.props
    let urlImage=''
    return (
      <Card className={classes.card}>
        <Typography type="headline" component="h2" className={classes.title}>
            Detalles de la Compra
        </Typography>
        <Typography type="subheading" component="h2" className={classes.subheading}>
            Codigo de la compra: <strong>{this.state.order._id}</strong> <br/> Realizado en: {(new Date(this.state.order.created)).toDateString()}
        </Typography><br/>
        <Grid container spacing={8}>
            <Grid item xs={7} sm={7}>
                <Card className={classes.innerCardItems}>
                  {this.state.order.products.map((product, i) => {
                    {if(product.product.type==='URL')urlImage='http://localhost:3000/api/products/URL/photo/';
                    else urlImage='http://localhost:3000/api/products/API/photo/';}
                    return  <span key={i}>
                      <Card className={classes.cart} >
                        <CardMedia
                          className={classes.cover}
                          image={urlImage+product.product._id}
                          title={product.product.name}
                        />
                        <div className={classes.details}>
                          <CardContent className={classes.content}>
                            <Link to={'/product/'+product.product._id}><Typography type="title" component="h3" className={classes.productTitle} color="primary">{product.product.name}</Typography></Link>
                            <Typography type="subheading" component="h3" className={classes.itemShop} color="primary">€ {product.product.price} x {product.quantity}</Typography>
                            <span className={classes.itemTotal}>{product.product.price * product.quantity} €</span>
                            {/*<Typography type="subheading" component="h3" color={product.status == "Cancelled" ? "error":"secondary"}>Status: {product.status}</Typography>*/}
                            <DetailProduct Product={product.product} Order={this.match.params.orderId}/>
                          </CardContent>
                        </div>
                      </Card>
                      <Divider/>
                    </span>})
                  }
                  <div className={classes.checkout}>
                    <span className={classes.total}>Total: {this.getTotal()} €</span>
                  </div>
                </Card>
            </Grid>
            <Grid item xs={5} sm={5}>
              <Card className={classes.innerCard}>
                <Typography type="subheading" component="h2" className={classes.productTitle} color="primary">
                 Envio para:
                </Typography>
                <Typography type="subheading" component="h3" className={classes.info} color="primary"><strong>{this.state.order.customer_name}</strong></Typography><br/>
                <Typography type="subheading" component="h3" className={classes.info} color="primary">{this.state.order.customer_email}</Typography><br/>
                <br/>
                <Typography type="subheading" component="h3" className={classes.thanks} color="primary">¡Gracias por confiar en nuestra tienda! <br/></Typography>
              </Card>
            </Grid>
        </Grid>
      </Card>
    )
  }
}

Order.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Order)
