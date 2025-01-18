import {Button, Card, Divider, Fieldset, Group, Stack, Switch, Title} from "@mantine/core";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export const MatchSettings = () => {
  const [privacyValues, setPrivacyValues] = useState<string[]>();
  const {t} = useTranslation('matching');

  return (
    <Stack gap={"md"} h={'100%'} align={'center'} justify={"center"} py={"lg"} px={"xl"}>
      <Card mah={"90vh"} w={'100%'} withBorder>
        {/* Settings */}
        <Title order={2}>{t('settings.card.title')}</Title>
        <Divider my={"md"}/>

        <Stack gap={"md"}>
          {/* Account settings */}
          <Fieldset legend={t('settings.card.account.fieldset')}>
            <Button color={'red'}>{t('settings.card.account.button.delete.label')}</Button>
          </Fieldset>

          {/* Privacy settings */}
          <Fieldset legend={t('settings.card.privacy.fieldset')}>
            <Switch.Group value={privacyValues} onChange={setPrivacyValues}>
              <Group>
                <Switch value={'search'} labelPosition={'left'} label={t('settings.card.privacy.switch.search')}/>
                <Switch value={'recommendation'} labelPosition={'left'}
                        label={t('settings.card.privacy.switch.recommendation')}/>
                <Switch value={'online'} labelPosition={'left'} label={t('settings.card.privacy.switch.online')}/>
              </Group>
            </Switch.Group>
          </Fieldset>

        </Stack>
      </Card>
    </Stack>
  );
}