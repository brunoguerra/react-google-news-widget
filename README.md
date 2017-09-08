# React GoogleNews Widget

# GoogleNewsContainer Component

This is main component what fetchs and show cards with content.

## Props

**queryString**: When this props changes container will fetchs new data
if its different of last queryString prop passed

**lang**: Using google news uri `hl` param, set language for the fetching data.
The default is 'pt-BR'.

**location**: Using google news uri `ned` param, set location for the fetching
data. The default is 'pt-BR_br'.

**size**: Using google news uri `num` param, set max articles for the fetching.
The default is 10.



# Additional Styles for materializecss

To make this cards flows, we need add some styles:

```css

.cards-container {
  column-break-inside: avoid;
}
.cards-container .card {
  display: inline-block;
  overflow: visible;
}

@media only screen and (max-width: 600px) {
  .cards-container {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
  }
}
@media only screen and (min-width: 601px) {
  .cards-container {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
}
@media only screen and (min-width: 993px) {
  .cards-container {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
  }
}

```
