import {Fieldset, rem, Switch, useMantineTheme} from "@mantine/core";
import {useState} from "react";
import {IconCheck, IconX} from "@tabler/icons-react";
import {useTranslation} from "react-i18next";

export const Notifications = () => {
  const {t} = useTranslation('settings');
  const theme = useMantineTheme();
  const [emailChecked, setEmailChecked] = useState(false);
  const [pushChecked, setPushChecked] = useState(false);

  return (
    <Fieldset legend={t('user.notifications.content.legend')}>
      {/* Notification settings */}
      <Switch
        checked={emailChecked}
        onChange={(event) => setEmailChecked(event.currentTarget.checked)}
        color="teal"
        labelPosition={"left"}
        size="md"
        label={t('user.notifications.content.email.label')}
        thumbIcon={
          emailChecked ? (
            <IconCheck
              style={{width: rem(12), height: rem(12)}}
              color={theme.colors.teal[6]}
              stroke={3}
            />
          ) : (
            <IconX
              style={{width: rem(12), height: rem(12)}}
              color={theme.colors.red[6]}
              stroke={3}
            />
          )
        }
      />

      <Switch
        mt={"md"}
        checked={pushChecked}
        onChange={(event) => setPushChecked(event.currentTarget.checked)}
        color="teal"
        labelPosition={"left"}
        size="md"
        label={t('user.notifications.content.push.label')}
        thumbIcon={
          pushChecked ? (
            <IconCheck
              style={{width: rem(12), height: rem(12)}}
              color={theme.colors.teal[6]}
              stroke={3}
            />
          ) : (
            <IconX
              style={{width: rem(12), height: rem(12)}}
              color={theme.colors.red[6]}
              stroke={3}
            />
          )
        }
      />
    </Fieldset>
  );
}