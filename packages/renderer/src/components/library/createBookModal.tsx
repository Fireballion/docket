import {Button, Form, FormInstance, Input, Modal, Space} from 'antd';
import {NamePath} from 'antd/es/form/interface';
import React, {useState} from 'react';
import {ThemeModal} from './themeModal';
import {Book} from './book';
import * as fs from 'fs';
import {normalize} from 'path';
import {BookTheme} from '../book/booktheme';
import {app} from 'electron';

export const CreateBookModal: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookPath, setBookPath] = useState<string>('');
  const [theme, setTheme] = useState<BookTheme>({
    properties: {
      headerBackgroundColour: '#282c34',
      backgroundColour: '#21252b',
      borderColour: '#010101',
      accentColour: '#010101',

      explorerTheme: {
        backgroundColour: '#21252b',
        folderIcon: '',
        folderNameColour: '#abb3bf',
        fileNameColour: '#abb3bf',
      },
      editorTheme: {
        editorBackgroundColour: '#21252b',
        editorTextColour: '#21252b',

        editorMarginColour: '#21252b',
        editorMarginNumberColour: '#21252b',

        editorEmphasisSyntaxColour: '#21252b',
        editorEmphasisTextColour: '#21252b',
        editorCodeBlockColour: '#21252b',
        editorCodeBracketsColour: '#21252b',
        editorCodeFunctionSyntaxColour: '#21252b',
        editorCodeFunctionNameColour: '#21252b',
        editorCodeNumberColour: '#21252b',
        editorCodeStringColour: '#21252b',
      },
      documentTheme: {
        documentBackgroundColour: '#21252b',
        documentTitleBackgroundColour: '#21252b',

        documentTitleColour: '#21252b',
        documentH1Colour: '#21252b',
        documentH2Colour: '#21252b',
        documentH3Colour: '#21252b',
        documentH4Colour: '#21252b',
        documentH5Colour: '#21252b',
        documentH6Colour: '#21252b',
        documentH1UnderlineColour: '#21252b',
        documentH2UnderlineColour: '#21252b',
        documentTextColour: '#21252b',
        documentTextBoldColour: '#21252b',
        documentTextItalicColour: '#21252b',
        documentTextBoldItalicColour: '#21252b',
        documentListBulletColour: '#21252b',
        documentListNumberColour: '#21252b',
        documentTextLinkColour: '#21252b',
        documentCodeBlockColour: '#21252b',
        documentCodeBracketsColour: '#21252b',
        documentCodeFunctionKeywordColour: '#21252b',
        documentCodeFunctionNameColour: '#21252b',
        documentCodeNumberColour: '#21252b',
        documentCodeStringColour: '#21252b',
        documentFootnoteColour: '#21252b',
        documentTableBorderColour: '#21252b',
        documentBlockQuoteColour: '#21252b',
        documentHorizontalRuleColour: '#21252b',
        documentBorderColour: '#21252b',
      },
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    const name = form.getFieldValue('name');
    const path = form.getFieldValue('path');
    const book = new Book({name: name, path: path});

    const res = await window.api.addBook(name, path);
    if (res == 'success') {
      window.api.writeData(path + '/.docket/docketconfig.json', JSON.stringify(book));
      window.api.writeData(path + '/.docket/docketThemeconfig.json', JSON.stringify(theme));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{float: 'right'}}
      >
        New Book
      </Button>
      <Modal
        title="New Book"
        open={isModalOpen}
        footer={null}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="on"
        >
          <Form.Item
            label="Book Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your book title!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Book Path"
            name={'path'}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Space.Compact style={{width: '100%'}}>
              <Input
                disabled
                // required
                value={bookPath}
                // defaultValue={bookPath}
              />
              <Button
                type="primary"
                onClick={async () => {
                  const bookPath = await window.api.openFile();
                  setBookPath(bookPath);
                  form.setFieldValue('path', bookPath);
                }}
              >
                Browse
              </Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item>
            <Space>
              <ThemeModal setTheme={setTheme} />
            </Space>
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton
                form={form}
                clickFn={handleOk}
              >
                Submit
              </SubmitButton>
              <Button
                htmlType="reset"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

interface SubmitButtonProps {
  form: FormInstance;
  clickFn:
    | (React.MouseEventHandler<HTMLAnchorElement> & React.MouseEventHandler<HTMLButtonElement>)
    | undefined;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  clickFn,
  children,
}) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields()
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      onClick={clickFn}
    >
      {children}
    </Button>
  );
};
