import React, {useCallback, useEffect, useState} from 'react';
import {Note} from '../notebook/notebook';
import useCodeMirror from './codemirror';
import './editor.css';
import LinkModal from './linkModal';

interface Props {
  initialDoc: Note;
  onChange: (doc: Note) => void;
  enterFocus?: boolean;
  setFocus?: (value: React.SetStateAction<boolean>) => void;
}

const Editor: React.FC<Props> = props => {
  const {onChange, initialDoc, enterFocus, setFocus} = props;
  const [open, setOpen] = useState<boolean>(false);
  const handleChange = useCallback(
    (state: {doc: {toString: () => string}}) => {
      initialDoc.properties.body = state.doc.toString();
      onChange(initialDoc);
    },
    [onChange],
  );
  const [refContainer, editorView, pastedText, cursorPosStart, cursorPosEnd] =
    useCodeMirror<HTMLDivElement>({
      initialDoc: props.initialDoc,
      onChange: handleChange,
      setOpen: setOpen,
    });

  useEffect(() => {
    if (editorView && enterFocus && setFocus) {
      editorView.focus();
      setFocus(false);
      // Do nothing for now
    }
  }, [editorView, enterFocus]);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
    console.log(cursorPosStart, cursorPosEnd, editorView);
    if (editorView) {
      const newDoc =
        editorView.state.doc.slice(0, cursorPosStart ?? 0) +
        values.layout +
        editorView.state.doc.slice(cursorPosEnd ?? 0, editorView.state.doc.length);
      console.log(newDoc, editorView.state.selection, editorView.state.doc);

      // editorView.state.replaceSelection(newDoc);
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: newDoc,
        },
      });
    }
  };

  return (
    <div
      className="editor-wrapper"
      ref={refContainer}
      style={{width: '50%', height: '100%'}}
    >
      {pastedText && (
        <LinkModal
          url={pastedText}
          onCancel={() => setOpen(false)}
          onCreate={onCreate}
          open={open}
        />
      )}
    </div>
  );
};

export default Editor;
