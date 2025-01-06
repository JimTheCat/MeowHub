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
import {useEffect, useState} from 'react';
import {IconSearch, IconX} from "@tabler/icons-react";
import {SuggestedUsers} from "./components/SuggestedUsers";
import {useNavigate} from "react-router-dom";
import {BasicUserInfo} from "../shared/types";
import {SearchResults} from "./components/SearchResults";
import api from "../shared/services/api.ts";

export const Search = () => {
  const [query, setQuery] = useState('');
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [userOptions, setUserOptions] = useState<ComboboxItem[]>([]);
  const [usersData, setUsersData] = useState<Record<string, { profilePicture: string | null; tag: string }>>({});
  const navigate = useNavigate();
  const itemsNumber = 5;

  const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({option}) => {

    console.log('option', option);

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
        <Avatar src={usersData[option.value].profilePicture} size={36} radius="xl"/>
        <div>
          <Text size="sm">{option.value}</Text>
          <Text size="xs" opacity={0.5}>
            {usersData[option.value].tag}
          </Text>
        </div>
      </Group>
    );
  };

  const fetchUsers = async (searchQuery = '') => {
    try {
      const response = await api.get('/api/users/search', {
        params: {
          query: searchQuery,
          size: itemsNumber,
        },

      });

      const content = response.data.content as BasicUserInfo[];

      const users = content.map((user: BasicUserInfo) => ({
        value: `${user.name} ${user.surname}`,
        label: `${user.name} ${user.surname}`,
        tag: `@${user.login}`,
        profilePicture: user.profilePicture,
      }));

      // Map user data
      const userDataMap = content.reduce((acc, user) => {
        acc[`${user.name} ${user.surname}`] = {profilePicture: user.profilePicture, tag: `@${user.login}`};
        return acc;
      }, {} as Record<string, { profilePicture: string | null; tag: string }>);

      setUserOptions(users);
      setUsersData(userDataMap);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const optionsFilter: OptionsFilter = ({options, search}) => {
    if (!search) {
      return options;
    }

    const filteredOptions = (options as ComboboxItem[]).filter((option) => {
      const searchLower = search.toLowerCase();
      return option.label.toLowerCase().includes(searchLower) || usersData[option.value].tag.toLowerCase().includes(searchLower);
    });

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

  return (
    <Center>
      <Stack align={'center'} p="xl" w="60dvw">
        <Autocomplete
          data={userOptions}
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
              const selectedUser = userOptions.find((user) => user.value === value);
              if (selectedUser) {
                navigate(`/profile/${usersData[value]?.tag}`);
              }
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
