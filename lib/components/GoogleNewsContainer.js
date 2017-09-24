import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const corsService = 'http://cors-anywhere.herokuapp.com';
export const googleNewsBaseUri = 'https://news.google.com/news/section?cf=all&'
export const defaultLang = 'pt-BR';
export const defaultLocation = 'pt-BR_br';
export const defaultSize = 10;
export const imagePlaceholder = 'http://via.placeholder.com/80x80';
export const api = (
  q,
  lang = defaultLang,
  location = defaultLocation,
  size = defaultSize
) =>
  `${corsService}/${googleNewsBaseUri}hl=${lang}&ned=${location}&q=${q}&num=${size}&output=rss`;


export const Card = ({
  author,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
}) => (
  <div className="card">
    <div className="card-content">
      <img src={urlToImage} alt={title} className="card-image" />
      <span className="card-title">{title}</span>
      <p>{description}</p>
      <div className="author">Published by: {author}</div>
      <div className="publishedAt">Published at: {publishedAt}</div>
    </div>
    <div className="card-action">
      <a href={url} target="_blank">Access the news link</a>
    </div>
  </div>
)

class GoogleNewsSearchContainer extends Component {
  state = {
    queryString: '',
    news: [],
  };

  componentWillReceiveProps(nextProps) {
    const { queryString } = nextProps
    if (queryString && (queryString !== this.state.queryString)) {
      this.setState({ queryString: nextProps.queryString });
      this.fetchData(queryString);
    }
  }

  fetchData = (queryString) => {
    fetch(api(
      queryString,
      this.props.lang,
      this.props.location,
      this.props.size,
    ))
      .then(response => response.text())
      .then(body => parseData(body))
      .then(feeds => {
        this.setState({ news: feeds });
      })
      .catch(err => console.log('Error on fetching data', err))
  }

  render = () => (
    <div className="google-news-container row">
      <div className="col s12 cards-container">
        {this.state.news.map((news, i) =>
          <Card
            key={'google-news-card-'+i}
            {...news}
          />
        )}
      </div>
    </div>
  );
}

GoogleNewsSearchContainer.defaultProps = {
  lang: defaultLang,
  location: defaultLocation,
  size: defaultSize,
};

GoogleNewsSearchContainer.propTypes = {
  lang: PropTypes.string,
  location: PropTypes.string,
  size: PropTypes.number,
  queryString: PropTypes.string,
};

// Helpers and parsers
function parseData(data) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data,"text/xml");

  const items = xmlDoc.getElementsByTagName('item');

  const feeds = [];
  for(let i=0; i<items.length; i++) {
    const item = items[i];
    const { title, author } = parseTitle(getNode(item, 'title'))
    const { image, content } = parseDescription(getNode(item, 'description'))
    feeds.push({
      title,
      author,
      url: getNode(item, 'link'),
      publishedAt: getNode(item, 'pubDate'),
      description: content,
      urlToImage: image,
    });
  }
  return feeds;
}

// Retrieve the data of a specific tag
function getNode(node, tagToRetrieve) {
  var htmlData = node.getElementsByTagName(tagToRetrieve)[0].innerHTML;
  return htmlDecode(htmlData); // decode HTML entities, see lodash/underscore
}

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

function parseTitle(content) {
  const s = content.split('-');
  const author = s.pop()
  const title = s.join('-')
  return { title, author }
}

function parseDescription(htmlContent) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent,"text/html");

  const images = doc.getElementsByTagName('img')
  const hasImage = images[0].src
  const image = hasImage || imagePlaceholder

  const fonts = doc.getElementsByTagName('font')
  let content = ''
  try {
    const indexContent = hasImage? 5 : 4;
    content = htmlDecode(fonts[indexContent].innerHTML)
  } catch (e) {
    for(let i=0; i<fonts.length; i++) {
      content += htmlDecode(fonts[i].innerHTML) + ' - '
    }
  }
  return { image, content }
}

export default GoogleNewsSearchContainer;
