import {Autocomplete, AutocompleteProps, Avatar, Box, ComboboxItem, Group, OptionsFilter, Text} from '@mantine/core';
import {useState} from 'react';
import {IconSearch, IconX} from "@tabler/icons-react";
import {SuggestedUsers} from "./components/SuggestedUsers";
import {useNavigate} from "react-router-dom";

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
  {id: 6, name: "Jan Kowalski", avatar: 'https://via.placeholder.com/40', tag: '@johndoe'},
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
  const navigate = useNavigate();

  const convertedData = users
    .map((user) => ({
      value: user.name,
      label: user.name,
      tag: user.tag,
      avatar: user.avatar,
    }));

  // Dane do Autocomplete (nazwy użytkowników i tagi użytkowników)
  const optionsFilter: OptionsFilter = ({options, search}) => {

    if (!search) {
      return options;
    }

    return (options as ComboboxItem[]).filter((option) => {
      const searchLower = search.toLowerCase();
      return option.value.toLowerCase().includes(searchLower) || usersData[option.value].tag.toLowerCase().includes(searchLower);
    });
  };

  const handleClear = () => {
    setQuery('');
  }

  return (
    <Box p="xl" w="60dvw">
      <Autocomplete
        data={convertedData}
        leftSection={<IconSearch/>}
        rightSection={query ? <IconX onClick={handleClear} style={{cursor: "pointer"}}/> : null}
        renderOption={renderAutocompleteOption}
        maxDropdownHeight={300}
        placeholder="Wyszukaj"
        filter={optionsFilter}
        limit={5}
        size="xl"
        radius="xl"
        value={query}
        onChange={setQuery}
        onOptionSubmit={(value) => {
          navigate(`/profile/${usersData[value].tag}`)
        }}
      />

      <SuggestedUsers/>
    </Box>
  );
};
