import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Button, Card, Col, Row, Tree, Typography} from 'antd';
import type {DataNode, TreeProps} from 'antd/es/tree';
import {Notebook} from './notebook';
import uuid from 'react-uuid';
import {TreeItem, TreeView} from '@mui/lab';
import {DownOutlined, PlusCircleOutlined, RightOutlined} from '@ant-design/icons';
import {ThemeConfig} from 'antd';
import {borderColor} from '@mui/system';

const x = 3;
const y = 2;
const z = 1;
const defaultData: DataNode[] = [];

const generateData = (_level: number, _preKey?: React.Key, _tns?: DataNode[]) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;

  const children: React.Key[] = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({title: key, key});
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

interface NotebookTreeProps {
  data: Notebook[];
  setActiveNotebook: (value: React.SetStateAction<Notebook | null>) => void;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}

const NotebookTree: React.FC<NotebookTreeProps> = props => {
  const notebooks: DataNode[] = [];
  const {setActiveNotebook, setOpen} = props;

  props.data.map((notebook: Notebook) => {
    const notebookNode = {
      title: notebook.properties.name,
      key: notebook.properties.id,
    };
    notebooks.push(notebookNode);
  });

  const [gData, setGData] = useState<DataNode[]>(notebooks);
  const [showTree, setShowTree] = useState<boolean>(false);

  useEffect(() => {
    setGData(notebooks);
    setShowTree(true);
  }, [props.data]);

  const onDragEnter: TreeProps['onDragEnter'] = info => {
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const onSelect: TreeProps['onSelect'] = info => {
    console.log(info);
    if (info[0] !== '0') {
      const selectedNotebook: Notebook | undefined = props.data.find((notebook: Notebook) => {
        if (notebook.properties.id === info[0]) {
          return notebook;
        }
      });
      if (selectedNotebook) {
        console.log(selectedNotebook);
        setActiveNotebook(selectedNotebook);
      }
    }
  };

  const onDrop: TreeProps['onDrop'] = info => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    if (dropKey != '0') {
      const loop = (
        data: DataNode[],
        key: React.Key,
        callback: (node: DataNode, i: number, data: DataNode[]) => void,
      ) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return callback(data[i], i, data);
          }
          if (data[i].children) {
            loop(data[i].children!, key, callback);
          }
        }
      };
      const data = [...gData];

      // Find dragObject
      let dragObj: DataNode;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });
      console.log(dropKey);

      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, item => {
          item.children = item.children || [];
          // where to insert 示例添加到头部，可以是随意位置
          item.children.unshift(dragObj);
        });
      } else if (
        ((info.node as any).props.children || []).length > 0 && // Has children
        (info.node as any).props.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, item => {
          item.children = item.children || [];
          // where to insert 示例添加到头部，可以是随意位置
          item.children.unshift(dragObj);
          // in previous version, we use item.children.push(dragObj) to insert the
          // item to the tail of the children
        });
      } else {
        let ar: DataNode[] = [];
        let i: number;
        loop(data, dropKey, (_item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i!, 0, dragObj!);
        } else {
          ar.splice(i! + 1, 0, dragObj!);
        }
      }

      setGData(data);
    }
  };
  const treeData = [
    // {
    //   title: 'Notebooks',
    //   key: '0',
    //   children: gData,
    // },
    ...gData,
  ];

  return (
    <>
      <Card
        className="notebook-tree-card"
        bodyStyle={{padding: '12px'}}
        style={{height: '100%'}}
      >
        <Typography.Text
          ellipsis
          style={{width: '100%', userSelect: 'none'}}
        >
          <Button
            type="text"
            shape="circle"
            onClick={() => {
              console.log(showTree);
              setShowTree(!showTree);
            }}
            // size="small"
            icon={showTree ? <DownOutlined /> : <RightOutlined />}
          ></Button>
          Notebooks
          <Button
            type="text"
            shape="circle"
            // size="small"
            icon={<PlusCircleOutlined />}
            onClick={() => setOpen(true)}
            aria-label={'Create Notebook'}
          ></Button>
        </Typography.Text>

        {showTree && (
          <Tree
            className="draggable-tree"
            draggable
            blockNode
            onRightClick={() => {
              console.log('right-clicked');
            }}
            onDragEnter={onDragEnter}
            onSelect={onSelect}
            onDrop={onDrop}
            treeData={treeData}
          />
        )}
      </Card>
    </>
  );
};

export default NotebookTree;
