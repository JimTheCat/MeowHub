import {Button, Card, Divider, Fieldset, Group, Stack, Switch, Title} from "@mantine/core";
import {useState} from "react";

export const MatchSettings = () => {
  const [privacyValues, setPrivacyValues] = useState<string[]>();

  return (
    <Stack gap={"md"} h={'100%'} align={'center'} justify={"center"} py={"lg"} px={"xl"}>
      <Card mah={"90vh"} w={'100%'} withBorder>
        {/* Settings */}
        <Title order={2}>Matching Settings</Title>
        <Divider my={"md"}/>

        <Stack gap={"md"}>
          {/* Account settings */}
          <Fieldset legend={'Account'}>
            <Button color={'red'}>Delete account</Button>
          </Fieldset>

          {/* Privacy settings */}
          <Fieldset legend={'Privacy'}>
            <Switch.Group value={privacyValues} onChange={setPrivacyValues}>
              <Group>
                <Switch value={'search'} labelPosition={'left'} label={'Show me in search results'}/>
                <Switch value={'recommendation'} labelPosition={'left'} label={'Show me in recommendations'}/>
                <Switch value={'online'} labelPosition={'left'} label={'Show my online status'}/>
              </Group>
            </Switch.Group>
          </Fieldset>

        </Stack>
      </Card>
    </Stack>
  );
}