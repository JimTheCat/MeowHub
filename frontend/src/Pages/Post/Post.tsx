import {RichEditor} from "../../Components/RichEditor/RichEditor.tsx";
import {Button, Card, Center, Divider, Group, Title} from "@mantine/core";

export const Post = () => {
  return (
    <Center>
      <Card shadow="sm" padding="lg" mt={"md"} radius="md" w={"fit-content"} withBorder>
        <Title mb={"md"} order={2}>
          Create post
        </Title>
        <RichEditor/>
        <Divider my={"md"}/>
        <Group justify={"space-between"}>
          <Button color="red" variant="light">Cancel</Button>
          <Button color="blue" variant="light">Create</Button>
        </Group>
      </Card>
    </Center>

  );
}