import {ActionIcon, Avatar, Group, Indicator, ScrollArea, Stack, Text, TextInput, Title} from "@mantine/core";
import {IconEdit, IconSearch} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Chat} from "../../Components/Chat";
import {UnselectedChat} from "../../Components/UnselectedChat";
import {DateFormatter} from "../../Services/Utils/DateFormatter.tsx";

type DummyUserType = {
  conversationId: number;
  name: string;
  surname: string;
  avatar: string;
  lastMessage: string;
  lastMessageDate: string;
  status: string;
  lastActiveAt: Date;
}

const dummyUsers: DummyUserType[] = [
  {
    conversationId: 1,
    name: "John",
    surname: "Doe",
    avatar: "",
    lastMessage: "Hello",
    //accurate time for testing
    lastMessageDate: new Date().toISOString(),
    status: "online",
    lastActiveAt: new Date(),
  },
  {
    conversationId: 2,
    name: "Jane",
    surname: "Doe",
    avatar: "",
    lastMessage: "Hello",
    lastMessageDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),  // actual - 1 day
    status: "online",
    lastActiveAt: new Date(),
  },
  {
    conversationId: 3,
    name: "Alice",
    surname: "Doe",
    avatar: "",
    lastMessage: "Hello",
    lastMessageDate: "2021-10-10",
    status: "online",
    lastActiveAt: new Date(),
  },
  {
    conversationId: 4,
    name: "Bob",
    surname: "Doe",
    avatar: "",
    lastMessage: "Hello",
    lastMessageDate: "2021-10-10",
    status: "online",
    lastActiveAt: new Date(),
  },
  {
    conversationId: 5,
    name: "Charlie",
    surname: "Doe",
    avatar: "",
    lastMessage: "Hello",
    lastMessageDate: "2021-10-10",
    status: "online",
    lastActiveAt: new Date(),
  },
  {
    conversationId: 6,
    name: "David",
    surname: "Doe",
    avatar: "",
    lastMessage: "Hello",
    lastMessageDate: "2021-10-10",
    status: "online",
    lastActiveAt: new Date(),
  },
  {
    conversationId: 7,
    name: "Eve",
    surname: "Doe",
    avatar: "",
    lastMessage: "Hello",
    lastMessageDate: "2021-10-10",
    status: "online",
    lastActiveAt: new Date(),
  },
  {
    conversationId: 8,
    name: "Frank",
    surname: "Doe",
    avatar: "",
    lastMessage: "Hello",
    lastMessageDate: "2021-10-10",
    status: "online",
    lastActiveAt: new Date(),
  },
  {
    conversationId: 9,
    name: "Grace",
    surname: "Doe",
    avatar: "",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec fermentum purus. Nulla facilisi. Donec lacinia, nunc sit amet fermentum aliquam, nibh turpis scelerisque nunc, nec dignissim libero mauris vitae libero. Nullam nec fermentum purus. Nulla facilisi. Donec lacinia, nunc sit amet fermentum aliquam, nibh turpis scelerisque nunc, nec dignissim libero mauris vitae libero.",
    // lastMessage: "Hello",
    lastMessageDate: "2021-10-10",
    status: "online",
    lastActiveAt: new Date(),
  },
  {
    conversationId: 10,
    name: "Henry",
    surname: "Doe",
    avatar: "",
    lastMessage: "Hello",
    lastMessageDate: "2021-10-10",
    status: "online",
    lastActiveAt: new Date(),
  },
  {
    conversationId: 11,
    name: "Ivy",
    surname: "Doe",
    avatar: "",
    lastMessage: "Hello",
    lastMessageDate: "2021-10-10",
    status: "online",
    lastActiveAt: new Date(),
  },
  {
    conversationId: 12,
    name: "Jack",
    surname: "Doe",
    avatar: "",
    lastMessage: "Hello",
    lastMessageDate: "2021-10-10",
    status: "online",
    lastActiveAt: new Date(),
  },

]

export const Messenger = () => {

  const navigate = useNavigate();

  const {conversationId} = useParams();

  const [users, setUsers] = useState(dummyUsers);

  const updateUserStatusInApp = (updatedUser: DummyUserType) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.conversationId === updatedUser.conversationId ? {...user, status: updatedUser.status} : user
      )
    );
  }

  const simulateUserStatusChanges = (users: DummyUserType[]) => {
    users.forEach((user) => {
      setInterval(() => {
        const statuses = ["online", "away", "offline"];
        user.status = statuses[Math.floor(Math.random() * statuses.length)];
        updateUserStatusInApp(user);
      }, Math.random() * 100000 + 50000);
    });
  }

  const simulateUserActivity = (users: DummyUserType[]) => {
    users.forEach((user) => {
      setInterval(() => {
        user.lastActiveAt = new Date();
        if (user.status !== "online") {
          user.status = "online";
          updateUserStatusInApp(user);
        }
      }, Math.random() * 300000 + 60000); // Aktywność co 1-6 minut
    });
  }

  const handleColorByStatus = (user: DummyUserType) => {
    if (user.status === "online") {
      return "green";
    } else if (user.status === "away") {
      return "yellow";
    } else {
      return "gray";
    }
  }

  useEffect(() => {
    simulateUserStatusChanges(users);
    simulateUserActivity(users);
  }, []);

  return (
    <Group gap={0} align={"stretch"} grow preventGrowOverflow={false} wrap="nowrap">
      {/*List of friends*/}
      <Stack p={"lg"} maw={"22vw"} mah="100vh">
        <Group justify={"space-between"}>
          <Title>
            Chat
          </Title>
          <ActionIcon variant={"subtle"} color={"gray"} aria-label={"New chat"}>
            <IconEdit stroke={1.5}/>
          </ActionIcon>
        </Group>
        <TextInput
          placeholder={"Search"}
          leftSection={<IconSearch/>}
          radius={"md"}
          size={"lg"}
        />
        <ScrollArea.Autosize>
          {users.map((user) => (
            <Group
              p={"sm"}
              key={user.conversationId}
              onClick={() => navigate(`/messages/${user.conversationId}`)}
              style={(theme) => ({
                cursor: "pointer",
                backgroundColor: conversationId === user.conversationId.toString() ? theme.colors.dark[6] : "transparent",
              })}
              wrap={"nowrap"}
            >
              <Indicator
                position={"bottom-end"}
                size={12}
                offset={7}
                color={handleColorByStatus(user)}
              >
                <Avatar
                  radius={180}
                  size={"lg"}
                  src={user.avatar}
                />
              </Indicator>
              <Stack gap={"0"}>
                <Text>
                  {user.name} {user.surname}
                </Text>
                <Group gap={"5"}>
                  <Text maw={"10vw"} truncate={"end"} size={"sm"} c={"dimmed"}>
                    {user.lastMessage}
                  </Text>
                  •
                  <Text size={"sm"} c={"dimmed"}>
                    {DateFormatter(user.lastMessageDate)}
                  </Text>
                </Group>
              </Stack>
            </Group>
          ))}
        </ScrollArea.Autosize>
      </Stack>
      {/*Chat*/}
      {!conversationId && <UnselectedChat/>}
      {conversationId &&
          <Chat conversationId={conversationId}/>
      }
    </Group>

  );
}