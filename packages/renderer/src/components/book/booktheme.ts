// import {string} from 'react-colorful';

type BookThemeAttributes = {
  headerBackgroundColour: string;
  backgroundColour: string;
  borderColour: string;
  accentColour: string;

  explorerTheme: ExplorerTheme;
  editorTheme: EditorTheme;
  documentTheme: DocumentTheme;
};

type ExplorerTheme = {
  backgroundColour: string;

  folderIcon: string;

  folderNameColour: string;
  fileNameColour: string;
};

type EditorTheme = {
  editorBackgroundColour: string;
  editorTextColour: string;
  editorMarginColour: string;
  editorMarginNumberColour: string;

  editorEmphasisSyntaxColour: string;
  editorEmphasisTextColour: string;

  editorCodeBlockColour: string;
  editorCodeBracketsColour: string;
  editorCodeFunctionSyntaxColour: string;
  editorCodeFunctionNameColour: string;
  editorCodeNumberColour: string;
  editorCodeStringColour: string;
};

type DocumentTheme = {
  documentBackgroundColour: string;
  documentTitleBackgroundColour: string;

  documentTitleColour: string;

  documentH1Colour: string;
  documentH2Colour: string;
  documentH3Colour: string;
  documentH4Colour: string;
  documentH5Colour: string;
  documentH6Colour: string;

  documentH1UnderlineColour: string;
  documentH2UnderlineColour: string;

  documentTextColour: string;

  documentTextBoldColour: string;
  documentTextItalicColour: string;
  documentTextBoldItalicColour: string; //maybe redundant. md can use inline style to enforce specific colours

  documentListBulletColour: string;
  documentListNumberColour: string;

  documentTextLinkColour: string;

  documentCodeBlockColour: string;
  documentCodeBracketsColour: string;
  documentCodeFunctionKeywordColour: string;
  documentCodeFunctionNameColour: string;
  documentCodeNumberColour: string;
  documentCodeStringColour: string;

  documentFootnoteColour: string;

  documentTableBorderColour: string;

  documentBlockQuoteColour: string;

  documentHorizontalRuleColour: string;

  documentBorderColour: string;
};

export class BookTheme {
  properties: BookThemeAttributes;

  constructor(bookThemeProps?: BookThemeAttributes) {
    if (bookThemeProps) {
      this.properties = bookThemeProps;
    } else {
      this.properties = {
        headerBackgroundColour: '#282c34',
        backgroundColour: '#21252b',
        borderColour: '#010101',
        accentColour: '#010101',

        explorerTheme: {
          backgroundColour: '#21252b',
          folderIcon: '',
          folderNameColour: '#abb3bf',
          fileNameColour: '#abb3bf',
        },
        editorTheme: {
          editorBackgroundColour: '#21252b',
          editorTextColour: '#21252b',

          editorMarginColour: '#21252b',
          editorMarginNumberColour: '#21252b',

          editorEmphasisSyntaxColour: '#21252b',
          editorEmphasisTextColour: '#21252b',
          editorCodeBlockColour: '#21252b',
          editorCodeBracketsColour: '#21252b',
          editorCodeFunctionSyntaxColour: '#21252b',
          editorCodeFunctionNameColour: '#21252b',
          editorCodeNumberColour: '#21252b',
          editorCodeStringColour: '#21252b',
        },
        documentTheme: {
          documentBackgroundColour: '#21252b',
          documentTitleBackgroundColour: '#21252b',

          documentTitleColour: '#21252b',
          documentH1Colour: '#21252b',
          documentH2Colour: '#21252b',
          documentH3Colour: '#21252b',
          documentH4Colour: '#21252b',
          documentH5Colour: '#21252b',
          documentH6Colour: '#21252b',
          documentH1UnderlineColour: '#21252b',
          documentH2UnderlineColour: '#21252b',
          documentTextColour: '#21252b',
          documentTextBoldColour: '#21252b',
          documentTextItalicColour: '#21252b',
          documentTextBoldItalicColour: '#21252b',
          documentListBulletColour: '#21252b',
          documentListNumberColour: '#21252b',
          documentTextLinkColour: '#21252b',
          documentCodeBlockColour: '#21252b',
          documentCodeBracketsColour: '#21252b',
          documentCodeFunctionKeywordColour: '#21252b',
          documentCodeFunctionNameColour: '#21252b',
          documentCodeNumberColour: '#21252b',
          documentCodeStringColour: '#21252b',
          documentFootnoteColour: '#21252b',
          documentTableBorderColour: '#21252b',
          documentBlockQuoteColour: '#21252b',
          documentHorizontalRuleColour: '#21252b',
          documentBorderColour: '#21252b',
        },
      };
    }
  }
}
