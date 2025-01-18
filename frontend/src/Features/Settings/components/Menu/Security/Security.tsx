import {Box, Fieldset, TextInput} from "@mantine/core";
import {useTranslation} from "react-i18next";

export const Security = () => {
  const {t} = useTranslation('settings');

  return (
    <Box>
      <Fieldset legend={t('user.security.content.legend')}>
        <TextInput label={t('user.security.content.2fa.label')}
                   placeholder={t('user.security.content.2fa.description')}/>
      </Fieldset>
    </Box>
  );
}