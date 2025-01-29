import {AppShell, Button, Card, Center, Loader, Stack, Switch, Text} from "@mantine/core";
import {Aside} from "./components/Aside";
import React, {useEffect, useState} from "react";
import {Main} from "./components/Main";
import {useNavigate} from "react-router-dom";
import {useMatchingStore} from "./services/matchingStore.ts";
import {useTranslation} from "react-i18next";

type MatchingProps = {
  component?: React.ReactNode;
}

export const Matching = (props: MatchingProps) => {
  const [switchButton, setSwitchButton] = useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation('matching')
  const {profile, fetchProfile, isLoading} = useMatchingStore();

  useEffect(() => {
    const checkProfile = async () => {
      await fetchProfile();
    };

    checkProfile().then(r => r);
  }, []);

  if (isLoading) {
    // Loading state
    return (
      <Center h={'100vh'}>
        <Loader/>
      </Center>
    );
  }

  if (!isLoading && !profile) {
    // No profile case
    return (
      <Center h={'100vh'}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text size="xl" fw={700} mb="md">
            {t('main.noProfile.title')}
          </Text>
          <Text mb="lg">
            {t('main.noProfile.description')}
          </Text>
          <Stack>
            <Switch
              label={t('main.noProfile.switch.label')}
              checked={switchButton}
              onChange={() => setSwitchButton(!switchButton)}
            />
            <Button
              onClick={() => {
                navigate(`create-profile?useMeowHubData=${switchButton}`)
              }}
            >
              {t('main.noProfile.button.label')}
            </Button>
          </Stack>
        </Card>
      </Center>
    );
  }

  return (
    <AppShell
      aside={{
        breakpoint: 0,
        width: 300
      }}
    >
      <AppShell.Aside withBorder={false}>
        <Aside/>
      </AppShell.Aside>
      <AppShell.Main p={0}>
        {props.component ? props.component : <Main/>}
      </AppShell.Main>
    </AppShell>
  );
}