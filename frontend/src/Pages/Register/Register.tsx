import {ContainerVhVw} from "../../Components/ContainerVhVw";
import {
  Box,
  Button,
  Card,
  Center, Checkbox, Divider,
  Grid,
  Group,
  NativeSelect,
  PasswordInput,
  Popover, Progress,
  Text,
  TextInput
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {DatePickerInput} from "@mantine/dates";
import React, {useState} from "react";
import 'dayjs/locale/pl';
import 'dayjs/locale/en';
import {Gender} from "../../Services/Constants";
import {useDisclosure} from "@mantine/hooks";
import {IconCheck, IconX} from "@tabler/icons-react";

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />} <Box ml={10}>{label}</Box>
    </Text>
  );
}



export const Register = () => {

  const {t, i18n} = useTranslation('register');
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | null>(null);
  const [visible, { toggle }] = useDisclosure(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  const requirements = [
    { re: /[0-9]/, label: t('card.password.requirement.number') },
    { re: /[a-z]/, label: t('card.password.requirement.lowercase') },
    { re: /[A-Z]/, label: t('card.password.requirement.uppercase') },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: t('card.password.requirement.special') },
  ];

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(passwordValue)} />
  ));

  const form: any = useForm({
    initialValues: {
      name: '',
      surname: '',
      age: null,
      gender: Gender().at(0),
      email: '',
      repeatEmail: '',
      password: '',
      repeatPassword: '',
      agree: false,
    },

    validate: {
      name: (value) => (/^\S+$/.test(value)? null : t('card.name.invalid')),
      surname: (value) => (/^\S+$/.test(value) ? null : t('card.surname.invalid')),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('card.email.invalid')),
      age: (value) => (calculateAge(value) >= 18 ? null : t('card.age.invalid')),
      password: () => (strength === 100 ? null : t('card.password.invalid')),
      repeatEmail: (value) => (value === form.values.email ? null : t('card.email.notmatch')),
      repeatPassword: (value) => (value === passwordValue ? null : t('card.password.notmatch')),
      agree: (value) => (value ? null : t('card.agree.invalid')),
    },
  });

  function getStrength(password: string) {
    let multiplier = password.length > 7 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  }

  function calculateAge(birthday: any) {
    if (!birthday) return 0;
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }


  const strength = getStrength(passwordValue);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return(
    <ContainerVhVw vh={100} vw={99}>
      <Center h={"inherit"}>
        <Card maw={500} radius={"md"} shadow={"lg"} sx={{position: "inherit"}}> {/*here is login form*/}
          <form onSubmit={form.onSubmit((values: any) => {
            console.log(values);
            navigate('/');
          })}>
            <Grid columns={2}>
              <Grid.Col span={1}>
                <TextInput
                  withAsterisk
                  required
                  label={t('card.name.label')}
                  placeholder={t('card.name.placeholder')}
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <TextInput
                  withAsterisk
                  required
                  label={t('card.surname.label')}
                  placeholder={t('card.surname.placeholder')}
                  {...form.getInputProps('surname')}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <DatePickerInput
                  withAsterisk
                  required
                  value={date}
                  onChange={
                    (value) => {
                      setDate(value);
                      form.setFieldValue('age', value);
                    }
                  }
                  {...form.getInputProps('age')}
                  label={t('card.age.label')}
                  valueFormat={"DD MMMM YYYY"}
                  placeholder={t('card.age.placeholder')}
                  locale={i18n.language}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <NativeSelect
                  withAsterisk
                  required
                  data={Gender()}
                  label={t('card.sex.label')}
                  {...form.getInputProps('gender')}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <TextInput
                  withAsterisk
                  required
                  label={t('card.email.label')}
                  placeholder={t('card.email.placeholder')}
                  {...form.getInputProps('email')}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <TextInput
                  withAsterisk
                  required
                  label={t('card.repeatemail.label')}
                  placeholder={t('card.repeatemail.placeholder')}
                  {...form.getInputProps('repeatEmail')}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
                  <Popover.Target>
                    <div
                      onFocusCapture={() => setPopoverOpened(true)}
                      onBlurCapture={() => setPopoverOpened(false)}
                    >
                      <PasswordInput
                        withAsterisk
                        required
                        visible={visible}
                        onVisibilityChange={toggle}
                        label={t('card.password.label')}
                        placeholder={t('card.password.placeholder')}
                        {...form.getInputProps('password')}
                        onChange={(event) => {
                          setPasswordValue(event.currentTarget.value);
                          form.setFieldValue('password', event.currentTarget.value);
                        }}
                      />
                    </div>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Progress color={color} value={strength} size={5} mb="xs" />
                    <PasswordRequirement label={t('card.password.requirement.length')} meets={passwordValue.length > 7} />
                    {checks}
                  </Popover.Dropdown>
                </Popover>

              </Grid.Col>
              <Grid.Col span={1}>
                <PasswordInput
                  withAsterisk
                  required
                  visible={visible}
                  onVisibilityChange={toggle}
                  label={t('card.repeatpassword.label')}
                  placeholder={t('card.repeatpassword.placeholder')}
                  {...form.getInputProps('repeatPassword')}
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <Checkbox
                  required
                  label={t('card.tos.label')}
                  {...form.getInputProps('agree')}
                />
              </Grid.Col>
            </Grid>
            <Divider mt={"xl"} mb={"xs"} />
            <Group position={"apart"}>
              <Button color={'red'} mt={5} onClick={() => navigate('/')}>{t('card.cancel')}</Button>
              <Button color={'green'} mt={5} type="submit">{t('card.signup')}</Button>
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
      </Center>
    </ContainerVhVw>
  );
}