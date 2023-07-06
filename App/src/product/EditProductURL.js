import React, {Component} from 'react'
import auth from '../auth/auth-helper'
import Card from '@material-ui/core/Card'
import  {CardActions, CardContent} from '@material-ui/core/';
import Button from '@material-ui/core/Button'
import PublishIcon from "@material-ui/icons/Publish";
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {photo, readURL, update} from './api-productURL.js'
import {Link, Redirect} from 'react-router-dom'

const styles = theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    maxWidth: 500,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
})

class EditProductURL extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      description: '',
      images: [],
      category: '',
      type: '',
      steps: [],
      price: '',
      redirect: false,
      error: ''
    }
    this.match = match
    const imgProfile=""
  }

  componentDidMount = () => {
    this.productData = new FormData()
    readURL({
      productId: this.match.params.productId
    }).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        const reader = new FileReader();
        this.setState({_id: data._id, name: data.name, type:data.type, steps: data.steps, description: data.description, image: data.image, category: data.category, quantity:data.quantity, price: data.price});
      }
    })
  }
  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    update({
      shopId: this.match.params.shopId,
      productId: this.match.params.productId
    }, {
      t: jwt.token
    }, this.productData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({'redirect': true})
      }
    })
  }

  handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    this.productData.set(name, value)
    this.setState({ [name]: value })
  }

  createUI(){
    return this.state.values.map((el, i) => 
        <div key={i}>
        <TextField id="steps" label="Instruciones"  value={el||''} onChange={this.handleChangeV.bind(this, i)} margin="normal"/><br/>
        <input type='button' value='Borrar' onClick={this.removeClick.bind(this, i)}/>
        </div>          
    )
 }

 steps(){
  return this.state.steps.map((step, i) => 
     <div key={i}>
        <TextField id="steps" label="Instruciones"  value={step} onChange={this.handleChangeV.bind(this, i)} margin="normal"/><br/>
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
            Editar producto
          </Typography><br/>
          <Avatar src={"http://localhost:3000/api/products/URL/photo/"+this.state._id} className={classes.bigAvatar}/><br/>
          <input accept="image/*" onChange={this.handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="raised" color="secondary" component="span">
              Cambiar imagen
              <PublishIcon/>
            </Button>
          </label> <span className={classes.filename}>{this.state.image ? this.state.image.name : ''}</span><br/>
          <TextField id="name" label="Nombre" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rows="3"
            value={this.state.description}
            onChange={this.handleChange('description')}
            className={classes.textField}
            margin="normal"
          /><br/>
          <TextField id="category" label="Categoria" className={classes.textField} value={this.state.category} onChange={this.handleChange('category')} margin="normal"/><br/>
          
          <TextField id="price" label="Precio" className={classes.textField} value={this.state.price} onChange={this.handleChange('price')} type="number" margin="normal"/><br/>

          {this.steps()}
 
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Actualizar</Button>
          <Link to={'/seller/shops/edit/'+this.match.params.shopId} className={classes.submit}><Button variant="raised">Cancelar</Button></Link>
        </CardActions>
      </Card>
    </div>)
  }
}

EditProductURL.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProductURL)
