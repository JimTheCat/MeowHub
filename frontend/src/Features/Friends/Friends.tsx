import {Card, Center, Divider, Group, Image, SimpleGrid, Stack, Text, Title} from "@mantine/core";
import {FriendDetailed} from "./components/FriendDetailed";
import {BasicUserInfo} from "../shared/types";
import {useEffect, useState} from "react";
import api from "../shared/services/api.ts";
import cat_no_friends from "./assets/cat_no_friends.png";

export const Friends = () => {
  const [friends, setFriends] = useState<BasicUserInfo[]>([]);

  const fetchFriends = () => {
    api.get('/api/relations/friends').then((response) => {
      setFriends(response.data.content);
    });
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <Center>
      <Card shadow="sm" padding="lg" m={"md"} radius="md" withBorder>
        <Group justify={"space-between"}>
          <Title order={2}>List of friends</Title>
          <Text>Total friends: {friends.length}</Text>
        </Group>

        <Divider mt={"md"}/>
        {/* Friends list */}
        {friends.length > 0 ? (
          <SimpleGrid mt={"md"} cols={3} spacing="lg">
            {friends.map((user) => (
              <FriendDetailed
                key={user.id}
                friend={user}
                onRemove={fetchFriends} // Refresh friends list after removing a friend
              />
            ))}
          </SimpleGrid>
        ) : (
          <Stack align="center" mt="xl">
            <Image
              src={cat_no_friends}
              radius={"md"}
              alt="No friends yet"
              width={200}
              height={200}
            />
            <Text size="lg" c="dimmed" mt="md" ta="center">
              You don’t have any friends yet. 🐾
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Start connecting with people and build your social circle!
            </Text>
          </Stack>
        )}
      </Card>
    </Center>
  );
};
