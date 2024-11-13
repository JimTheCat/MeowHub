import {Card, Grid, Group, Image, Text, UnstyledButton} from "@mantine/core";
import {DummyFriendsType} from "../../../Services/Constants/DummyUser.tsx";

export const ProfileFriends = (props: { friends: DummyFriendsType }) => {

  const handleButtonClick = (event) => {
    event.preventDefault();

    window.open(event.target.href, '_blank', 'noopener,noreferrer');
  }

  return (
    <Card shadow="sm" px="lg" pt={"lg"} radius="md" w={400} withBorder>
      <Group justify={"space-between"} mb={15}>
        <Text size={"lg"}>Friends</Text>
        <UnstyledButton component="a" href="https://www.google.com" onClick={handleButtonClick} c="dimmed">Wyświetl
          wszystko</UnstyledButton>
      </Group>

      <Grid gutter={"xs"} align={"center"}>
        {props.friends.friendsDetails!.map((friend, index) => {
          return (
            <Grid.Col span={4}>
              <Image key={index} src={friend.profilePicture} alt={"Photo " + index} w={"auto"} h={100} radius={180}
                     fit={"contain"}/>
            </Grid.Col>
          );
        })}
      </Grid>

    </Card>
  );
}