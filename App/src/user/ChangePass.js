import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock';
import Dialog from '@material-ui/core/Dialog'
import { update } from "./api-user.js";
import auth from '../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import TextField from "@material-ui/core/TextField";
import {DialogTitle} from '@material-ui/core'
import swal from 'sweetalert'

class ChangePass extends Component {
  state = {
    password: "",
    redirect: false,
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }
  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    if(!auth.isPassword(this.state.password))
          swal ({
          title: "Error",
          text:"Contraseña incorrecta, recuerde que debe ser mayor o igual a 6 y no dejar en blanco",
          icon: "error",
          button: "Ok",
        });
      else {
        const user = {
          password: this.state.password || undefined
        };
        update(
          {
            userId: this.props.userId
          },
          {
            t: jwt.token
          },
          user
        ).then(data => {
          if (data.error) {
            this.setState({ error: data.error });
          } else {
            auth.updateUser(data, ()=> {
            this.setState({ userId: data._id, redirect: true });
            })
          }
        });
      }
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleRequestClose = () => {
    this.setState({open: false})
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
      <LockIcon/>Cambiar contraseña
      </IconButton>
      
      <Dialog
          title="Dialog With Custom Width"
          modal={true}
          open={this.state.open}
        >
        <DialogTitle>{"Cambiar contraseña"}</DialogTitle>
         <div className="deal_form">
          <form id="myform" onSubmit = {this.handleCreate} >
          <TextField
                id="password"
                type="password"
                label="Contraseña"
                value={this.state.password}
                onChange={this.handleChange("password")}
                margin="normal"
            />
          </form>
        </div>
        <Button color="primary" variant="raised" onClick={this.clickSubmit}>Enviar</Button>
        <Button color="warning" onClick={this.handleRequestClose}>Cancelar</Button>
      </Dialog>
      </span>
    );
  }
}
ChangePass.propTypes = {
  userId: PropTypes.string.isRequired
}
export default ChangePass