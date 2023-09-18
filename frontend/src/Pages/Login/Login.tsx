import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import {ContainerVhVw} from "../../Components/ContainerVhVw";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import {IconAt, IconLock} from "@tabler/icons-react";
import {Languages} from "../../Services/Constants";
import { useTranslation } from "react-i18next";
import {ParticleBg} from "../../Components/ParticleBg";
import {Footer} from "../../Components/Footer";

export const Login = () => {

  const {t, i18n} = useTranslation('login');
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('card.email.invalid')),
    },
  });

  return (
    <>
      <ContainerVhVw vh={100} vw={99}>
        <ParticleBg />
        <Center h={"inherit"}>
          <Group align={"center"} spacing={300}>
            <Stack spacing="xs">
              <Text size={92} fw={400} variant={"gradient"} ff={'Cabin Sketch'} sx={{lineHeight: 1}}
                    gradient={{from: 'hotpink', to: 'aqua', deg: 45}}>{t('title.label')}</Text>
              <Text size={"lg"}>{t('title.sublabel')}</Text>
            </Stack>
            <Box>
              <Card w={300} radius={"md"} shadow={"md"}> {/*here is login form*/}
                <form onSubmit={form.onSubmit((values: any) => {
                  console.log(values);
                  navigate("/mainpage");
                })}>
                  <Stack spacing="xs" align={"stretch"}>
                    <TextInput
                      withAsterisk
                      label={t('card.email.label')}
                      placeholder={t('card.email.placeholder')}
                      icon={<IconAt size={"0.8rem"}/>}
                      {...form.getInputProps('email')}
                    />
                    <PasswordInput
                      withAsterisk
                      label={t('card.password.label')}
                      placeholder={t('card.password.placeholder')}
                      icon={<IconLock size={"1rem"}/>}
                      {...form.getInputProps('password')}
                    />
                    <Button mt={5} type="submit">{t('card.login')}</Button>
                    <Text component={'a'} href={'/passwordrecovery'} size={"xs"}>{t('card.recovery')}</Text>
                    <Divider my={"xs"}/>
                  </Stack>
                  <Group position={"center"}>
                    <Button color={'green'} mt={5} onClick={() => {
                      navigate("/register");
                    }}>{t('card.signup')}</Button>
                  </Group>
                </form>
              </Card>
              <Box sx={(theme) => ({
                position: 'absolute',
                backgroundImage: theme.fn.gradient({from: 'hotpink', to: 'cyan', deg: 45}),
                zIndex: -1,
                width: '35%',
                height: '40%',
                top: '0',
                filter: 'blur(500px)',

              })}/>
            </Box>
          </Group>
        </Center>
      </ContainerVhVw>
      <Footer />
    </>
  )
}