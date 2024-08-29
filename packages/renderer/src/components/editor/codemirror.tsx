import React, {useEffect, useState, useRef, ReactElement} from 'react';
import {EditorSelection, EditorState} from '@codemirror/state';
import {
  EditorView,
  keymap,
  highlightActiveLine,
  highlightActiveLineGutter,
  lineNumbers,
} from '@codemirror/view';
import {defaultKeymap, indentWithTab} from '@codemirror/commands';
import {indentOnInput} from '@codemirror/language';
import {
  bracketMatching,
  defaultHighlightStyle,
  HighlightStyle,
  syntaxHighlighting,
} from '@codemirror/language';
import {markdown, markdownLanguage} from '@codemirror/lang-markdown';
import {languages} from '@codemirror/language-data';
import {oneDark} from '@codemirror/theme-one-dark';

export const transparentTheme = EditorView.theme({
  '&': {
    backgroundColor: '#21252b !important',
    height: '100%',
  },
});

const customSyntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.6em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading2,
    fontSize: '1.4em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading3,
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
]);

import {javascript} from '@codemirror/lang-javascript';
import {Note} from '../notebook/notebook';
import {autocompletion, closeBrackets} from '@codemirror/autocomplete';
import {history, historyKeymap} from '@codemirror/commands';
import {tags} from '@lezer/highlight';
import LinkModal from './linkModal';

interface Props {
  initialDoc: Note | null;
  onChange?: (state: EditorState) => void;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}

const useCodeMirror = <T extends Element>(
  props: Props,
): [React.MutableRefObject<T | null>, EditorView?, string?, number?, number?, EditorSelection?] => {
  const refContainer = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();
  const [pastedText, setPastedText] = useState<string | undefined>();
  const [cursorPosStart, setCursorPosStart] = useState<number>();
  const [cursorPosEnd, setCursorPosEnd] = useState<number>();
  // const [selection, setSelection] = useState<EditorSelection>();

  const {onChange} = props;

  // editorView?.state.update(userEvent)
  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
  };

  useEffect(() => {
    if (!refContainer.current) return;
    editorView?.destroy();
    const startState = EditorState.create({
      doc: props.initialDoc!.properties.body,

      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,

        transparentTheme,
        syntaxHighlighting(customSyntaxHighlighting),
        EditorView.lineWrapping,
        EditorView.domEventHandlers({
          paste(event, view) {
            event.stopPropagation();
            event.preventDefault();
            if (event.clipboardData && event.target) {
              // var newText = event.clipboardData?.getData('text/plain');
              // newText = newText.replace(/\r?\n/g, ' ');
              // if (event.target) {

              // }

              if (event.clipboardData.getData('text/plain')) {
                const isURL = Boolean(new URL(event.clipboardData.getData('text')));

                if (isURL) {
                  const el = event.currentTarget as HTMLInputElement;
                  console.log(view.state.selection);
                  // setSelection();
                  setCursorPosStart(view.state.selection.ranges[0].from);
                  setCursorPosEnd(view.state.selection.ranges[0].to);
                  setPastedText(event.clipboardData.getData('text'));
                  props.setOpen(true);
                }
              }
            }
          },
        }),
        EditorView.updateListener.of(update => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });

    setEditorView(view);
  }, [refContainer, props.initialDoc]);

  return [refContainer, editorView, pastedText, cursorPosStart, cursorPosEnd];
};

export default useCodeMirror;
