import {Card, Center, Divider, Group, Image, SimpleGrid, Stack, Text, Title} from "@mantine/core";
import {FriendDetailed} from "./components/FriendDetailed";
import {BasicUserInfo} from "../shared/types";
import {useEffect, useState} from "react";
import api from "../shared/services/api.ts";
import cat_no_friends from "./assets/cat_no_friends.png";
import {useTranslation} from "react-i18next";
import {useAuthStore} from "../shared/services/authStore.ts";

export const Friends = () => {
  const [friends, setFriends] = useState<BasicUserInfo[]>([]);
  const {t} = useTranslation('friends');
  const auth = useAuthStore();

  const fetchFriends = () => {
    api.get(`/api/relations/${auth.user?.login}/friends`).then((response) => {
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
          <Title order={2}>{t('friends.card.title')}</Title>
          <Text>{t('friends.card.total')} {friends.length}</Text>
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
              alt={t('friends.card.contentWithoutFriends.imageAlt')}
              width={200}
              height={200}
            />
            <Text size="lg" c="dimmed" mt="md" ta="center">
              {t('friends.card.contentWithoutFriends.text')}
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              {t('friends.card.contentWithoutFriends.subtext')}
            </Text>
          </Stack>
        )}
      </Card>
    </Center>
  );
};
