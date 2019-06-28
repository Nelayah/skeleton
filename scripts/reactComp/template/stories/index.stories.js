import React from 'react';
import { storiesOf } from '@storybook/react';
import Demo from '../lib/demo';

storiesOf('Demo', module)
  .add('Demo', () => (
    <Demo />
  ));
