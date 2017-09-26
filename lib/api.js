export const corsService = 'http://cors-anywhere.herokuapp.com'
export const googleNewsBaseUri = 'https://news.google.com/news/section?cf=all&'
export const defaultLang = 'pt-BR'
export const defaultLocation = 'pt-BR_br'
export const defaultSize = 10
export const imagePlaceholder = 'http://via.placeholder.com/80x80'
export const api = ({
  q,
  lang = defaultLang,
  location = defaultLocation,
  size = defaultSize,
  corsServiceUri = corsService,
}) => `${corsServiceUri}/${googleNewsBaseUri}hl=${lang}&ned=${location}&q=${q}&num=${size}&output=rss`

// Helpers and parsers
export function parseData(data) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(data, 'text/xml')

  const items = xmlDoc.getElementsByTagName('item')

  const feeds = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const { title, author } = parseTitle(getNode(item, 'title'))
    const { image, content } = parseDescription(getNode(item, 'description'))

    feeds.push({
      title,
      author,
      url: getNode(item, 'link'),
      publishedAt: getNode(item, 'pubDate'),
      description: content,
      urlToImage: image,
    })
  }
  return feeds
}

// Retrieve the data of a specific tag
export function getNode(node, tagToRetrieve) {
  var htmlData = node.getElementsByTagName(tagToRetrieve)[0].innerHTML
  return htmlDecode(htmlData) // decode HTML entities, see lodash/underscore
}

export function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

export function parseTitle(content) {
  const s = content.split('-')
  const author = s.pop()
  const title = s.join('-')
  return { title, author }
}

export function parseDescription(htmlContent) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')

  const images = doc.getElementsByTagName('img')
  const hasImage = images[0].src
  const image = hasImage || imagePlaceholder

  const fonts = doc.getElementsByTagName('font')
  let content = ''
  try {
    const indexContent = hasImage ? 5 : 4
    content = htmlDecode(fonts[indexContent].innerHTML)
  } catch (e) {
    for (let i = 0; i < fonts.length; i++) {
      content += htmlDecode(fonts[i].innerHTML) + ' - '
    }
  }
  return { image, content }
}
