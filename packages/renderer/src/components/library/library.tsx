import {Card, ConfigProvider, Layout, theme, Typography, Image, Button} from 'antd';
import React, {useCallback, useEffect, useRef, useState} from 'react';
const {Header, Content} = Layout;
import './library.css';
import Book from '../book/book';
import {useNavigate} from 'react-router-dom';
import {ipcRenderer} from 'electron';
import {Footer} from 'antd/es/layout/layout';
import {CreateBookModal} from './createBookModal';
import {DataType, Model} from 'sequelize-typescript';

const bgColor = ['#282c34', '#21252b', '#2c313a'];
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  // color: '#ffffff',
  width: '100%',
  paddingInline: 0,
  padding: '0',
  height: 'fit-content',
  // paddingInline: 50,
  lineHeight: '52px',
  backgroundColor: bgColor[0],
};
const contentStyle: React.CSSProperties = {
  paddingLeft: '2px',
  paddingRight: '2px',
  height: '100%',
  backgroundColor: '#21252b',
};

// const books = ['Book 1', 'Book 2'];

const Library: React.FC = () => {
  const [books, setBooks] = useState<Model<any, any>[]>();
  useEffect(() => {
    async function getBooks() {
      const x = await window.api.getBooks();
      setBooks(x);
    }
    if (!books) {
      getBooks();
    }
  }, [books]);

  console.log(books);
  const nav = useNavigate();
  return (
    <div className="library">
      <Layout style={{height: '100%'}}>
        <Header
          className="header"
          style={headerStyle}
        >
          <Typography.Text style={{userSelect: 'none', color: '#abb2bf'}}>
            {'Library'}
          </Typography.Text>
        </Header>
        <Content style={contentStyle}>
          <div className="books-wrapper">
            {books?.map((book: Model<any, any>, i: number) => {
              return (
                <Card
                  key={i}
                  className="book-card"
                  // cover={
                  //   <img
                  //     alt="example"
                  //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  //   />
                  // }
                  style={{padding: '12px'}}
                  // bodyStyle={{}}
                  onClick={() => {
                    nav('/book');
                  }}
                >
                  <Typography.Text
                    ellipsis
                    style={{width: '100%', userSelect: 'none'}}
                  >
                    {book.dataValues.bookName}
                  </Typography.Text>
                </Card>
              );
            })}
          </div>
        </Content>
        <Footer>
          <CreateBookModal />
        </Footer>
      </Layout>

      {/* </ConfigProvider> */}
    </div>
  );
};
export default Library;
