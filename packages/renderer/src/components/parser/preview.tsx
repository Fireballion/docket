import React, {createElement} from 'react';
import {unified} from 'unified';
import 'github-markdown-css/github-markdown.css';
import './preview.css';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import rehypeReact from 'rehype-react';
import remarkRehype from 'remark-rehype';
import RemarkCode from './remark-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeDocument from 'rehype-document';
import rehypeExternalLinks from 'rehype-external-links';
import remarkInlineLinks from 'remark-inline-links';
import rehypeSanitize, {defaultSchema} from 'rehype-sanitize';

interface PreviewProps {
  doc: string;
}

const mathSanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...defaultSchema.attributes!.div, ['className', 'math', 'math-display']],
    span: [['className', 'math', 'math-inline']],
  },
};
const Preview: React.FC<PreviewProps> = props => {
  const md = unified()
    .use(remarkParse)

    .use(remarkMath)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        div: [...(defaultSchema.attributes?.div || []), ['className', 'math', 'math-display']],
        span: [['className', 'math', 'math-inline']],
        code: [...(defaultSchema.attributes?.code || []), 'className'],
      },
    })
    .use(rehypeKatex)

    // .use(remarkInlineLinks)
    .use(rehypeExternalLinks, {
      target: '_blank',
      rel: ['nofollow'],
    })
    .use(rehypeDocument, {
      css: 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css',
    })
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        code: RemarkCode,
      },
    })
    // .process();
    .processSync(props.doc).result;

  return (
    <div
      className="preview markdown-body"
      style={{width: '50%', backgroundColor: '#21252b'}}
    >
      {md}
    </div>
  );
};

export default Preview;
