import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, text } from '@storybook/addon-knobs'

import GoogleNews from '../lib/index'
import { Button, Welcome } from '@storybook/react/demo'

storiesOf('Google News', module)
  .addDecorator(withKnobs)
  .add('Default', () => <GoogleNews queryString={text('Query string', `Fullmetal Alchemist`)} />)
