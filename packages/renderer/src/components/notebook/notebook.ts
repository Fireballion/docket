type NotebookAttributes = {
  id: string;
  name: string;
  notes: Note[];
};

export class Notebook {
  properties: NotebookAttributes;

  constructor(notebookProps: NotebookAttributes) {
    this.properties = notebookProps;
  }
}

type NoteAttributes = {
  id: string;
  name: string;
  body: string;
  lastModified: number;
  customOrderId: number;
};
export class Note {
  properties: NoteAttributes;

  constructor(noteProps: NoteAttributes) {
    this.properties = noteProps;
  }
}
type Folder = {
  id: string;
  name: string;
};
