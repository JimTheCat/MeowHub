import {ActionIcon, Avatar, Card, Divider, Group, Stack, Text} from '@mantine/core';
import {useSearchParams} from "react-router-dom";
import {BasicUserInfo} from "../../../shared/types/User.tsx";
import {IconPlus, IconUserPlus} from "@tabler/icons-react";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  // Mocked users data
  const filteredUsers: BasicUserInfo[] = [
    {id: '1', name: 'Emily', surname: 'Johnson', profilePicture: 'https://via.placeholder.com/40', login: 'emily'},
    {id: '2', name: 'Ava', surname: 'Rodriguez', profilePicture: 'https://via.placeholder.com/40', login: 'ava'},
    {id: '3', name: 'Olivia', surname: 'Chen', profilePicture: 'https://via.placeholder.com/40', login: 'olivia'},
  ];

  if (!query) {
    return null;
  }

  //TODO: Get filtered users based on query

  return (
    <Card w={'100%'} p="lg" withBorder mt="lg">
      <Group justify={'space-between'} mb='md'>
        <Text size="lg" fw={500}>
          Wyniki wyszukiwania:
        </Text>
        <Text size="sm" c="dimmed">
          {filteredUsers.length} results
        </Text>
      </Group>
      <Divider mb={'lg'}/>
      <Stack gap="md">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Group justify={'space-between'} key={user.id}>
              <Group key={user.id} mb="sm" gap="sm">
                <Avatar src={user.profilePicture} size={"lg"} radius="xl"/>
                <div>
                  <Text size="md">{user.name} {user.surname}</Text>
                  <Text size="sm" opacity={0.5}>
                    @{user.login}
                  </Text>
                </div>
              </Group>
              <Group>
                <ActionIcon variant={'subtle'} color={'gray'} size="lg" radius={'lg'} onClick={() => {
                }}>
                  <IconPlus stroke={0.8}/>
                </ActionIcon>
                <ActionIcon variant={'subtle'} color={'gray'} size="lg" radius={'lg'} onClick={() => {
                }}>
                  <IconUserPlus stroke={0.8}/>
                </ActionIcon>
              </Group>
            </Group>
          ))
        ) : (
          <Text size="sm" c="dimmed">
            Brak wyników dla "{query}".
          </Text>
        )}
      </Stack>
    </Card>
  );
};
