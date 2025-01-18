import {Box, Fieldset, NativeSelect} from "@mantine/core";
import {useTranslation} from "react-i18next";

export const Privacy = () => {
  const {t} = useTranslation('settings');

  const data = [
    t('user.privacy.content.data.everyone'),
    t('user.privacy.content.data.onlyFriends'),
    t('user.privacy.content.data.nobody')
  ];

  return (
    <Box>
      <Fieldset legend={t('user.privacy.content.legend')}>
        {/* Privacy settings */}
        <NativeSelect label={t('user.privacy.content.profile.label')} data={data}/>
        <NativeSelect label={t('user.privacy.content.posts.label')} data={data} mt={"md"}/>
        <NativeSelect label={t('user.privacy.content.friends.label')} data={data} mt={"md"}/>
      </Fieldset>
    </Box>
  );
}