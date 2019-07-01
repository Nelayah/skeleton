import * as React from 'react';
import DemoComponents from '../';
// import {IAppProps, IAppState} from '../externals';

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