import {Autocomplete, AutocompleteProps, Avatar, Box, Group, Text} from '@mantine/core';
import {useState} from 'react';
import {IconSearch} from "@tabler/icons-react";
import {SuggestedUsers} from "../../Components/SuggestedUsers";

type SuggestedUser = {
  id: number;
  name: string;
  avatar: string;
  tag: string;
};

// Mockowe dane użytkowników
const users: SuggestedUser[] = [
  {id: 1, name: 'Emily Johnson', avatar: 'https://via.placeholder.com/40', tag: '@emily'},
  {id: 2, name: 'Ava Rodriguez', avatar: 'https://via.placeholder.com/40', tag: '@ava'},
  {id: 3, name: 'Olivia Chen', avatar: 'https://via.placeholder.com/40', tag: '@olivia'},
  {id: 4, name: 'Ethan Barnes', avatar: 'https://via.placeholder.com/40', tag: '@ethan'},
  {id: 5, name: 'Mason Taylor', avatar: 'https://via.placeholder.com/40', tag: '@mason'},
];

const usersData = users.reduce((acc, user) => {
  acc[user.name] = {avatar: user.avatar, tag: user.tag};
  return acc;
}, {} as Record<string, { avatar: string; tag: string }>);

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({option}) => (
  <Group gap="sm">
    <Avatar src={usersData[option.value].avatar} size={36} radius="xl"/>
    <div>
      <Text size="sm">{option.value}</Text>
      <Text size="xs" opacity={0.5}>
        {usersData[option.value].tag}
      </Text>
    </div>
  </Group>
);

export const Search = () => {
  const [query, setQuery] = useState('');

  // Dane do Autocomplete (tylko nazwy użytkowników)
  const filteredData = users
    .filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.tag.toLowerCase().includes(query.toLowerCase())
    )
    .map((user) => user.name);

  return (
    <Box p="xl" w="60dvw">
      <Autocomplete
        data={filteredData}
        leftSection={<IconSearch/>}
        renderOption={renderAutocompleteOption}
        maxDropdownHeight={300}
        placeholder="Wyszukaj"
        limit={5}
        size="xl"
        radius="xl"
        value={query}
        onChange={setQuery}
      />

      <SuggestedUsers/>
    </Box>
  );
};
