import * as React from 'react';
import './shim';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import Library from './components/library/library';
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom';
import Book from './components/book/book';
import {BookThemeEditor} from './components/book/bookThemeEditor';
import {ConfigProvider, theme, ThemeConfig} from 'antd';
import {Model, Sequelize} from 'sequelize-typescript';

declare global {
  interface Window {
    api: {
      writeData: (a: string, b: string) => void;
      openFile: () => string;
      readLibData: () => string;
      readData: (a: string) => string;
      getSequelizeInstance: () => Sequelize;
      getBooks: () => [];
      addBook: (name: string, path: string) => string | unknown;
    };
  }
  interface Book {
    bookName: string;
    path: string;
  }
}

const container = document.getElementById('root')!;

// Create a root.
const root = ReactDOM.createRoot(container);
const appTheme: ThemeConfig['token'] = {colorPrimary: '#21252b', colorBgBase: '#282c34'};
const router = createBrowserRouter([
  {
    path: '/',
    element: <Library />,
  },
  {
    path: 'book',
    element: <Book />,
  },
]);

// Initial render: Render an element to the root.
root.render(
  <React.StrictMode>
    {/* <Library />, */}
    <ConfigProvider
      theme={{
        token: appTheme,

        algorithm: theme.darkAlgorithm,
      }}
    >
      <div id="titleBarContainer">
        <div
          id="titleBar"
          className=" draggable"
        >
          <span className="draggable">Docket</span>
        </div>
      </div>
      {/* <div id="mainContent"></div> */}
      <div
        id="mainContent"
        style={{backgroundColor: appTheme.colorPrimary}}
      >
        <RouterProvider router={router} />
      </div>
    </ConfigProvider>
  </React.StrictMode>,
);
