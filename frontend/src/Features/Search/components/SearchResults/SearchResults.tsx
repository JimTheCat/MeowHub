import {Avatar, Card, Divider, Group, Stack, Text} from '@mantine/core';
import {useNavigate, useSearchParams} from "react-router-dom";
import {BasicUserInfo} from "../../../shared/types";
import {useEffect, useState} from "react";
import api from "../../../shared/services/api.ts";
import {useAuthStore} from "../../../shared/services/authStore.ts";
import {InvitationStatus} from "../../../shared/components/InvitationStatus";
import {useTranslation} from "react-i18next";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [filteredUsers, setFilteredUsers] = useState<BasicUserInfo[]>([]);
  const loggedInUser = useAuthStore();
  const navigate = useNavigate();
  const {t} = useTranslation('search');
  const personPolish = (count: number) => {
    const mod = count % 10;
    const mod2 = count % 100;
    if (mod === 1 && mod2 !== 11) {
      return 'osobę';
    } else if (mod >= 2 && mod <= 4 && (mod2 < 10 || mod2 >= 20)) {
      return 'osoby';
    } else {
      return 'osób';
    }
  }

  useEffect(() => {
    if (query) {
      // Fetch users matching the query
      api.get('/api/users/search', {
        params: {query},
      }).then((response) => {
        const users = response.data.content;
        setFilteredUsers(users);
      });
    }
  }, [query]);

  if (!query) {
    return null;
  }

  return (
    <Card w={'100%'} p="lg" withBorder mt="lg">
      <Group justify={'space-between'} mb='md'>
        <Text size="lg" fw={500}>
          {t('results.card.title')}
        </Text>
        {filteredUsers.length > 0 &&
            <Text size="sm" c="dimmed">
              {t('results.card.count', {count: filteredUsers.length, person: personPolish(filteredUsers.length)})}
            </Text>
        }
      </Group>
      <Divider mb={'lg'}/>
      <Stack gap="md">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Group justify={'space-between'} key={user.id}>
              <Group mb="sm" gap="sm" onClick={() => navigate(`/profile/@${user.login}`)} style={{cursor: 'pointer'}}>
                <Avatar src={user.profilePictureUrl} size={"lg"} radius="xl"/>
                <div>
                  <Text size="md">{user.name} {user.surname}</Text>
                  <Text size="sm" opacity={0.5}>
                    @{user.login}
                  </Text>
                </div>
              </Group>
              {loggedInUser.user?.login !== user.login && <InvitationStatus user={user}/>}
            </Group>
          ))
        ) : (
          <Text size="sm" c="dimmed">
            {t('results.card.noResults', {query})}
          </Text>
        )}
      </Stack>
    </Card>
  );
};
