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


