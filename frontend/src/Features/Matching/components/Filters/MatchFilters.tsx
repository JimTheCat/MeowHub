import {Card, Divider, Grid, ScrollArea, Select, Stack, Title} from "@mantine/core";
import {useState} from "react";

export const MatchFilters = () => {
  const [range, setRange] = useState<{ from: string | number, to: string | number }>({from: 16, to: 50});

  const showMeOptions = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Everyone',
      value: 'everyone',
    },
  ]

  return (
    <Stack gap={"md"} justify={"center"} py={"lg"} px={"xl"}>
      <Card mah={"90vh"} w={'100%'} withBorder component={ScrollArea}>
        {/* Filters */}
        <Title order={2}>Filters</Title>

        <Divider my={"md"}/>

        <Grid gutter={0}>
          <Grid.Col span={12}>
            <Select label={'Show me'} placeholder={'Select'} data={showMeOptions}/>
          </Grid.Col>
          <Grid.Col span={12}>

          </Grid.Col>
        </Grid>
      </Card>
    </Stack>
  );
}