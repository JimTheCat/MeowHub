import {Card, Center, Title} from "@mantine/core";

export const Following = () => {
  return (
    <Center>
      <Card shadow="sm" padding="lg" mt={"md"} radius="md" w={"fit-content"} withBorder>
        <Title mb={"md"} order={2}>
          Following
        </Title>

        {/* Here will be the list of followed users after PR-63*/}

      </Card>
    </Center>
  );
}