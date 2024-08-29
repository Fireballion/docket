import {DeleteOutlined, EllipsisOutlined, ExclamationCircleTwoTone} from '@ant-design/icons';
import {Button, Modal, Card, Select} from 'antd';
import TimeAgo from 'javascript-time-ago';
import React, {useEffect, useState} from 'react';
import {Note, Notebook} from './notebook';
import './notebooks.css';
import {SortMode} from '/@/app';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
import {dialog} from 'electron';
import path from 'path';
import fs from 'fs';

interface NotesProps {
  activeNotebook: Notebook | null;
  activeNote: Note | null;
  createNote: (id: string) => void;
  deleteNote: (notebookId: string, noteId?: string) => void;
  setActiveNote: (value: React.SetStateAction<Note | null>) => void;
  sortMode: SortMode;
}

TimeAgo.addDefaultLocale(en);

const {confirm} = Modal;

const NotesBar: React.FC<NotesProps> = props => {
  const {activeNotebook, activeNote, setActiveNote, deleteNote, sortMode} = props;

  const [notes, setNotes] = useState<Note[] | undefined>(activeNotebook?.properties.notes);

  // const timeAgo = new TimeAgo('en-US');

  const handleSearch = (searchTerm: string) => {
    var regex = new RegExp(searchTerm.split('').join('\\s*'), 'gi');
    const searchNotes = activeNotebook?.properties.notes.filter((note: Note) => {
      return note.properties.name.match(regex) || note.properties.body.match(regex);
    });
    setNotes(searchNotes);
  };

  useEffect(() => {
    if (activeNotebook) {
      const noteSort = activeNotebook.properties.notes;
      switch (sortMode) {
        case SortMode.DateModified:
          noteSort.sort(
            (a: Note, b: Note) => b.properties.lastModified - a.properties.lastModified,
          );
          break;
        case SortMode.ReverseDate:
          noteSort.sort(
            (a: Note, b: Note) => b.properties.lastModified - a.properties.lastModified,
          );
          noteSort.reverse();
          console.log(noteSort);
          break;
        case SortMode.Alphabetical:
          noteSort?.sort((a: Note, b: Note) => {
            const nameA = a.properties.name;
            const nameB = b.properties.name;
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
          });
          break;
        case SortMode.ReverseAlphabetical:
          noteSort.sort((a: Note, b: Note) => {
            const nameA = a.properties.name;
            const nameB = b.properties.name;
            return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
          });
          break;
        case SortMode.Custom:
          break;
        default:
          break;
      }
      console.log(noteSort, 'sort mode changed');
      setNotes([...noteSort]);
    }
  }, [
    // activeNotebook?.properties.notes.map((note: Note) => {
    //   note.properties.lastModified;
    // }),
    activeNote?.properties.lastModified,
    sortMode.valueOf(),
    activeNotebook?.properties.notes,
  ]);

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this note?',
      icon: <ExclamationCircleTwoTone twoToneColor={'#ff0000'} />,
      content: 'Deleted Notes Cannot Be Recovered',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        activeNotebook &&
          (activeNote
            ? deleteNote(activeNotebook.properties.id, activeNote.properties.id)
            : deleteNote(activeNotebook.properties.id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div className="notesbar-wrapper">
      {/* <Button
        style={{backgroundColor: 'transparent', marginRight: '0%', float: 'right'}}
        icon={<DeleteOutlined />}
        danger
        disabled={!activeNotebook}
        onClick={showDeleteConfirm}
        aria-label={'Create Note'}
      ></Button> */}
      <Select
        showSearch
        // value={value}
        placeholder={'Search for a note'}
        style={{width: '100%', paddingTop: '10px'}}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        // onChange={handleChange}
        notFoundContent={null}
        // options={(data || []).map((d) => ({
        //   value: d.value,
        //   label: d.text,
        // }))}
      />
      {notes?.map((note: Note) => {
        return (
          <Card
            title={note.properties.name.length > 0 ? note.properties.name : 'Untitled Note'}
            type="inner"
            style={{
              maxWidth: '100%',
            }}
            className="note-card"
            // className={`${note === activeNote ? 'note-card-active' : 'note-card-active'}`}
            // size="small"
            key={note.properties.id}
            onClick={() => {
              setActiveNote(note);
            }}
          >
            {/* {md} */}
            {/* {React.Children(md)} */}

            {/* <p className="note-subDescription">{note.properties.body.substring(0, 100)}</p> */}
            <p style={{whiteSpace: 'pre-wrap'}}>
              <ReactTimeAgo
                date={note.properties.lastModified}
                locale="en-US"
                style={{fontWeight: 'bold'}}
              />
            </p>
            {/* <p style={{whiteSpace: 'pre-wrap'}}>
              Last Modified:
              {new Date(note.properties.lastModified).toLocaleDateString('en-GB', {
                // hour: '2-digit',
                // minute: '2-digit',
              })}
            </p> */}

            <Button
              style={{backgroundColor: 'transparent', marginRight: '10%', float: 'right'}}
              icon={<EllipsisOutlined />}
              disabled={!activeNotebook}
              onClick={() => {
                try {
                  fs.writeFileSync('myfile.txt', 'the text to write in the file', 'utf-8');
                } catch (e) {
                  console.log(e);
                  alert('Failed to save the file !');
                }
                // electron.ipcRenderer.send('application-export-to-markdown');
                console.log('clicked');
              }}
              aria-label={'Create Note'}
            ></Button>
          </Card>
        );
      })}
    </div>
  );
};

export default NotesBar;
