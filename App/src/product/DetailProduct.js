import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import PublishIcon from "@material-ui/icons/Publish";
import EyeIcon from '@material-ui/icons/Visibility';
import Dialog from '@material-ui/core/Dialog'
import {Redirect} from 'react-router-dom'
import TextField from "@material-ui/core/TextField";
import {DialogTitle} from '@material-ui/core'
import {downloadAPIproduct} from '../order/api-order.js'
import swal from 'sweetalert'
import auth from '../auth/auth-helper'

class DetailProduct extends Component {
  state = {
    redirect: false,
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleRequestClose = () => {
    this.setState({open: false})
  }

  openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

downloadF = async () => {
  const jwt = auth.isAuthenticated()
   await downloadAPIproduct({File: this.props.Product.File, orderId: this.props.Order}, {t: jwt.token})
 
}
  render() {
    const redirect = this.state.redirect
    const { classes } = this.props;
    if (redirect) {
      return <Redirect to='/'/>
    }
    
    return (
      <span>
      <IconButton aria-label="Borrar" onClick={this.clickButton} color="secondary">
      <EyeIcon/>Detalles del Producto
      </IconButton>
      
      <Dialog
          title="Dialog With Custom Width"
          modal={true}
          open={this.state.open}
        >
        <DialogTitle>{"Descargar producto"}</DialogTitle>
         <div className="deal_form">
          <form id="myform" onSubmit = {this.handleCreate} >
            <TextField
                  id="steps"
                  type="steps"
                  label="Indicaciones"
                  value={this.props.Product.steps}
                  margin="normal"
              />
              <br/><br/>
              {(this.props.Product?.type!== undefined)?this.props.Product.type==='API' && (<span>
            <Button variant="raised" color="secondary" component="span" onClick={this.downloadF}>
                Descargar<PublishIcon/>
            </Button></span>):null}
          </form>
        </div>
        <Button color="warning" onClick={this.handleRequestClose}>Cerrar</Button>
      </Dialog>
      </span>
    );
  }
}
DetailProduct.propTypes = {
  userId: PropTypes.string.isRequired
}
export default DetailProduct