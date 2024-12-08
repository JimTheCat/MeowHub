import {Box, Button, Card, Divider, getGradient, Group, Stack, Text, TextInput, Title} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import React from "react";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";
import {CenterContainer} from "../../Components/CenterContainer";

export const Recovery = () => {
  const [isSent, setIsSent] = React.useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation('recovery');

  const form: any = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        .test(value) ? null : t('card.isNotSent.email.invalid')),
    }
  });

  return (
    <CenterContainer>
      {!isSent &&
          <Card maw={500} radius={"md"} shadow={"lg"} style={{position: "inherit"}}>
              <form onSubmit={form.onSubmit((values: any) => {
                console.log(values);
                setIsSent(true);
              })}>
                  <Stack gap={"md"} justify={"center"} p={"xl"}>
                      <Title order={2}>{t('card.isNotSent.title')}</Title>
                      <Text size={"sm"}>{t('card.isNotSent.subtext')}</Text>
                      <TextInput
                          placeholder={t('card.isNotSent.email.placeholder')}
                          label={t('card.isNotSent.email.label')}
                          withAsterisk
                          required
                          {...form.getInputProps('email')}
                      />
                      <Divider variant={"solid"}/>
                      <Group justify={"space-between"}>
                          <Button color="red" onClick={() => navigate('/')}>{t('card.isNotSent.button.cancel')}</Button>
                          <Button type="submit" color={'green'}>{t('card.isNotSent.button.submit')}</Button>
                      </Group>
                  </Stack>
              </form>

          </Card>
      }
      {isSent &&
          <Card maw={500} radius={"md"} shadow={"lg"} style={{position: "inherit"}}>
              <Stack gap={"md"} justify={"center"} p={"xl"}>
                  <Title order={2}>{t('card.isSent.title')}</Title>
                  <Text size={"sm"}>{t('card.isSent.subtext')}</Text>
                  <Divider variant={"solid"}/>
                  <Button color={'green'} onClick={() => navigate('/')}>{t('card.isSent.button')}</Button>
              </Stack>
          </Card>
      }
      <Box style={(theme) => ({
        position: 'absolute',
        backgroundImage: getGradient({from: 'hotpink', to: 'cyan', deg: 45}, theme),
        zIndex: -1,
        width: '35%',
        height: '40%',
        top: '0',
        filter: 'blur(500px)',
      })}/>
    </CenterContainer>
  );
}