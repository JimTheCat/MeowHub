import {Box, Button, Card, Center, Divider, Group, Stack, Text, TextInput, Title} from "@mantine/core";
import {ContainerVhVw} from "../../Components/ContainerVhVw";
import {useNavigate} from "react-router-dom";
import React from "react";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";

export const Recovery = () => {
  const [isSent, setIsSent] = React.useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation('recovery');

  const form: any = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('card.isNotSent.email.invalid')),
    }
  });

  return (
      <ContainerVhVw vw={99} vh={100}>
        <Center h={"inherit"}>
          { !isSent &&
            <Card maw={500} radius={"md"} shadow={"lg"} sx={{position: "inherit"}}>
              <form onSubmit={form.onSubmit((values: any) => {
                console.log(values);
                setIsSent(true);
              })}>
                <Stack spacing={"md"} justify={"center"} p={"xl"}>
                  <Title order={2} align={"center"}>{t('card.isNotSent.title')}</Title>
                  <Text size={"sm"} align={"center"}>{t('card.isNotSent.subtext')}</Text>
                  <TextInput
                    placeholder={t('card.isNotSent.email.placeholder')}
                    label={t('card.isNotSent.email.label')}
                    withAsterisk
                    required
                    {...form.getInputProps('email')}
                  />
                  <Divider variant={"solid"}/>
                  <Group position={"apart"}>
                    <Button color="red" onClick={() => navigate('/')}>{t('card.isNotSent.button.cancel')}</Button>
                    <Button type="submit" color={'green'}>{t('card.isNotSent.button.submit')}</Button>
                  </Group>
                </Stack>
              </form>

            </Card>
          }
          { isSent &&
            <Card maw={500} radius={"md"} shadow={"lg"} sx={{position: "inherit"}}>
              <Stack spacing={"md"} justify={"center"} p={"xl"}>
                <Title order={2} align={"center"}>{t('card.isSent.title')}</Title>
                <Text size={"sm"} align={"center"}>{t('card.isSent.subtext')}</Text>
                <Divider variant={"solid"}/>
                <Button color={'green'} onClick={() => navigate('/')}>{t('card.isSent.button')}</Button>
              </Stack>
            </Card>
          }
          <Box sx={(theme) => ({
            position: 'absolute',
            backgroundImage: theme.fn.gradient({from: 'hotpink', to: 'cyan', deg: 45}),
            zIndex: -1,
            width: '35%',
            height: '40%',
            top: '0',
            filter: 'blur(500px)',
          })}/>
        </Center>
      </ContainerVhVw>
  );
}