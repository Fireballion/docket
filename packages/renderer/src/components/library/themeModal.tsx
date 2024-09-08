import {Form, Button, Modal} from 'antd';
import React, {useState} from 'react';
import {BookThemeEditor} from '../book/bookThemeEditor';
import './themeModal.css';
import {BookTheme} from '../book/booktheme';
interface ThemeProps {
  setTheme: (bkt: BookTheme) => void;
}

export const ThemeModal: React.FC<ThemeProps> = ({setTheme}) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookPath, setBookPath] = useState<string>('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (bkt: BookTheme) => {
    setTheme(bkt);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        // type="primary"
        onClick={showModal}
        style={{float: 'right'}}
      >
        Set Custom Theme (can be set later)
      </Button>
      <Modal
        title="New Book"
        open={isModalOpen}
        footer={null}
        style={{minWidth: '50vw'}}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          style={{
            height: '75vh',
            display: 'grid',
          }}
        >
          <BookThemeEditor saveTheme={handleOk} />
        </div>
      </Modal>
    </>
  );
};
