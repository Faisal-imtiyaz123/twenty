import { BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';

import { FileBlock } from './FileBlock';
import { CodeBlock } from '@/activities/blocks/CodeBlock';

export const blockSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    file: FileBlock,
    codeBlock: CodeBlock,
  },
});
