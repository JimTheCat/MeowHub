import {Box, Button, Fieldset, Tooltip} from "@mantine/core";
import {useTranslation} from "react-i18next";

export const Data = () => {
  const {t} = useTranslation('settings');

  return (
    <Box>
      <Fieldset legend={t('user.personalization.content.legend')}>
        <Tooltip label={t('user.personalization.content.data.tooltip')}>
          <Button variant="outline" color="blue">{t('user.personalization.content.data.children')}</Button>
        </Tooltip>
      </Fieldset>
    </Box>
  );
}