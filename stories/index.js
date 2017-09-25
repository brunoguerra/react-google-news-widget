import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import GoogleNews from '../lib/index'
import { Button, Welcome } from '@storybook/react/demo'

storiesOf('Google News', module).add('Default', () => <GoogleNews queryString="Fullmetal Alchemist" />)
