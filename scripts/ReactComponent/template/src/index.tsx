import * as React from 'react';

interface IAppProps {}

const Component: React.FC<IAppProps> = props => {
  return (
    <div>Hello world</div>
  );
};

Component.displayName = 'Component';

export default Component;
