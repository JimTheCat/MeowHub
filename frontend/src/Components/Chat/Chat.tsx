import {ActionIcon, Avatar, Card, Flex, Group, ScrollArea, Stack, Text, TextInput, Title} from "@mantine/core";
import {IconDots, IconSearch} from "@tabler/icons-react";

const user: any = {
  conversationId: 1,
  name: "John",
  surname: "Doe",
  avatar: "",
  lastMessage: "Hello",
  //accurate time for testing
  lastMessageDate: new Date().toISOString(),
  status: "online",
  lastActiveAt: new Date(),

}

type MessageType = {
  id: number;
  message: string;
  conversationId: number;
  date: string;
  answered_message_id: number | null;
  sender_id: number;
}

const messages: MessageType[] = [
  {
    id: 1,
    message: "Hi",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: null,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 2,
    message: "Hello",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 1,
    sender_id: 1, // our user id
  },
  {
    id: 3,
    message: "How are you?",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 2,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 4,
    message: "I'm fine",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 3,
    sender_id: 1, // our user id
  },
  {
    id: 5,
    message: "What about you?",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 4,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 6,
    message: "I'm fine too",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 5,
    sender_id: 1, // our user id
  },
  {
    id: 7,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 6,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 8,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 7,
    sender_id: 1, // our user id
  },
  {
    id: 9,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 8,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 10,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 9,
    sender_id: 1, // our user id
  },
  {
    id: 11,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 10,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 12,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 11,
    sender_id: 1, // our user id
  },
  {
    id: 13,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 12,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 14,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 13,
    sender_id: 1, // our user id
  },
  {
    id: 15,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 14,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 16,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 15,
    sender_id: 1, // our user id
  },
  {
    id: 17,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 16,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 18,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 17,
    sender_id: 1, // our user id
  },
  {
    id: 19,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 18,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 20,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 19,
    sender_id: 1, // our user id
  },
  {
    id: 21,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 20,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 22,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 21,
    sender_id: 1, // our user id
  },
  {
    id: 23,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 22,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 24,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 23,
    sender_id: 1, // our user id
  },
  {
    id: 25,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 24,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 26,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 25,
    sender_id: 1, // our user id
  },
  {
    id: 27,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 26,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 28,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 27,
    sender_id: 1, // our user id
  },
  {
    id: 29,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 28,
    sender_id: 2000, // our dummy user id
  },
  {
    id: 30,
    message: "Good to hear that",
    conversationId: 1,
    date: new Date().toISOString(),
    answered_message_id: 29,
    sender_id: 1, // our user id
  },

]

export const Chat = (props: { conversationId: string }) => {

  if (props.conversationId !== user.conversationId.toString()) {
    return (
      <Text>Preview available only for id: 1</Text>
    );
  }

  const handleMessageDisplay = (message: MessageType) => {
    // if the message is from the logged user then display it on the right
    // else display it on the left

    const loggedUserId = 2000; // TODO: Replace this value with the actual logged user id after implementing authentication

    if (message.sender_id === loggedUserId) {
      return "right"
    }

    return "left";
  }

  return (
    <Flex direction={"column"} h={"100vh"}>
      <Card style={{flexShrink: 0}}>
        <Group justify={"space-between"}>
          <Group>
            <Avatar size={"lg"} radius={"xl"}/>
            <Stack gap={0}>
              <Title order={4}>{user.name} {user.surname}</Title>
              <Text c={"dimmed"}>{user.status}</Text>
            </Stack>
          </Group>
          <Group gap={"xs"}>
            <ActionIcon color={"gray"} c={"gray"} variant={"subtle"} radius={"xl"} size={"xl"}>
              <IconSearch stroke={1.5}/>
            </ActionIcon>
            <ActionIcon color={"gray"} c={"gray"} variant={"subtle"} radius={"xl"} size={"xl"}>
              <IconDots stroke={1.5}/>
            </ActionIcon>
          </Group>
        </Group>
      </Card>

      <ScrollArea.Autosize p={"xs"} h={"fit-content"} style={{flexGrow: 1}}>
        <Stack gap={"xs"} justify={"flex-end"}>
          {messages.map((message) => (
            <Group key={message.id} justify={handleMessageDisplay(message)}>
              <Text>{message.message}</Text>
              <Text c={"dimmed"}>{message.date}</Text>
            </Group>
          ))}
        </Stack>
      </ScrollArea.Autosize>

      <TextInput placeholder={"Type a message"} radius={"xl"} m={"md"} size={"xl"}/>

    </Flex>
  )
}