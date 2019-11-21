import React from 'react';
import { storiesOf } from '@storybook/react';
import Example from '../lib/example';

storiesOf('Example', module)
  .addParameters({
    options: {
      showAddonPanel: false
    }
  })
  .add('Example', () => (
    <Example />
  ));
