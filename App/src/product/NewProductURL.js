import React, {Component} from 'react'
import Card from '@material-ui/core/Card';
import {CardActions, CardContent} from '@material-ui/core/'; 
import Button from '@material-ui/core/Button'
import PublishIcon from "@material-ui/icons/Publish";
import auth from '../auth/auth-helper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {create} from './api-productURL.js'
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

class NewProductURL extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      description: '',
      images: [],
      category: '',
      quantity: '',
      type: '',
      price: '',
      redirect: false,
      error: ''
    }
    this.match = match
    this.state = { values: [] };
  }
  componentDidMount = () => {
    this.productData = new FormData()
    this.setState({type:'URL'})
    this.productData.set("type", 'API')
  }
  handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    this.productData.set(name, value)
    this.setState({ [name]: value })
  }

  clickSubmit = () => {
    this.productData.set("steps", this.state.values)
    this.productData.set("type", this.state.type)
    const jwt = auth.isAuthenticated()
    create({
      shopId: this.match.params.shopId
    }, {
      t: jwt.token
    }, this.productData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', redirect: true})
      }
    })
  }

  createUI(){
    return this.state.values.map((el, i) => 
        <div key={i}>
        <TextField id="steps" label="Instruciones"  value={el||''} onChange={this.handleChangeV.bind(this, i)} margin="normal"/><br/>
        <input type='button' value='Borrar' onClick={this.removeClick.bind(this, i)}/>
        </div>          
    )
 }

 handleChangeV(i, event) {
    let values = [...this.state.values];
    values[i] = event.target.value;
    this.setState({ values });
 }
 
 addClick(){
   this.setState(prevState => ({ values: [...prevState.values, '']}))
 }
 
 removeClick(i){
    let values = [...this.state.values];
    values.splice(i,1);
    this.setState({ values });
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
            Nuevo Producto
          </Typography><br/>
          <input accept="image/*" onChange={this.handleChange('image')} className={classes.input} id="icon-button-file" type="file"/>
          <label htmlFor="icon-button-file">
            <Button variant="raised" color="secondary" component="span">
              Subir Foto
              <PublishIcon/>
            </Button>
          </label> <span className={classes.filename}>{this.state.image ? this.state.image.name : ''}</span><br/>
          <TextField id="name" label="Nombre" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="Descripcion"
            multiline
            rows="2"
            value={this.state.description}
            onChange={this.handleChange('description')}
            className={classes.textField}
            margin="normal"
          /><br/>
          <TextField id="quantity" label="Cantidad" className={classes.textField} value={this.state.quantity} onChange={this.handleChange('quantity')} margin="normal"/><br/>
          <TextField id="category" label="Categoria" className={classes.textField} value={this.state.category} onChange={this.handleChange('category')} margin="normal"/><br/>
          <TextField id="price" label="Precio" className={classes.textField} value={this.state.price} onChange={this.handleChange('price')} type="number" margin="normal"/><br/><br/><br/>
          <span>{this.createUI()}
          <input type='button' value='Añadir Instruccion' onClick={this.addClick.bind(this)}/></span>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Enviar</Button>
          <Link to={'/seller/shop/edit/'+this.match.params.shopId} className={classes.submit}><Button variant="raised">Cancelar</Button></Link>
        </CardActions>
      </Card>
    </div>)
  }
}

NewProductURL.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewProductURL)
