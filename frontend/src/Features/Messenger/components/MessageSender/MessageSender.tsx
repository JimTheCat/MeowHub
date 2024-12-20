import {MessageOptions} from "../MessageOptions";
import {TextInput} from "@mantine/core";

export const MessageSender = () => {

  const sendMessage = (text: string) => {
    console.log("Message text: " + text);
  }

  return (
    <TextInput
      placeholder={"Type a message"}
      radius={"xl"}
      m={"md"}
      size={"xl"}
      rightSection={<MessageOptions/>}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(e.currentTarget.value);
          e.currentTarget.value = "";
        }
      }}
    />
  );
}