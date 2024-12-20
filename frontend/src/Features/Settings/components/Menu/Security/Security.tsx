import {Box, Fieldset, TextInput} from "@mantine/core";

export const Security = () => {
  return (
    <Box>
      <Fieldset legend="2FA">
        <TextInput label="2FA code" placeholder="2FA code"/>
      </Fieldset>
    </Box>
  );
}