import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  LoadingOverlay,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";
import {CenterContainer} from "../shared/components/CenterContainer";
import api from "../shared/services/api.ts";
import {useAlert} from "../../Providers/AlertProvider.tsx";
import {useDisclosure} from "@mantine/hooks";
import {BluredGradient} from "../shared/components/BluredGradient";

export const Recovery = () => {
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation('recovery');
  const alert = useAlert();
  const [searchParams] = useSearchParams();
  const [visible, {open, close}] = useDisclosure(false);

  // Check if token exists in query params
  const token = searchParams.get('token');

  const form: any = useForm({
    initialValues: token
      ? {password: '', confirmPassword: ''}
      : {login: ''},

    validate: token
      ? {
        password: (value: string | any[]) => (value.length < 8 ? t('card.validation.password') : null),
        confirmPassword: (value: any, values: { password: any; }) =>
          value !== values.password ? t('card.validation.confirmPassword') : null,
      }
      : {},
  });

  const handleSendRequest = async (login: string) => {
    try {
      open(); // Explicitly show the loading overlay
      const response = await api.post('/api/auth/public/reset-password-send-mail', null, {params: {login}});

      if (response.status === 200) {
        setIsSent(true);
        alert.showError({
          title: t('card.isSent.alert.title'),
          message: t('card.isSent.alert.message'),
          level: "INFO",
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error sending request:', error);
      // Handle error if needed
    } finally {
      close(); // Explicitly hide the loading overlay
    }
  };

  const handleResetPassword = async (password: string) => {
    await api.post('/api/auth/public/reset-password', null, {params: {token, newPassword: password}}).then(
      (r) => {
        if (r.status === 200) {
          alert.showError({
            title: t('card.resetSuccess.alert.title'),
            message: t('card.resetSuccess.alert.message'),
            level: "INFO",
            timestamp: new Date().toISOString(),
          });
          navigate('/');
        }
      }
    );
  };

  return (
    <CenterContainer>
      {!token && !isSent && (
        <Card maw={500} radius={"md"} shadow={"lg"} style={{position: "inherit"}}>
          <form
            onSubmit={form.onSubmit((values: any) => {
              handleSendRequest(values.login).then(r => r);
            })}
          >
            <Box pos={"relative"}>
              <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>
              <Stack gap={"md"} justify={"center"} p={"xl"}>
                <Title order={2}>{t('card.isNotSent.title')}</Title>
                <Text size={"sm"}>{t('card.isNotSent.subtext')}</Text>
                <TextInput
                  placeholder={t('card.isNotSent.login.placeholder')}
                  label={t('card.isNotSent.login.label')}
                  withAsterisk
                  required
                  {...form.getInputProps('login')}
                />
                <Divider variant={"solid"}/>
                <Group justify={"space-between"}>
                  <Button color="red" onClick={() => navigate('/')}>{t('card.isNotSent.button.cancel')}</Button>
                  <Button type="submit" color={'green'}>{t('card.isNotSent.button.submit')}</Button>
                </Group>
              </Stack>
            </Box>
          </form>
        </Card>
      )}

      {!token && isSent && (
        <Card maw={500} radius={"md"} shadow={"lg"} style={{position: "inherit"}}>
          <Stack gap={"md"} justify={"center"} p={"xl"}>
            <Title order={2}>{t('card.isSent.title')}</Title>
            <Text size={"sm"}>{t('card.isSent.subtext')}</Text>
            <Divider variant={"solid"}/>
            <Button color={'green'} onClick={() => navigate('/')}>{t('card.isSent.button')}</Button>
          </Stack>
        </Card>
      )}

      {token && (
        <Card maw={500} radius={"md"} shadow={"lg"} style={{position: "inherit"}}>
          <form
            onSubmit={form.onSubmit((values: any) => {
              handleResetPassword(values.password).then(r => r);
            })}
          >
            <Stack gap={"md"} justify={"center"} p={"xl"}>
              <Title order={2}>{t('card.resetPassword.title')}</Title>
              <PasswordInput
                placeholder={t('card.resetPassword.password.placeholder')}
                label={t('card.resetPassword.password.label')}
                withAsterisk
                required
                {...form.getInputProps('password')}
              />
              <PasswordInput
                placeholder={t('card.resetPassword.confirmPassword.placeholder')}
                label={t('card.resetPassword.confirmPassword.label')}
                withAsterisk
                required
                {...form.getInputProps('confirmPassword')}
              />
              <Divider variant={"solid"}/>
              <Group justify={"space-between"}>
                <Button color="red" onClick={() => navigate('/')}>{t('card.resetPassword.button.cancel')}</Button>
                <Button type="submit" color={'green'}>{t('card.resetPassword.button.submit')}</Button>
              </Group>
            </Stack>
          </form>
        </Card>
      )}

      <BluredGradient
        blur={500}
        deg={45}
        fromColor={'hotpink'}
        toColor={'cyan'}
      />
    </CenterContainer>
  );
};
