import {RichEditor} from "../components/RichEditor";
import {Divider} from "@mantine/core";

type ModalContentProps = {
  content?: string;
  handleContentChange: (html: string) => void;
}

export const ModalRichContent = (props: ModalContentProps) => {
  return (
    <>
      <RichEditor
        content={props.content}
        onContentChange={props.handleContentChange}
      />
      <Divider my={"md"}/>
    </>
  );
};