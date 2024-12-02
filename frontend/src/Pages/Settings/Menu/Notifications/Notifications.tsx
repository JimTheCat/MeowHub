import {Fieldset, rem, Switch, useMantineTheme} from "@mantine/core";
import {useState} from "react";
import {IconCheck, IconX} from "@tabler/icons-react";

export const Notifications = () => {
  const theme = useMantineTheme();
  const [emailChecked, setEmailChecked] = useState(false);
  const [pushChecked, setPushChecked] = useState(false);

  return (
    <Fieldset legend="Notifications">
      {/* Notification settings */}
      <Switch
        checked={emailChecked}
        onChange={(event) => setEmailChecked(event.currentTarget.checked)}
        color="teal"
        labelPosition={"left"}
        size="md"
        label="Email notifications"
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
        label="Push notifications"
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