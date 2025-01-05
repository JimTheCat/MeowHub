import {Card, Loader, SimpleGrid, Stack} from "@mantine/core";
import {BasicUser} from "../../../shared/components/Cards/BasicUser";
import {BasicUserInfo} from "../../../shared/types";

type UserGridProps = {
  sentRequests: BasicUserInfo[];
  isLoading: boolean;
  emptyMessage?: string;
};

export const UserGrid = ({sentRequests, isLoading, emptyMessage}: UserGridProps) => {
  return (
    <>
      {isLoading &&
          <Stack align="center" justify="center">
              <Loader/>
          </Stack>
      }
      {!isLoading && sentRequests.length === 0 &&
          <Stack py={'lg'} align="center" justify="center">
            {emptyMessage}
          </Stack>
      }
      {!isLoading && sentRequests.length > 0 &&
          <SimpleGrid cols={2} mt={'md'}>
            {sentRequests.map((person) => (
              <Card withBorder key={person.id}>
                <BasicUser user={person} tagVisible avatarSize={'lg'}/>
              </Card>
            ))}
          </SimpleGrid>
      }
    </>
  );
}