import {Button, Card, Divider, Grid, ScrollArea, Stack, Text, Title} from "@mantine/core";
import {useNavigate} from "react-router-dom";

export const MatchTests = () => {
  const navigate = useNavigate();
  const dummyTestsData = [
    {
      testId: 1,
      title: "Test 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat",
      isCompleted: true,
    },
    {
      testId: 2,
      title: "Test 2",
      description: "Lorem ipsum dolor sit amet",
      isCompleted: false,
    },
    {
      testId: 3,
      title: "Test 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum bibendum dui scelerisque tempor. Proin condimentum a mauris in auctor. Aenean vehicula metus in vestibulum varius. Curabitur sed nisl luctus, interdum ex et, blandit neque. Donec iaculis sapien sed mi pulvinar mattis. Suspendisse non metus orci. Nunc in nunc nec libero finibus rhoncus. Vivamus nec lorem eu nibh imperdiet congue.",
      isCompleted: false,
    }
  ]

  return (
    <Stack gap={"md"} h={'100%'} align={'center'} justify={"center"} py={"lg"} px={"xl"}>
      <Card mah={"90vh"} w={'100%'} withBorder component={ScrollArea}>
        {/* Tests */}
        <Title order={2}>Tests</Title>
        <Divider my={"md"}/>

        <Stack gap={'md'}>
          {dummyTestsData.map((test) => (
            <Card key={test.testId} withBorder>
              <Grid justify={'center'} align={'center'}>
                <Grid.Col span={10}>
                  <Stack gap={"md"} p={"md"}>
                    <Title order={3}>{test.title}</Title>
                    <Text>{test.description}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Stack gap={5} justify={'center'} align={'center'}>
                    {test.isCompleted &&
                        <>
                            <Button color={'green'}>Retake test</Button>
                            <Text style={{cursor: "pointer"}} size={'xs'} onClick={() => navigate('')}>View
                                results</Text>
                        </>
                    }
                    {!test.isCompleted &&
                        <Button color={'blue'}>Start test</Button>
                    }
                  </Stack>

                </Grid.Col>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Card>
    </Stack>
  );
}