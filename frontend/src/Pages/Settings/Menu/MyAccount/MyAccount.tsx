import {Box, Fieldset, TextInput} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";

export const MyAccount = () => {
  return (
    <Box>
      <Fieldset legend="Personal information">
        <TextInput label="Name" placeholder="Your name"/>
        <TextInput label="Surname" placeholder="Your surname" mt="md"/>
        <TextInput label="Tag" placeholder="@your_tag" mt="md"/>
        <TextInput label="Email" placeholder="Email" mt="md"/>
        <DatePickerInput label="Date of birth" placeholder="Date of birth" mt="md"/>
      </Fieldset>

      <Fieldset legend="Change password" mt="lg">
        <TextInput label="Old password" type="password" placeholder="Old password"/>
        <TextInput label="New password" type="password" placeholder="New password" mt="md"/>
        <TextInput label="Repeat new password" type="password" placeholder="Repeat new password" mt="md"/>
      </Fieldset>

    </Box>
  );
}