import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Card = ({ author, title, description, url, urlToImage, publishedAt }) => (
  <div className="card">
    <div className="card-content">
      <img src={urlToImage} alt={title} className="card-image" />
      <span className="card-title">{title}</span>
      <p>{description}</p>
      <div className="author">Published by: {author}</div>
      <div className="publishedAt">Published at: {publishedAt}</div>
    </div>
    <div className="card-action">
      <a href={url} target="_blank">
        Access the news link
      </a>
    </div>
  </div>
)

export default Card
