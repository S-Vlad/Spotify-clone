'use client';

import { Provider } from 'react-redux';

import { store } from './store';

const Providers: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

type Props = {
  children: React.ReactNode;
};

export default Providers;
