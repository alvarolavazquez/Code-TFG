import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import {DialogActions, DialogContent, DialogContentText, DialogTitle}  from '@material-ui/core/';
import auth from '../auth/auth-helper'
import {remove} from './api-productAPI.js'


class DeleteProductAPI extends Component {
    state = {
      open: false
    }
    clickButton = () => {
      this.setState({open: true})
    }
    deleteProduct = () => {
      const jwt = auth.isAuthenticated()
      remove({
        shopId: this.props.shopId,
        productId: this.props.product._id
      }, {t: jwt.token}).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setState({open: false}, () => {
            this.props.onRemove(this.props.shop)
          })
        }
      })
    }
    handleRequestClose = () => {
      this.setState({open: false})
    }
 
    render() {
      return (<span>
        <IconButton aria-label="Delete" onClick={this.clickButton} color="secondary">
          <DeleteIcon/>
        </IconButton>
  
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>{"Delete "+this.props.product.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirmar borrado de Producto {this.props.product.name}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.deleteProduct} color="secondary" autoFocus="autoFocus">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </span>)
    }
  }
  DeleteProductAPI.propTypes = {
    shop: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
  }
  export default DeleteProductAPI
  