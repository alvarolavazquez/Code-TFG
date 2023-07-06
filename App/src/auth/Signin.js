import React, {Component,useState} from 'react'
import Card from '@material-ui/core/Card'
import  {CardActions, CardContent} from '@material-ui/core';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import {withStyles} from '@material-ui/core/styles'
import auth from './auth-helper';
import {Redirect} from 'react-router-dom'
import {signin} from '../user/api-auth'
import swal from 'sweetalert'
import { NotExtended } from 'http-errors';

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
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
})

class Signin extends Component {
  state = {
      email: '',
      password: '',
      error: '',
      redirectToReferrer: false
  }
  clickSubmit = () => {
    if(!auth.isEmail(this.state.email)) 
        swal ({
          title: "Error",
          text:'Email incorrecto, recuerde que no dejarse en blanco y contener  carateres: ".", "@".',
          icon: "error",
          button: "Ok",
        });
    
    else {
      if(!auth.isPassword(this.state.password))
          swal ({
          title: "Error",
          text:"Contraseña incorrecta, recuerde que debe ser mayor o igual a 6 y no dejar en blanco",
          icon: "error",
          button: "Ok",
        });
      else {
        const user = {
          email: this.state.email || undefined,
          password: this.state.password || undefined
        }
        signin(user).then((data) => {
          if(data.token!=null){
            auth.authenticate(data, () => {
              this.setState({redirectToReferrer: true})
            })
          }
          else
          {
            this.state.error=data;
            swal ({
              title: "Error",
              text:this.state.error.message,
              icon: "error",
              button: "Ok",
            })
          }
        })
      } 
    }
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    }
    const {redirectToReferrer} = this.state
    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Identificarse
          </Typography>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Contraseña" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <br/> 
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Identificarse</Button>
        </CardActions>
      </Card>
    )
  }
}

 

export default withStyles(styles)(Signin)
