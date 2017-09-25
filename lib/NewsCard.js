import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Card, BackgroundImage, Subhead, Text, Button, Container } from 'rebass'

const NewsCard = ({ author, title, description, url, urlToImage, publishedAt }) => (
  <Card p={10}>
    <BackgroundImage ratio={1} src={urlToImage} />
    <Subhead p={2}>{title}</Subhead>
    <Text>{description}</Text>
    <Text>Published by: {author}</Text>
    <Text>Published at: {publishedAt}</Text>
    <Button is="a" href={url} children="See this new" width={1} mt={10} />
  </Card>
)

export default NewsCard
