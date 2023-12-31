import React, {Component} from 'react'
import Card from '@material-ui/core/Card';
import {CardActions, CardContent} from '@material-ui/core';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {create} from './api-user.js'
import Dialog from '@material-ui/core/Dialog'
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from  "@material-ui/core"
import {Link} from 'react-router-dom'
import auth from '../auth/auth-helper';

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

 class Signup extends Component {

    state = { name: "", password: "", email: "", open: false, error: "" };


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  clickSubmit = () => {
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    };
    create(user).then(data => {
      this.setState({ error: "", open: true });
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              type="headline"
              component="h2"
              className={classes.title}
            >
              Registrarse
            </Typography>
            <TextField
              id="name"
              label="Nombre"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange("name")}
              margin="normal"
            />{" "}
            <br />
            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
            />
            <br />
            <TextField
              id="password"
              type="password"
              label="Contraseña"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange("password")}
              margin="normal"
            />
            <br />
            {this.state.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {this.state.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              raised="raised"
              onClick={this.clickSubmit}
              className={classes.submit}
            >
              Registrarse
            </Button>
          </CardActions>
        </Card>
        <Dialog open={this.state.open} disableBackdropClick={true}>
          <DialogTitle>Nueva Cuenta</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nueva cuenta creada.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/signin">
              <Button color="primary" autoFocus="autoFocus" variant="raised">
                Identificarse
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)