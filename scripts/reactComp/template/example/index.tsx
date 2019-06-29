import * as React from 'react';
import DemoComponents from '../';

export interface IAppProps {
}

export interface IAppState {
}

export default class extends React.Component<IAppProps, IAppState> {
  public render() {
    return (
      <div>
        This is a demo.
        <DemoComponents />
      </div>
    );
  }
}