import {ActionIcon, Card, Group, Loader, SimpleGrid, Stack, Tooltip} from "@mantine/core";
import {BasicUser} from "../../../shared/components/Cards/BasicUser";
import {BasicUserInfo} from "../../../shared/types";
import {IconCircleCheck, IconXboxX} from "@tabler/icons-react";

type UserGridProps = {
  sentRequests: BasicUserInfo[];
  isLoading: boolean;
  emptyMessage?: string;
  isReceived?: boolean;
  handleAcceptRequest?: (login: string) => void;
  handleCancelRequest?: (login: string) => void;
};

export const UserGrid = (props: UserGridProps) => {

  return (
    <>
      {props.isLoading &&
          <Stack align="center" justify="center">
              <Loader/>
          </Stack>
      }
      {!props.isLoading && props.sentRequests.length === 0 &&
          <Stack py={'lg'} align="center" justify="center">
            {props.emptyMessage}
          </Stack>
      }
      {!props.isLoading && props.sentRequests.length > 0 &&
          <SimpleGrid cols={2} mt={'md'}>
            {props.sentRequests.map((person) => (
              <Card withBorder key={person.id}>
                <Group justify={'space-between'} align={'center'}>
                  <BasicUser user={person} tagVisible avatarSize={'lg'}/>
                  {props.isReceived &&
                      <Group>
                          <Tooltip label={'Cancel request'}>
                              <ActionIcon variant={'subtle'} color={'gray'} size="lg" radius={'lg'} onClick={() => {
                                props.handleCancelRequest && props.handleCancelRequest(person.login);
                              }}>
                                  <IconXboxX stroke={0.8}/>
                              </ActionIcon>
                          </Tooltip>
                          <Tooltip label={'Accept request'}>
                              <ActionIcon variant={'subtle'} color={'gray'} size="lg" radius={'lg'} onClick={() => {
                                props.handleAcceptRequest && props.handleAcceptRequest(person.login);
                              }}>
                                  <IconCircleCheck stroke={0.8}/>
                              </ActionIcon>
                          </Tooltip>
                      </Group>
                  }
                </Group>
              </Card>
            ))}
          </SimpleGrid>
      }
    </>
  );
}