import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { CardActions, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import auth from "../auth/auth-helper";
import { read, update } from "./api-user.js";
import { Redirect } from "react-router-dom";
import { FormControlLabel } from '@material-ui/core'
import Switch from '@material-ui/core/Switch'
import ChangePass from "./ChangePass";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: "middle"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing.unit * 2
  }
});

class EditProfile extends Component {
  constructor({ match }) {
    super();
    this.state = {
      name: "",
      email: "",
      seller: false,
      redirectToProfile: false,
      error: ""
    };
    this.match = match;
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: this.match.params.userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        console.log(data)
        this.setState({ name: data.name, email: data.email, seller: data.seller});
      }
    });
  };
  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      seller: this.state.seller || undefined
    };
    update(
      {
        userId: this.match.params.userId
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
        this.setState({ userId: data._id, redirectToProfile: true });
        })
      }
    });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleCheck = (event, checked) => {
    this.setState({'seller': checked})
  }
  render() {
    const { classes } = this.props;
    if (this.state.redirectToProfile) {
      return <Redirect to={"/user/" + this.state.userId} />;
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Editar Perfil
          </Typography>
          <TextField
            id="name"
            label="Nombre"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
          />
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
          <br />
          <ChangePass userId={this.match.params.userId}/>
          <Typography
            type="subheading"
            component="h4"
            className={classes.subheading}
          >
            <br />
            Cuenta vendedor
          </Typography>
          <FormControlLabel
            control={
              <Switch
                classes={{ checked: classes.checked, bar: classes.bar }}
                checked={this.state.seller}
                onChange={this.handleCheck}
              />
            }
            label={this.state.seller ? "Activo" : "Inactivo"}
          />
          <br />{" "}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="raised"
            onClick={this.clickSubmit}
            className={classes.submit}
          >
            Enviar
          </Button>
        </CardActions>
      </Card>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfile);
