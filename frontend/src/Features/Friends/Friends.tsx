import {Card, Center, Group, SimpleGrid, Text, Title} from "@mantine/core";
import {FriendDetailed} from "./components/FriendDetailed";

type SuggestedUser = {
  id: number;
  name: string;
  avatar: string;
  tag: string;
};

const dummyUsers: SuggestedUser[] = [
  {id: 1, name: "Alice Johnson", avatar: "https://via.placeholder.com/40", tag: "@alicejohnson"},
  {id: 2, name: "Bob Smith", avatar: "https://via.placeholder.com/40", tag: "@bobsmith"},
  {id: 3, name: "Charlie Brown", avatar: "https://via.placeholder.com/40", tag: "@charliebrown"},
  {id: 4, name: "David Johnson", avatar: "https://via.placeholder.com/40", tag: "@davidjohnson"},
  {id: 5, name: "Eve Johnson", avatar: "https://via.placeholder.com/40", tag: "@evejohnson"},
  {id: 6, name: "Frank Johnson", avatar: "https://via.placeholder.com/40", tag: "@frankjohnson"},
  {id: 7, name: "Grace Johnson", avatar: "https://via.placeholder.com/40", tag: "@gracejohnson"},
  {id: 8, name: "Hannah Johnson", avatar: "https://via.placeholder.com/40", tag: "@hannahjohnson"},
  {id: 9, name: "Isaac Johnson", avatar: "https://via.placeholder.com/40", tag: "@isaacjohnson"},
  {id: 10, name: "Jack Johnson", avatar: "https://via.placeholder.com/40", tag: "@jackjohnson"},
  {id: 11, name: "Katie Johnson", avatar: "https://via.placeholder.com/40", tag: "@katiejohnson"},
];

export const Friends = () => {
  return (
    <Center>
      <Card shadow="sm" padding="lg" m={"md"} radius="md" w={"fit-content"} withBorder>
        <Group justify={"space-between"} align={"flex-start"}>
          <Title mb={"md"} order={2}>
            List of friends
          </Title>
          <Text>
            Total friends: {dummyUsers.length}
          </Text>
        </Group>
        {/*List of friends*/}
        <SimpleGrid cols={3} spacing="lg">
          {dummyUsers.map((user) => (
            <FriendDetailed key={user.id} friend={user}/>
          ))}
        </SimpleGrid>
      </Card>
    </Center>
  )
}