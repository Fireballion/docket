import {height} from '@mui/system';
import {Button, Card, Form, Input, Modal, Radio, Space} from 'antd';
import form from 'antd/es/form';
import React, {useEffect, useState} from 'react';
import * as cheerio from 'cheerio';

interface Values {
  title: string;
}

interface LinkPasteFormProps {
  open: boolean;
  url: string;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const LinkModal: React.FC<LinkPasteFormProps> = props => {
  const [form] = Form.useForm();
  const [linkFormat, setLinkFormat] = useState<string>('plaintext');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const {open, url, onCreate, onCancel} = props;

  const onLinkFormatChange = ({format}: {format: string}) => {
    setLinkFormat(format);
  };
  useEffect(() => {
    setTitle('');
    setLoading(true);
    fetch(url)
      .then(function (response) {
        return response.text();
      })
      .then(function (html) {
        // Load HTML in Cheerio
        const $ = cheerio.load(html);
        console.log(html);

        // Use `title` as a selector and extract
        // the text using the `text()` method
        console.log($('title').text());
        setTitle($('title').text());
        setLoading(false);
      })
      .catch(function (err) {
        console.error('Failed to fetch page: ', err);
      });
  }, [url]);

  console.log(title);
  return (
    <Modal
      open={open}
      title="Create a new notebook"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();

            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        layout={'vertical'}
        form={form}
        initialValues={{format: linkFormat}}
        onValuesChange={onLinkFormatChange}
        style={{maxWidth: 600}}
      >
        <Form.Item
          label="Form Layout"
          name="layout"
        >
          <Radio.Group
            value={linkFormat}
            defaultValue={url}
          >
            <Space direction="vertical">
              <Radio value={url}>
                <Card title={'As Plaintext'}>
                  <p>{url}</p>
                </Card>
              </Radio>
              <Radio value={`<${url}>`}>
                <Card title={'With Angle Brackets'}>
                  <p>{`<${url}>`}</p>
                </Card>
              </Radio>
              <Radio value={`[${title}](${url})`}>
                <Card
                  title={'With Site Name'}
                  loading={loading}
                >
                  <p>{`[${title}](${url})`}</p>
                </Card>
              </Radio>
              <Radio value={`[](${url})`}>
                <Card title={'Without Site Name'}>
                  <p>{`[](${url})`}</p>
                </Card>
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {/* <Form.Item {...buttonItemLayout}>
          <Button type="primary">Paste Link</Button>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default LinkModal;
