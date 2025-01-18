import {Box, Fieldset, TextInput} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";
import {useTranslation} from "react-i18next";

export const MyAccount = () => {
  const {t} = useTranslation('settings');

  return (
    <Box>
      <Fieldset legend={t('user.account.content.personal.legend')}>
        <TextInput label={t('user.account.content.personal.name.label')}
                   placeholder={t('user.account.content.personal.name.placeholder')}/>
        <TextInput label={t('user.account.content.personal.surname.label')}
                   placeholder={t('user.account.content.personal.surname.placeholder')} mt="md"/>
        <TextInput label={t('user.account.content.personal.tag.label')}
                   placeholder={t('user.account.content.personal.tag.placeholder')} mt="md"/>
        <TextInput label={t('user.account.content.personal.email.label')}
                   placeholder={t('user.account.content.personal.email.placeholder')} mt="md"/>
        <DatePickerInput label={t('user.account.content.personal.birthdate.label')}
                         placeholder={t('user.account.content.personal.birthdate.placeholder')} mt="md"/>
      </Fieldset>

      <Fieldset legend={t('user.account.content.password.legend')} mt="lg">
        <TextInput label={t('user.account.content.password.current.label')} type="password"
                   placeholder={t('user.account.content.password.current.placeholder')}/>
        <TextInput label={t('user.account.content.password.new.label')} type="password"
                   placeholder={t('user.account.content.password.new.placeholder')} mt="md"/>
        <TextInput label={t('user.account.content.password.repeat.label')} type="password"
                   placeholder={t('user.account.content.password.repeat.placeholder')} mt="md"/>
      </Fieldset>

    </Box>
  );
}