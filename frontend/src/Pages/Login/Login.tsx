import {Button, Card, Center, Container, Divider, Group, PasswordInput, Stack, Text, TextInput} from "@mantine/core";
import { ContainerVhVw } from "../../Components/ContainerVhVw";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import {IconAt, IconLock} from "@tabler/icons-react";

export const Login = () => {

  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

    return (
      <>
        <ContainerVhVw vh={100} vw={100}>
          <Center h={"inherit"}>
            <Group align={"center"} spacing={300}>
              <Stack spacing="xs" >
                <Text>MeowHub</Text>
                <Text>Find your meme soulmate!</Text>
              </Stack>
              <Card w={300} radius={"md"} shadow={"md"}> {/*here is login form*/}
                <form onSubmit={form.onSubmit((values: any) => {
                  console.log(values);
                  navigate("/mainpage");
                })}>
                  <Stack spacing="xs" align={"stretch"}>
                    <TextInput
                      withAsterisk
                      label={'Email'}
                      placeholder={'Enter your email'}
                      icon={<IconAt size={"0.8rem"} />}
                      {...form.getInputProps('email')}
                    />
                    <PasswordInput
                      withAsterisk
                      label={'Password'}
                      placeholder={'Enter your password'}
                      icon={<IconLock size={"1rem"} /> }
                      {...form.getInputProps('password')}
                    />
                    <Button mt={5} type="submit">Log in</Button>
                    <Text component={'a'} href={'/'} size={"xs"}>Forgot password?</Text>
                    <Divider my={"xs"}/>
                  </Stack>
                  <Group position={"center"}>
                    <Button color={'green'} mt={5} onClick={() => {navigate("/mainpage")}}>Sign up</Button>
                  </Group>
                </form>
              </Card>
            </Group>
          </Center>
        </ContainerVhVw>
        <Container> {/*here is footer*/}
          <Text>Test it should be below</Text>
        </Container>
      </>
    )
}