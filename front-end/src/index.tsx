import React from 'react';
import App from './pages/App';
import { render, hydrate } from 'react-dom';

const rootElement: any = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(
    <App />,
    rootElement
  );
} else {
  render(
    <App />,
    rootElement
  );
}
