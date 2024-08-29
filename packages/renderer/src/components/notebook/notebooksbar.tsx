import {FormOutlined} from '@ant-design/icons';
import {Button, Select} from 'antd';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {Notebook} from './notebook';
import NotebookCreateForm from './notebookCreateForm';
import './notebooks.css';
import NotebookTree from './notebooktree';

interface NotebooksProps {
  notebooks: Notebook[] | [];
  createNotebook: (name?: string) => void;
  setActiveNotebook: (value: React.SetStateAction<Notebook | null>) => void;
}

const NotebooksBar: React.FC<NotebooksProps> = props => {
  const {notebooks, createNotebook, setActiveNotebook} = props;
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    createNotebook(values.title);
    setOpen(false);
  };

  return (
    <div className="notebooksbar-wrapper">
      {/* <Button
        style={{backgroundColor: 'transparent'}}
        icon={<FormOutlined />}
        onClick={() => setOpen(true)}
        aria-label={'Create Note'}
      ></Button> */}
      <NotebookCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <NotebookTree
        data={notebooks}
        setActiveNotebook={setActiveNotebook}
        setOpen={setOpen}
      />
      {/* {notebooks?.map((notebook: Notebook) => {
        return <Button key={notebook.properties.id}>{notebook.properties.name}</Button>;
      })} */}
    </div>
  );
};

export default NotebooksBar;
