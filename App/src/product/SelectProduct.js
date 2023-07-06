import React, {Component} from 'react'
import Card from '@material-ui/core/Card';
import {CardActions, CardContent} from '@material-ui/core/'; 
import Button from '@material-ui/core/Button'
import PublishIcon from "@material-ui/icons/Publish";
import auth from '../auth/auth-helper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
//import {create} from './api-product.js'
import {Link, Redirect} from 'react-router-dom'


const styles = theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.openTitle,
      fontSize: '1.2em'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2
    },
    input: {
      display: 'none'
    },
    filename:{
      marginLeft:'10px'
    }
  })


  class SelectProduct extends Component {
    constructor({match}) {
      super()
      this.state = {
        redirect: false,
        error: ''
      }
      this.match = match
    }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/seller/shop/edit/'+this.match.params.shopId}/>)
    }
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Seleccione Tipo de Producto
          </Typography><br/>
          <label htmlFor="icon-button-file">
            <Link to={"/seller/"+this.match.params.shopId+"/products/URL/new"}>
              <Button variant="raised" color="secondary" component="span">
                Sin subscripcion
              </Button>
            </Link>
          </label>
          <br/>
          <br/>
          <label htmlFor="icon-button-file">
          <Link to={"/seller/"+this.match.params.shopId+"/products/API/new"}>
              <Button variant="raised" color="secondary" component="span">
              Subscripcion
              </Button>
            </Link>
          </label>
        </CardContent>
        <CardActions>
          <Link to={'/seller/shop/edit/'+this.match.params.shopId} className={classes.submit}><Button variant="raised">Cancelar</Button></Link>
        </CardActions>
      </Card>
    </div>)
  }
}

export default withStyles(styles)(SelectProduct)