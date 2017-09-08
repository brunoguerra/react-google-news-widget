import React, { Component } from 'react'

export const corsService = 'http://cors-anywhere.herokuapp.com';

export const api = q =>
  `${corsService}/https://news.google.com/news/section?cf=all&hl=pt-BR&ned=pt-BR_br&q=${q}&num=10&output=rss`;

export const Card = ({
  author,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
}) => (
  <div className="col s6 m4">
    <div className="card">
      <div className="card-image">
        <img src={urlToImage} alt={title} />
        <span className="card-title">{title}</span>
      </div>
      <div className="card-content">
        <p>{description}</p>
        <div className="author">Published by: {author}</div>
        <div className="publishedAt">Published at: {publishedAt}</div>
      </div>
      <div className="card-action">
        <a href={url} target="_blank">Access the news link</a>
      </div>
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
    if (queryString !== this.state.queryString) {
      this.setState({ queryString: nextProps.queryString });
      this.fetchData(queryString);
    }
  }

  fetchData = (queryString) => {
    fetch(api(queryString))
      .then(response => response.text())
      .then(body => parseData(body))
      .then(feeds => {
        this.setState({ news: feeds });
      })
      .catch(err => console.log('Error on fetching data', err))
  }

  render = () => (
    <div className="google-news-container row">
      {this.state.news.map((news, i) =>
        <Card
          key={'google-news-card-'+i}
          {...news}
        />
      )}
    </div>
  );
}

// Helpers and parsers
function parseData(data) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data,"text/xml");

  const items = xmlDoc.getElementsByTagName('item');

  const feeds = [];
  for(let i=0; i<items.length; i++) {
    const item = items[i];
    const { image, content } = parseDescription(getNode(item, 'description'))
    feeds.push({
      title: getNode(item, 'title'),
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

function parseDescription(htmlContent) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent,"text/html");

  const images = doc.getElementsByTagName('img')
  const image = images[0].src

  const fonts = doc.getElementsByTagName('font')
  let content = ''
  for(let i=0; i<fonts.length; i++) {
    content += htmlDecode(fonts[i].innerHTML) + ' - '
  }
  return { image, content }
}

export default GoogleNewsSearchContainer;
