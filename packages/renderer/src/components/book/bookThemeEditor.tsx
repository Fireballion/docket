import React, {useCallback, useState} from 'react';
import {BookTheme} from './booktheme';
import {HexColorInput, HexColorPicker, HsvaColor, RgbColorPicker} from 'react-colorful';
import {Button, ConfigProvider} from 'antd';
import BookColorPicker from './bookColorPicker';
import './picker.css';
import {Footer, Header} from 'antd/es/layout/layout';
interface ThemeProps {
  saveTheme: (bkt: BookTheme) => void;
}

export const BookThemeEditor: React.FC<ThemeProps> = ({saveTheme}) => {
  const [bkt, setBkt] = useState<BookTheme>({
    properties: {
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
    },
  });
  const handleChange = useCallback((bkt: BookTheme) => {}, [bkt.properties]);
  //   const {colour, setColour} = useState("#");

  return (
    <ConfigProvider>
      {/* <div className="settings-wrapper"> */}
      {/* <Header></Header>
      <div className="content">
        <p>
          https://stackoverflow.com/questions/48722763/how-to-force-a-header-and-footer-to-stay-visible-on-the-page-using-css-grid
        </p>
      </div>
      <Footer></Footer> */}
      {/* <Header style={{backgroundColor: bkt.properties.headerBackgroundColour}}>Book Theme</Header> */}
      <div className="content">
        <h3 style={{color: '#abb3bf', marginLeft: '1vw'}}>Book Theme</h3>
        <hr />
        <div style={{display: 'grid', padding: '0 15px'}}>
          <BookColorPicker
            title="Header Background Color"
            color={bkt.properties.headerBackgroundColour}
            setColor={function (str: string) {
              setBkt({
                properties: {
                  ...bkt.properties,
                  headerBackgroundColour: str,
                },
              });
            }}
          />
          <BookColorPicker
            title="Background Color"
            color={bkt.properties.backgroundColour}
            setColor={function (str: string) {
              setBkt({
                properties: {
                  ...bkt.properties,
                  backgroundColour: str,
                },
              });
            }}
          />
          <BookColorPicker
            title="Border Color"
            color={bkt.properties.borderColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  borderColour: str,
                },
              });
            }}
          />
          <BookColorPicker
            title="Accent Color"
            color={bkt.properties.accentColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  accentColour: str,
                },
              });
            }}
          />
        </div>
        <h3 style={{color: '#abb3bf', marginLeft: '1vw'}}>Explorer Theme</h3>
        <hr />
        <div style={{display: 'grid', padding: '0 15px'}}>
          <BookColorPicker
            title="Background Color"
            color={bkt.properties.explorerTheme.backgroundColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  explorerTheme: {
                    ...bkt.properties.explorerTheme,
                    backgroundColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Folder Name Color"
            color={bkt.properties.explorerTheme.folderNameColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  explorerTheme: {
                    ...bkt.properties.explorerTheme,
                    folderNameColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="File Name Color"
            color={bkt.properties.explorerTheme.fileNameColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  explorerTheme: {
                    ...bkt.properties.explorerTheme,
                    fileNameColour: str,
                  },
                },
              });
            }}
          />
        </div>
        <h3 style={{color: '#abb3bf', marginLeft: '1vw'}}>Editor Theme</h3>
        <hr />
        <div style={{display: 'grid', padding: '0 15px'}}>
          <BookColorPicker
            title="Background Color"
            color={bkt.properties.editorTheme.editorBackgroundColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorBackgroundColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Text Color"
            color={bkt.properties.editorTheme.editorTextColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorTextColour: str,
                  },
                },
              });
            }}
          />
          <hr className="settings-border" />

          <BookColorPicker
            title="Margin Color"
            color={bkt.properties.editorTheme.editorMarginColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorMarginColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Margin Number Color"
            color={bkt.properties.editorTheme.editorMarginNumberColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorMarginNumberColour: str,
                  },
                },
              });
            }}
          />
          <hr className="settings-border" />

          <BookColorPicker
            title="Emphasis Syntax Color"
            color={bkt.properties.editorTheme.editorEmphasisSyntaxColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorEmphasisSyntaxColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Emphasis Text Color"
            color={bkt.properties.editorTheme.editorEmphasisTextColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorEmphasisTextColour: str,
                  },
                },
              });
            }}
          />
          <hr className="settings-border" />

          <BookColorPicker
            title="Code Block Color"
            color={bkt.properties.editorTheme.editorCodeBlockColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorCodeBlockColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Code Bracket Color"
            color={bkt.properties.editorTheme.editorCodeBracketsColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorCodeBracketsColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Code Function Syntax Color"
            color={bkt.properties.editorTheme.editorCodeFunctionSyntaxColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorCodeFunctionSyntaxColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Code Function Name Color"
            color={bkt.properties.editorTheme.editorCodeFunctionNameColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorCodeFunctionNameColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Code Number Color"
            color={bkt.properties.editorTheme.editorCodeNumberColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorCodeNumberColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Code String Color"
            color={bkt.properties.editorTheme.editorCodeStringColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  editorTheme: {
                    ...bkt.properties.editorTheme,
                    editorCodeStringColour: str,
                  },
                },
              });
            }}
          />
        </div>

        <h3 style={{color: '#abb3bf', marginLeft: '1vw'}}>Document Theme</h3>
        <hr />
        <div style={{display: 'grid', padding: '0 15px'}}>
          <BookColorPicker
            title="Background Color"
            color={bkt.properties.documentTheme.documentBackgroundColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentBackgroundColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Title Color"
            color={bkt.properties.documentTheme.documentTitleColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentTitleColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Title Background Color"
            color={bkt.properties.documentTheme.documentTitleBackgroundColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentTitleBackgroundColour: str,
                  },
                },
              });
            }}
          />
          <hr className="settings-border" />

          <BookColorPicker
            title="H1 Color"
            color={bkt.properties.documentTheme.documentH1Colour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentH1Colour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="H2 Color"
            color={bkt.properties.documentTheme.documentH2Colour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentH2Colour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="H3 Color"
            color={bkt.properties.documentTheme.documentH3Colour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentH3Colour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="H4 Color"
            color={bkt.properties.documentTheme.documentH4Colour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentH4Colour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="H5 Color"
            color={bkt.properties.documentTheme.documentH5Colour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentH5Colour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="H6 Color"
            color={bkt.properties.documentTheme.documentH6Colour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentH6Colour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="H1 Underline Color"
            color={bkt.properties.documentTheme.documentH1UnderlineColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentH1UnderlineColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="H2 Underline Color"
            color={bkt.properties.documentTheme.documentH2UnderlineColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentH2UnderlineColour: str,
                  },
                },
              });
            }}
          />
          <hr className="settings-border" />

          <BookColorPicker
            title="Text Color"
            color={bkt.properties.documentTheme.documentTextColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentTextColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Text Bold Color"
            color={bkt.properties.documentTheme.documentTextBoldColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentTextBoldColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Text Italic Color"
            color={bkt.properties.documentTheme.documentTextItalicColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentTextItalicColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Text Bold Italic Color"
            color={bkt.properties.documentTheme.documentTextBoldItalicColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentTextBoldItalicColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="List Bullet Color"
            color={bkt.properties.documentTheme.documentListBulletColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentListBulletColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="List Number Color"
            color={bkt.properties.documentTheme.documentListNumberColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentListNumberColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Link Color"
            color={bkt.properties.documentTheme.documentTextLinkColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentTextLinkColour: str,
                  },
                },
              });
            }}
          />
          <hr className="settings-border" />

          <BookColorPicker
            title="Code Block Color"
            color={bkt.properties.documentTheme.documentCodeBlockColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentCodeBlockColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Code Bracket Color"
            color={bkt.properties.documentTheme.documentCodeBracketsColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentCodeBracketsColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Code Function Syntax Color"
            color={bkt.properties.documentTheme.documentCodeFunctionKeywordColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentCodeFunctionKeywordColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Code Function Name Color"
            color={bkt.properties.documentTheme.documentCodeFunctionNameColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentCodeFunctionNameColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Code Number Color"
            color={bkt.properties.documentTheme.documentCodeNumberColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentCodeNumberColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Code String Color"
            color={bkt.properties.documentTheme.documentCodeStringColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentCodeStringColour: str,
                  },
                },
              });
            }}
          />
          <hr className="settings-border" />

          <BookColorPicker
            title="Footnote Color"
            color={bkt.properties.documentTheme.documentFootnoteColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentFootnoteColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Table Border Color"
            color={bkt.properties.documentTheme.documentTableBorderColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentTableBorderColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Block Quote Color"
            color={bkt.properties.documentTheme.documentBlockQuoteColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentBlockQuoteColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Horizontal Rule Color"
            color={bkt.properties.documentTheme.documentHorizontalRuleColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentHorizontalRuleColour: str,
                  },
                },
              });
            }}
          />
          <BookColorPicker
            title="Border Color"
            color={bkt.properties.documentTheme.documentBorderColour}
            setColor={function (str: string): void {
              setBkt({
                properties: {
                  ...bkt.properties,
                  documentTheme: {
                    ...bkt.properties.documentTheme,
                    documentBorderColour: str,
                  },
                },
              });
            }}
          />
        </div>
      </div>
      {/* <Footer> */}
      <Button onClick={() => saveTheme(bkt)}>Save</Button>
      {/* </Footer> */}
      {/* </div> */}
    </ConfigProvider>
  );
};

// export default BookThemeEditor;
