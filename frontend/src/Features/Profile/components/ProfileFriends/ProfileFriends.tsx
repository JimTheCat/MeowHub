import {Avatar, Card, Divider, Grid, Group, Stack, Text, Tooltip, UnstyledButton} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {BasicUserInfo} from "../../../shared/types";

type ProfileFriendsProps = {
  friends: BasicUserInfo[];
}

export const ProfileFriends = (props: ProfileFriendsProps) => {

  const navigate = useNavigate();
  const isNoFriends = props.friends.length === 0;

  return (
    <Card shadow="sm" px="lg" pt={"lg"} radius="md" w={400} withBorder>
      <Group justify={"space-between"}>
        <Text size={"lg"}>Friends</Text>
        {!isNoFriends && (
          <Text size={"sm"} c={'dimmed'}>Total: {props.friends.length}</Text>
        )}
      </Group>

      <Divider my={"sm"}/>

      {isNoFriends &&
          <Stack align={"center"} gap={0} justify={"center"} style={{height: 200}}>
              <Text size={"xl"} c={"dimmed"}>No friends yet</Text>
              <UnstyledButton onClick={() => navigate('/search')}>
                  <Text size={"sm"} c={"blue"}>Find friends</Text>
              </UnstyledButton>
          </Stack>
      }
      <Grid gutter={"xs"} align={"center"}>
        {props.friends.map((friend) => {
          return (
            <Grid.Col key={friend.id} span={3}>
              <Tooltip label={friend.name + " " + friend.surname} position={'top'}>
                <Avatar src={friend.profilePictureUrl} alt={"Photo " + friend.id} size={'xl'}/>
              </Tooltip>
            </Grid.Col>
          );
        })}
      </Grid>

    </Card>
  );
}