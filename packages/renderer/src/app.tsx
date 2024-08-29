import React, {useCallback, useEffect, useRef, useState} from 'react';
import './app.css';
import Editor from './components/editor/editor';
import {Note, Notebook} from './components/notebook/notebook';
import Preview from './components/parser/preview';
import ls from 'localstorage-slim';
import {Resizable} from 're-resizable';
import NotebooksBar from './components/notebook/notebooksbar';
import NotesBar from './components/notebook/notesbar';
import uuid from 'react-uuid';
import {ArrowDownOutlined, ArrowUpOutlined, BookOutlined, EditOutlined} from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Dropdown,
  Input,
  InputRef,
  Layout,
  MenuProps,
  Space,
  theme,
  Typography,
} from 'antd';

const {Header, Content} = Layout;

const bgColor = ['#282c34', '#21252b', '#2c313a'];

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  // color: '#ffffff',
  width: '100%',
  paddingInline: 0,
  padding: '0',
  height: '52px',
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
const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

export enum SortMode {
  DateModified,
  ReverseDate,
  Alphabetical,
  ReverseAlphabetical,
  Custom,
}

const App: React.FC = () => {
  ls.clear();

  const [dataExists] = useState(ls.get('0') ?? false);
  const [notebooks, setNotebooks] = useState<Notebook[] | []>(JSON.parse(ls.get('0') ?? '[]'));
  const [activeNotebook, setActiveNotebook] = useState<Notebook | null>(null);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [focusEditor, setFocusEditor] = useState<boolean>(false);

  const [doc, setDoc] = useState<string>(activeNote?.properties.body ?? '');
  const [noteName, setNoteName] = useState<string>(activeNote?.properties.name ?? '');
  const titleRef = useRef<InputRef>(null);
  const [sortMode, setSortMode] = useState<SortMode>(SortMode.DateModified);

  const handleDocChange = useCallback(
    (newNote: Note) => {
      console.log('doc changed');
      if (newNote) {
        console.log(newNote, activeNotebook);
        setDoc(newNote.properties.body);
        newNote.properties.lastModified = Date.now();
      }
    },
    [activeNote?.properties.body && activeNote.properties.id],
  );

  useEffect(() => {
    console.log('notebook changed');
    setActiveNote(null);
  }, [activeNotebook]);

  useEffect(() => {
    console.log('note changed');
    if (activeNote) {
      console.log(activeNote.properties.name);
      //setActiveNote(activeNote);
      //setNoteName(activeNote.properties.name);
      //setDoc(activeNote.properties.body);
    }

    titleRef.current?.focus();
  }, [activeNote]);

  const handeNoteNameChange = useCallback(
    (newNote: Note) => {
      console.log('note name changed');
      setNoteName(newNote.properties.name);
      newNote.properties.lastModified = Date.now();
    },
    [activeNote?.properties.name],
  );
  // useEffect(() => {
  //   console.log('note name changed');

  //   if (activeNote) {
  //     setNoteName(activeNote.properties.name);
  //   }
  // }, [activeNote?.properties.name]);

  // this function initializes a new notebook
  const onCreateNotebook = (name?: string) => {
    const newNotebook = new Notebook({
      id: uuid(),
      name: name ?? 'New Notebook',
      notes: [],
    });
    setNotebooks([newNotebook, ...notebooks]);
    setActiveNotebook(newNotebook);
  };

  const onCreateNote = (id: string) => {
    let orderID = 0;

    for (let i = 0; i < notebooks.length; i++) {
      const notebook = notebooks[i];
      if (notebook.properties.id == id) {
        orderID = notebook.properties.notes.length;
      }
    }
    const newNote = new Note({
      id: uuid(),
      name: '',
      body: '',
      lastModified: Date.now(),
      customOrderId: orderID,
    });
    const updatedNotebooksArray = notebooks.map(notebook => {
      if (notebook?.properties.id === id) {
        notebook.properties.notes = [newNote, ...notebook.properties.notes];
      }
      return notebook;
    });
    setNotebooks(updatedNotebooksArray);
    setActiveNote(newNote);
    console.log(titleRef.current);
  };

  const onDeleteNote = (notebookId: string, noteId?: string) => {
    const updatedNotebooksArray = notebooks.map(notebook => {
      if (notebook?.properties.id === notebookId) {
        if (noteId) {
          notebook.properties.notes = notebook.properties.notes.filter((note: Note) => {
            return noteId !== note.properties.id;
          });
        } else {
          notebook.properties.notes.shift();
        }
        console.log(notebook.properties.notes);
      }
      return notebook;
    });
    setNotebooks(updatedNotebooksArray);
    setActiveNote(null);
  };

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: 'Date Modified',
      icon: <ArrowUpOutlined />,
    },
    {
      key: '1',
      label: 'Date Modified',
      icon: <ArrowDownOutlined />,
    },
    {
      key: '2',
      label: 'Alphabetical',
      icon: <ArrowUpOutlined />,
    },
    {
      key: '3',
      label: 'Alphabetical',
      icon: <ArrowDownOutlined />,
    },
    {
      key: '4',
      label: 'Custom',
    },
  ];

  return (
    <div className="app">
      <ConfigProvider
        theme={{
          token: {colorPrimary: '#1677ff'},

          algorithm: theme.darkAlgorithm,
        }}
      >
        {/* <Layout> */}

        {/* <Content style={contentStyle}> */}
        <Resizable
          defaultSize={{width: '25%', height: '100%'}}
          minWidth={'25%'}
          maxWidth={'40%'}
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <Layout style={{height: '100%'}}>
            <Header
              className="header"
              style={headerStyle}
            ></Header>
            <Content style={contentStyle}>
              <NotebooksBar
                notebooks={notebooks}
                createNotebook={onCreateNotebook}
                setActiveNotebook={setActiveNotebook}
              />
            </Content>
          </Layout>
        </Resizable>
        <Resizable
          minWidth={'25%'}
          maxWidth={'40%'}
          defaultSize={{width: '25%', height: '100%'}}
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <Layout style={{height: '100%'}}>
            <Header
              className="header"
              style={headerStyle}
            >
              <Button
                className="header-button"
                icon={<EditOutlined />}
                style={{float: 'left', marginLeft: '13px'}}
                onClick={() => {
                  activeNotebook && onCreateNote(activeNotebook.properties.id);
                }}
                disabled={!activeNotebook}
                aria-label={'Create Note'}
              ></Button>
              <span style={{marginRight: '13px', float: 'right'}}>
                <Dropdown
                  trigger={['click']}
                  className="header-button"
                  menu={{
                    items,
                    onSelect: info => {
                      switch (info.key) {
                        case '0':
                          setSortMode(SortMode.DateModified);
                          break;
                        case '1':
                          setSortMode(SortMode.ReverseDate);
                          break;
                        case '2':
                          setSortMode(SortMode.Alphabetical);
                          break;
                        case '3':
                          setSortMode(SortMode.ReverseAlphabetical);
                          break;
                        case '4':
                          setSortMode(SortMode.Custom);
                          break;
                      }
                    },

                    selectable: true,
                    defaultSelectedKeys: ['0'],
                  }}
                >
                  <Typography.Link onClick={e => e.preventDefault()}>
                    <Space>
                      {items.map((item: any, idx: number) => {
                        if (idx === sortMode) return [item.label, item.icon];
                      })}
                    </Space>
                  </Typography.Link>
                </Dropdown>
              </span>

              {/* <Typography.Text style={{userSelect: 'none', color: '#abb2bf'}}>
                {activeNotebook
                  ? `${activeNotebook.properties.name}${
                      activeNote && activeNote.properties.name
                        ? ` - ${activeNote.properties.name}`
                        : ''
                    }`
                  : 'Docket'}
              </Typography.Text> */}
            </Header>
            <Content style={contentStyle}>
              <NotesBar
                sortMode={sortMode}
                activeNotebook={activeNotebook}
                deleteNote={onDeleteNote}
                activeNote={activeNote}
                createNote={onCreateNote}
                setActiveNote={setActiveNote}
              />
            </Content>
          </Layout>
        </Resizable>
        <Resizable
          minWidth={'20%'}
          maxWidth={'50%'}
          defaultSize={{width: '50%', height: '100%'}}
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <Layout style={{height: '100%'}}>
            <Header
              className="header"
              style={{...headerStyle}}
            >
              <Typography.Text style={{userSelect: 'none', color: '#abb2bf'}}>
                {activeNotebook
                  ? `${activeNotebook.properties.name}${
                      activeNote && activeNote.properties.name
                        ? ` - ${activeNote.properties.name}`
                        : ''
                    }`
                  : 'Docket'}
              </Typography.Text>
            </Header>
            <Content style={contentStyle}>
              {activeNote && activeNotebook ? (
                <div className="noteEditor-wrapper">
                  <Input
                    ref={titleRef}
                    className="noteTitle-Editor"
                    onChange={e => {
                      const currentNote = activeNote;
                      currentNote.properties.name = e.target.value;
                      handeNoteNameChange(currentNote);
                    }}
                    onPressEnter={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFocusEditor(true);
                    }}
                    style={{borderRadius: 0}}
                    value={activeNote.properties.name}
                    placeholder={'Untitled Note'}
                  />
                  <div className="editandpreview">
                    <Editor
                      onChange={e => {
                        const curr = activeNote;
                        handleDocChange(curr);
                      }}
                      initialDoc={activeNote}
                      enterFocus={focusEditor}
                      setFocus={setFocusEditor}
                    />
                    <Preview doc={doc} />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: bgColor[1],
                    height: '100%',
                    width: '100%',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <h1 style={{color: '#abb2bf'}}>Please Select A Note</h1>
                </div>
              )}
            </Content>
          </Layout>
        </Resizable>
      </ConfigProvider>
    </div>
  );
};
export default App;
