import * as React from 'react';
import './shim';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';

const container = document.getElementById('root')!;

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render: Render an element to the root.
root.render(
  //   <React.StrictMode>
  <App />,
  //   </React.StrictMode>,
);
