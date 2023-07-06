import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import {listURL} from './api-productURL.js'
import {listAPI} from './api-productAPI.js'
import Products from './Products'

const styles = theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: '#5DADE2'
  },
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 130,
    verticalAlign: 'bottom',
    marginBottom: '20px'
  },
  searchField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    marginBottom: '20px'
  },
  searchButton: {
    minWidth: '20px',
    height: '50px',
    padding: '0 8px 10px'
  }
})

class Search extends Component {
  state = {
      category: '',
      search: '',
      results: [],
      searched: false
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }
  search = () => {
    if(this.state.search){
      listURL({
        search: this.state.search || undefined, category: this.state.category
      }).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setState({results: data, searched:true})
        }
      })
      listAPI({
        search: this.state.search || undefined, category: this.state.category
      }).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setState({results: data, searched:true})
        }
      })
    }
  }
  enterKey = (event) => {
    if(event.keyCode === 13){
      event.preventDefault()
      this.search()
    }
  }
  render() {
    const {classes} = this.props
    return (
      <div>
        <Card className={classes.card}>
          <TextField
            id="select-category"
            select
            label="Categoria"
            className={classes.textField}
            value={this.state.category}
            onChange={this.handleChange('category')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
            <MenuItem value="All">
              Todo
            </MenuItem>
            { Array.isArray(this.props.categories)?this.props.categories.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )): null}
          </TextField>
          <TextField
            id="search"
            label="Buscar productos"
            type="search"
            onKeyDown={this.enterKey}
            onChange={this.handleChange('search')}
            className={classes.searchField}
          />
          <Button variant="raised" color={'primary'} className={classes.searchButton} onClick={this.search}>
            <SearchIcon/>
          </Button>
          <Divider/>
          <Products products={this.state.results} searched={this.state.searched}/>
        </Card>
      </div>
    )
  }
}
Search.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired
}

export default withStyles(styles)(Search)
