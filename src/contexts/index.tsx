import React from 'react';
import { ConfigProvider } from './config';
import { Contexts } from './contexts';

export const ContextProviders: React.FC = ({ children }) => (
  <ConfigProvider>
    <Contexts>{children}</Contexts>
  </ConfigProvider>
);
