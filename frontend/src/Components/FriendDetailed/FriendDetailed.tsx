import {Avatar, Card, Group, Stack, Text} from "@mantine/core";
import {useNavigate} from "react-router-dom";

export const FriendDetailed = (props: { friend: any }) => {

  const navigate = useNavigate();

  return (
    <Card
      p="lg"
      withBorder
      shadow={"lg"}
      onClick={() => navigate(`/profile/${props.friend.tag}`)}
      style={{cursor: "pointer"}}
    >
      {/*Friend detailed view*/}
      <Group justify="space-between">
        <Avatar src={props.friend.avatar} size={"lg"} radius={180}/>
        <Stack gap={0}>
          <Text>{props.friend.name}</Text>
          <Text>{props.friend.tag}</Text>
        </Stack>
      </Group>
    </Card>
  );
}