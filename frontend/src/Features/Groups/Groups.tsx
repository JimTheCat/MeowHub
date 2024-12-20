import {Button, Card, Center, Group, Image, SimpleGrid, Stack, Text, Title} from "@mantine/core";

const groups = [
  {
    name: "Group 1",
    description: "Description of group 1",
    date: "2021-10-10",
    members: 10,
    logo: "https://via.placeholder.com/150",
  },
  {
    name: "Group 2",
    description: "Description of group 2",
    date: "2021-10-11",
    members: 15,
    logo: "https://via.placeholder.com/150",
  },
  {
    name: "Group 3",
    description: "Description of group 3",
    date: "2021-10-12",
    members: 20,
    logo: "https://via.placeholder.com/150",
  },
  {
    name: "Group 4",
    description: "Description of group 4",
    date: "2021-10-13",
    members: 25,
    logo: "https://via.placeholder.com/150",
  },
  {
    name: "Group 5",
    description: "Description of group 5",
    date: "2021-10-14",
    members: 30,
    logo: "https://via.placeholder.com/150",
  },
];

export const Groups = () => {
  return (
    <Center>
      <Card shadow="sm" padding="lg" mt={"md"} radius="md" w={"fit-content"} withBorder>
        <Title mb={"md"} order={2}>
          Groups
        </Title>
        <SimpleGrid cols={2} spacing={"md"}>
          {groups.map((group, index) => (
            <Card key={index} shadow="md" padding="md" mt={"md"} radius="md" withBorder>
              <Group justify={"space-between"}>
                <Group>
                  <Image radius={"sm"} src={group.logo} alt={group.name}/>
                  <Stack gap={0}>
                    <Title order={3}>{group.name}</Title>
                    <Text>{group.description}</Text>
                    <Text>Date of creation: {group.date}</Text>
                    <Text>Members: {group.members}</Text>
                  </Stack>
                </Group>
                <Button color="blue" variant="light">
                  Join
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Card>
    </Center>
  );
}