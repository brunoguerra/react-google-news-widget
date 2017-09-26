import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'rebass'
import styled from 'styled-components'
import { api, parseData, defaultLang, defaultLocation, defaultSize, corsService } from './api'
import Card from './NewsCard'

const CardsWrapper = styled.div`width: ${props => props.width || '400px'};`

class GoogleNewsSearchContainer extends Component {
  state = {
    news: [],
  }

  componentDidMount() {
    this.fetchData(this.props.queryString)
  }

  componentWillReceiveProps(nextProps) {
    const { queryString } = nextProps
    if (queryString && queryString !== this.props.queryString) {
      this.fetchData(queryString)
    }
  }

  fetchData = queryString => {
    const apiParams = {
      q: queryString,
      lang: this.props.lang,
      location: this.props.location,
      size: this.props.size,
      corsServiceUri: this.props.corsServiceUri,
    }

    const dataPromise = this.props.fetcher
      ? this.props.fetcher(apiParams)
      : fetch(api(apiParams)).then(res => res.text())

    dataPromise
      .then(data => parseData(data))
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
  corsServiceUri: corsService,
  fetchData: null,
}

GoogleNewsSearchContainer.propTypes = {
  lang: PropTypes.string,
  location: PropTypes.string,
  size: PropTypes.number,
  queryString: PropTypes.string,
  wrapperWidth: PropTypes.string,
  corsServiceUri: PropTypes.string,
  fetcher: PropTypes.func,
}

export default GoogleNewsSearchContainer
