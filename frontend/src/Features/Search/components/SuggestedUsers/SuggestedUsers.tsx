import {Avatar, Button, Card, Divider, Group, Stack, Text} from "@mantine/core";

type SuggestedUser = {
  id: number;
  name: string;
  avatar: string;
  tag: string;
};

const suggestedUsers: SuggestedUser[] = [
  {id: 1, name: "Alice Johnson", avatar: "https://via.placeholder.com/40", tag: "@alicejohnson"},
  {id: 2, name: "Bob Smith", avatar: "https://via.placeholder.com/40", tag: "@bobsmith"},
  {id: 3, name: "Charlie Brown", avatar: "https://via.placeholder.com/40", tag: "@charliebrown"},
];

export const SuggestedUsers = () => {
  return (
    <Card p="lg" withBorder mt="lg">
      <Text size="lg" mb="sm">
        Suggested Users
      </Text>
      <Divider mb={"md"}/>
      <Group>
        {suggestedUsers.map((user) => (
          <Group key={user.id} justify="flex-start">
            <Group>
              <Avatar src={user.avatar} size={"lg"} radius={180}/>
              <Stack gap={0}>
                <Text>{user.name}</Text>
                <Text>{user.tag}</Text>
              </Stack>
            </Group>
            <Button variant="light" size="xs">
              Follow
            </Button>
          </Group>
        ))}
      </Group>
    </Card>
  );
};
