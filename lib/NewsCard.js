import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex, Box, Card, BackgroundImage, Subhead, Text, Button, Container } from 'rebass'

const NewsCard = ({ author, title, description, url, urlToImage, publishedAt }) => (
  <Card p={10}>
    <Flex align="center">
      <Box>
        <img width={100} height={100} src={urlToImage} />
      </Box>
      <Box w={7 / 10}>
        <Subhead p={2}>{title}</Subhead>
      </Box>
    </Flex>
    <Text>{description}</Text>
    <Text>Published by: {author}</Text>
    <Text>Published at: {publishedAt}</Text>
    <Flex align="center">
      <Button is="a" href={url} target="_blank" children="See this new" width={1} mt={10} />
    </Flex>
  </Card>
)

export default NewsCard
