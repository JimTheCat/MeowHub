import {Card, Group, Text, Tooltip} from "@mantine/core";
import {DateFormatter} from "../../Services/Utils/DateFormatter.tsx";

type SingleMessageProps = {
  message: MessageType;
  isSender: boolean;
}

type MessageType = {
  id: number;
  message: string;
  conversationId: number;
  date: string;
  answered_message_id: number | null;
  sender_id: number;
}

export const SingleMessage = ({message, isSender}: SingleMessageProps) => {
  return (
    <Group justify={isSender ? "right" : "left"}>
      <Tooltip
        label={DateFormatter(message.date)}
        position={isSender ? "bottom-start" : "bottom-end"}
        transitionProps={{transition: 'slide-down', duration: 300}}
        offset={isSender ? {mainAxis: -10, crossAxis: -10} : {mainAxis: -10, crossAxis: 10}}
        openDelay={100}
        closeDelay={100}
      >
        <Card radius={"lg"} shadow={"lg"}>
          <Text>{message.message}</Text>
        </Card>
      </Tooltip>
    </Group>
  );
}