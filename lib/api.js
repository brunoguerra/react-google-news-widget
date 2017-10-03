export const corsService = '//cors-anywhere.herokuapp.com'
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

  return Array.from(xmlDoc.getElementsByTagName('item')).map(item => {
    const { title, author } = parseTitle(getNode(item, 'title'))
    const { image, content } = parseDescription(getNode(item, 'description'))

    return {
      title,
      author,
      url: getNode(item, 'link'),
      publishedAt: getNode(item, 'pubDate'),
      description: content,
      urlToImage: image,
    }
  })
}

// Retrieve the data of a specific tag
export function getNode(node, tagToRetrieve) {
  const htmlData = node.getElementsByTagName(tagToRetrieve)[0].innerHTML
  return htmlDecode(htmlData) // decode HTML entities, see lodash/underscore
}

export function htmlDecode(input) {
  const doc = new DOMParser().parseFromString(input, 'text/html')
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
