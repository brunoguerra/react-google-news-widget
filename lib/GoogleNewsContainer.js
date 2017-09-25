import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'rebass'
import styled from 'styled-components'
import { api, parseData, defaultLang, defaultLocation, defaultSize } from './api'
import Card from './NewsCard'

const CardsWrapper = styled.div`width: ${props => props.width || '400px'};`

class GoogleNewsSearchContainer extends Component {
  state = {
    news: [],
  }

  componentWillReceiveProps(nextProps) {
    const { queryString } = nextProps
    if (queryString && queryString !== this.props.queryString) {
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
    <Provider>
      <CardsWrapper width={this.props.wrapperWidth}>
        {this.state.news.map((news, i) => <Card key={'google-news-card-' + i} {...news} />)}
      </CardsWrapper>
    </Provider>
  )
}

GoogleNewsSearchContainer.defaultProps = {
  lang: defaultLang,
  location: defaultLocation,
  size: defaultSize,
  wrapperWidth: '400px',
}

GoogleNewsSearchContainer.propTypes = {
  lang: PropTypes.string,
  location: PropTypes.string,
  size: PropTypes.number,
  queryString: PropTypes.string,
  wrapperWidth: PropTypes.string,
}

export default GoogleNewsSearchContainer
