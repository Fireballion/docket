import {Form, Input, InputRef, Modal} from 'antd';
import React, {useEffect, useRef} from 'react';

interface Values {
  title: string;
  description: string;
}

interface NotebookEditFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const NotebookEditForm: React.FC<NotebookEditFormProps> = ({open, onCreate, onCancel}) => {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();
  // useEffect(() => {
  //   console.log('kjbkjbk');
  //   inputRef.current?.blur();
  //   if (open) {
  //     console.log(inputRef.current);
  //     inputRef.current?.select();
  //   }
  // }, [open]);

  return (
    <Modal
      open={open}
      afterOpenChange={open => {
        console.log(open);
        open ? inputRef.current?.focus() : inputRef.current?.blur();
      }}
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
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{required: true, message: 'Please input the name of notebook!'}]}
        >
          <Input
            ref={inputRef}
            onPressEnter={() => {
              form
                .validateFields()
                .then(values => {
                  form.resetFields();
                  inputRef.current?.blur();
                  onCreate(values);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          className="collection-create-form_last-form-item"
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NotebookEditForm;
