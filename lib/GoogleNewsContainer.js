import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { api, parseData } from './api'
import Card from './Card'

class GoogleNewsSearchContainer extends Component {
  state = {
    queryString: '',
    news: [],
  }

  componentWillReceiveProps(nextProps) {
    const { queryString } = nextProps
    if (queryString && queryString !== this.state.queryString) {
      this.setState({ queryString: nextProps.queryString })
      this.fetchData(queryString)
    }
  }

  fetchData = queryString => {
    fetch(api(queryString, this.props.lang, this.props.location, this.props.size))
      .then(response => response.text())
      .then(body => parseData(body))
      .then(feeds => {
        this.setState({ news: feeds })
      })
      .catch(err => console.log('Error on fetching data', err))
  }

  render = () => (
    <div className="google-news-container row">
      <div className="col s12 cards-container">
        {this.state.news.map((news, i) => <Card key={'google-news-card-' + i} {...news} />)}
      </div>
    </div>
  )
}

GoogleNewsSearchContainer.defaultProps = {
  lang: defaultLang,
  location: defaultLocation,
  size: defaultSize,
}

GoogleNewsSearchContainer.propTypes = {
  lang: PropTypes.string,
  location: PropTypes.string,
  size: PropTypes.number,
  queryString: PropTypes.string,
}

export default GoogleNewsSearchContainer
