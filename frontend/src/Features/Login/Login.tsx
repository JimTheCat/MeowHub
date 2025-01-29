import {Box, Button, Card, Divider, Group, PasswordInput, Stack, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import {IconAt, IconLock} from "@tabler/icons-react";
import {useTranslation} from "react-i18next";
import {ParticleBg} from "./components/ParticleBg";
import {Footer} from "./components/Footer";
import {BluredGradient} from "../shared/components/BluredGradient";
import {useAuthStore} from "../shared/services/authStore.ts";
import api from "../shared/services/api.ts";
import {CenterContainer} from "../shared/components/CenterContainer";

export const Login = () => {

  const auth = useAuthStore();
  const {t} = useTranslation('login');
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      login: '',
      password: '',
    },

    validate: {
      login: (value) => {
        if (!value.includes("@")) return null;

        // If "@" is present, validate as email
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : t('card.email.invalid');
      },
    },
  });

  // use Axios to send login request
  const sendLoginRequest = async (login: string, password: string) => {
    return await api.post('/api/auth/public/sign-in', {
      login: login,
      password: password
    });
  }

  return (
    <>
      <CenterContainer>
        <Box style={{zIndex: -1}}>
          <ParticleBg/>
        </Box>
        <Group justify={"center"} align={"center"} gap={'300'}>
          <Stack gap="xs">
            <Text size={'92'} fw={400} variant={"gradient"} ff={'Cabin Sketch'} style={{lineHeight: 1}}
                  gradient={{from: 'hotpink', to: 'aqua', deg: 45}}>{t('title.label')}</Text>
            <Text size={"lg"}>{t('title.sublabel')}</Text>
          </Stack>
          <Box>
            <Card w={300} radius={"md"} shadow={"md"}> {/*here is login form*/}
              <form onSubmit={form.onSubmit((values: any) => {
                console.log(values);
                sendLoginRequest(values.login, values.password).then((value) => {
                  console.log(value);

                  if (value.status !== 200) return;

                  auth.login(value.data);
                  navigate("/mainpage");
                });
              })}>
                <Stack gap="xs" align={"stretch"}>
                  <TextInput
                    withAsterisk
                    label={t('card.email.label')}
                    placeholder={t('card.email.placeholder')}
                    leftSection={<IconAt size={"1rem"}/>}
                    {...form.getInputProps('login')}
                  />
                  <PasswordInput
                    withAsterisk
                    label={t('card.password.label')}
                    placeholder={t('card.password.placeholder')}
                    leftSection={<IconLock size={"1rem"}/>}
                    {...form.getInputProps('password')}
                  />
                  <Button mt={5} type="submit">{t('card.login')}</Button>
                  <Text onClick={() => navigate('/passwordrecovery')} style={{cursor: 'pointer'}}
                        size={"xs"}>{t('card.recovery')}</Text>
                  <Divider my={"xs"}/>
                </Stack>
                <Group justify={"center"}>
                  <Button color={'green'} mt={5} onClick={() => {
                    navigate("/register");
                  }}>{t('card.signup')}</Button>
                </Group>
              </form>
            </Card>
            <BluredGradient/>
          </Box>
        </Group>
      </CenterContainer>
      <Footer/>
    </>
  )
}