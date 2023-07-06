import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Suggestions from './product/Suggestions'
import {listLatestURL, listCategoriesURL} from './product/api-productURL.js'
import {listLatestAPI, listCategoriesAPI} from './product/api-productAPI.js'
import Search from './product/Search'
import Categories from './product/Categories'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  }
})

class Home extends Component {
  state={
    suggestionTitle: "Ultimos Productos",
    suggestions: [],
    categories: []
  }
  componentDidMount = () => {
    listLatestAPI().then((data) => {
      
        this.setState({suggestions: data})
      
    })
    listLatestURL().then((data) => {
      
      if(Array.isArray(this.state.suggestions))this.state.suggestions.push(data)
    
  })
    listCategoriesAPI().then((data) => {
      
        this.setState({categories: data})
      
    })
    listCategoriesURL().then((data) => {
      
      if(Array.isArray(this.state.categories))this.state.categories.push(data)
    
  })
    console.log(this.state.categories)
  }
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={8} sm={8}>
            <Search categories={this.state.categories}/>
            <Categories categories={this.state.categories}/>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Suggestions products={this.state.suggestions} title={this.state.suggestionTitle}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
