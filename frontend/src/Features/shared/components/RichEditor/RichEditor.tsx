import {Link, RichTextEditor} from '@mantine/tiptap';
import {useEditor} from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from "@tiptap/extension-placeholder";

type RichEditorProps = {
  onContentChange?: (html: string) => void;
  content?: string;
}

export const RichEditor = (props: RichEditorProps) => {
  let language = localStorage.getItem('language');
  if (language === null) language = 'en';

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({types: ['heading', 'paragraph']}),
      Placeholder.configure({placeholder: language === 'en' ? 'What\'s on your mind?' : 'Co u Ciebie słychać?'}),
    ],
    content: props.content,
    onUpdate({editor}) {
      const html = editor.getHTML();
      props.onContentChange && props.onContentChange(html);
    },
  });

  return (
    <RichTextEditor editor={editor} variant={"subtle"}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold/>
          <RichTextEditor.Italic/>
          <RichTextEditor.Underline/>
          <RichTextEditor.Strikethrough/>
          <RichTextEditor.ClearFormatting/>
          <RichTextEditor.Highlight/>
          <RichTextEditor.Code/>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1/>
          <RichTextEditor.H2/>
          <RichTextEditor.H3/>
          <RichTextEditor.H4/>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote/>
          <RichTextEditor.Hr/>
          <RichTextEditor.BulletList/>
          <RichTextEditor.OrderedList/>
          <RichTextEditor.Subscript/>
          <RichTextEditor.Superscript/>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link/>
          <RichTextEditor.Unlink/>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft/>
          <RichTextEditor.AlignCenter/>
          <RichTextEditor.AlignJustify/>
          <RichTextEditor.AlignRight/>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo/>
          <RichTextEditor.Redo/>
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content/>
    </RichTextEditor>
  );
}