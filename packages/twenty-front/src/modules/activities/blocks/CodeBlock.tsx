import { CodeEditor } from '@/ui/input/code-editor/components/CodeEditor';
import { createReactBlockSpec } from '@blocknote/react';

export const CodeBlock = createReactBlockSpec(
  {
    type: 'codeBlock',
    propSchema: {
      code: {
        default: '',
      },
    },
    content: 'none',
  },
  {
    render: ({ block }) => {
      return (
        <CodeEditor
          value={block.props.code}
          focusOnMount={true}
          height={200}
          header={<></>}
        />
      );
    },
  },
);
