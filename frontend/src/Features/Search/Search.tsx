import {
  Autocomplete,
  AutocompleteProps,
  Avatar,
  Center,
  ComboboxItem,
  Group,
  OptionsFilter,
  Stack,
  Text,
} from '@mantine/core';
import {useState} from 'react';
import {IconSearch, IconX} from "@tabler/icons-react";
import {SuggestedUsers} from "./components/SuggestedUsers";
import {useNavigate} from "react-router-dom";
import {BasicUserInfo} from "../shared/types/User.tsx";
import {SearchResults} from "./components/SearchResults";

// Mocked users data
const users: BasicUserInfo[] = [
  {id: '1', name: 'Emily', surname: 'Johnson', profilePicture: 'https://via.placeholder.com/40', login: 'emily'},
  {id: '2', name: 'Ava', surname: 'Rodriguez', profilePicture: 'https://via.placeholder.com/40', login: 'ava'},
  {id: '3', name: 'Olivia', surname: 'Chen', profilePicture: 'https://via.placeholder.com/40', login: 'olivia'},
  {id: '4', name: 'Ethan', surname: 'Barnes', profilePicture: 'https://via.placeholder.com/40', login: 'ethan'},
  {id: '5', name: 'Mason', surname: 'Taylor', profilePicture: 'https://via.placeholder.com/40', login: 'mason'},
  {id: '6', name: "Jan", surname: 'Kowalski', profilePicture: 'https://via.placeholder.com/40', login: 'johndoe'},
];

const usersData = users.reduce((acc, user) => {
  acc[`${user.name} ${user.surname}`] = {profilePicture: user.profilePicture, tag: `@${user.login}`};
  return acc;
}, {} as Record<string, { profilePicture: string | null; tag: string }>);

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({option}) => {
  if (option.value.startsWith("search:")) {
    const searchText = option.value.replace("search:", "");
    return (
      <Text size="sm" opacity={0.7}>
        Wyszukaj "{searchText}"
      </Text>
    );
  }

  return (
    <Group gap="sm">
      <Avatar src={usersData[option.value]?.profilePicture} size={36} radius="xl"/>
      <div>
        <Text size="sm">{option.value}</Text>
        <Text size="xs" opacity={0.5}>
          {usersData[option.value]?.tag}
        </Text>
      </div>
    </Group>
  );
};

export const Search = () => {
  const [query, setQuery] = useState('');
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const navigate = useNavigate();
  const itemsNumber = 5;

  const convertedData = users
    .map((user) => ({
      value: `${user.name} ${user.surname}`,
      label: `${user.name} ${user.surname}`,
      tag: `@${user.login}`,
      profilePicture: user.profilePicture,
    }));

  // Data for autocomplete options
  const optionsFilter: OptionsFilter = ({options, search}) => {
    if (!search) {
      return options;
    }

    const filteredOptions = (options as ComboboxItem[]).filter((option) => {
      const searchLower = search.toLowerCase();
      return option.value.toLowerCase().includes(searchLower) || usersData[option.value]?.tag.toLowerCase().includes(searchLower);
    });

    // Add dynamic option for searching users
    return [
      {
        value: `search:${search}`,
        label: `Wyszukaj "${search}"`,
      },
      ...filteredOptions,
    ].slice(0, itemsNumber);
  };


  const handleSearchSubmit = () => {
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setDropdownOpened(false);
  };

  //TODO: Get random {amount} users and display them in SuggestedUsers component
  //TODO: Get filtered users based on query and display them in SearchResults component

  return (
    <Center>
      <Stack align={'center'} p="xl" w="60dvw">
        <Autocomplete
          data={convertedData}
          leftSection={<IconSearch/>}
          rightSection={query ? <IconX onClick={handleClear} style={{cursor: "pointer"}}/> : null}
          renderOption={renderAutocompleteOption}
          maxDropdownHeight={300}
          placeholder="Wyszukaj"
          filter={optionsFilter}
          w={"100%"}
          size="xl"
          radius="xl"
          value={query}
          dropdownOpened={dropdownOpened}
          onDropdownOpen={() => setDropdownOpened(true)}
          onDropdownClose={() => setDropdownOpened(false)}
          onChange={setQuery}
          onOptionSubmit={(value) => {
            if (value.startsWith("search:")) {
              const searchText = value.replace("search:", "");
              navigate(`/search?query=${encodeURIComponent(searchText)}`);
              handleClear();
            } else {
              navigate(`/profile/${usersData[value]?.tag}`);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearchSubmit();
            }
          }}
        />

        <SuggestedUsers/>
        <SearchResults/>
      </Stack>
    </Center>

  );
};
