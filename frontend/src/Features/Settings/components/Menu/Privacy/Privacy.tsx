import {Box, Button, Fieldset, Group, LoadingOverlay, NativeSelect, Stack} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import api from "../../../../shared/services/api.ts";
import {useForm} from "@mantine/form";
import {useAlert} from "../../../../../Providers/AlertProvider.tsx";

type PrivacyProps = {
  profilePrivacy: string;
  postPrivacy: string;
  friendsPrivacy: string;
};

export const Privacy = () => {
  const {t} = useTranslation("settings");
  const [privacy, setPrivacy] = useState<PrivacyProps | null>(null);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const data = [
    {label: t("user.privacy.content.data.everyone"), value: "PUBLIC"},
    {label: t("user.privacy.content.data.friends"), value: "FRIENDS_ONLY"},
    {label: t("user.privacy.content.data.nobody"), value: "PRIVATE"},
  ];

  const form = useForm({
    initialValues: {
      profilePrivacy: "PUBLIC",
      postPrivacy: "PUBLIC",
      friendsPrivacy: "PUBLIC",
    },
    onValuesChange: () => {
      setIsChanged(true);
    },
  });

  const handleSubmit = async (values: PrivacyProps) => {
    setIsLoading(true);

    try {
      await Promise.all([
        api.post("/api/settings/post-privacy", null, {params: {privacySettings: values.postPrivacy}}),
        api.post("/api/settings/profile-privacy", null, {params: {privacySettings: values.profilePrivacy}}),
        api.post("/api/settings/friends-privacy", null, {params: {privacySettings: values.friendsPrivacy}}),
      ]);

      alert.showError({
        title: t("user.privacy.content.alert.title"),
        message: t("user.privacy.content.alert.message"),
        level: "INFO",
        timestamp: new Date().toISOString(),
      });

      setIsChanged(false);
    } catch (error) {
      console.error("Błąd zapisu ustawień prywatności:", error);
      alert.showError({
        title: t("user.privacy.content.alert.errorTitle"),
        message: t("user.privacy.content.alert.errorMessage"),
        level: "ERROR",
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await api.get("/api/settings/privacy");

        if (response.status === 200) {
          setPrivacy(response.data);
          form.initialize(response.data);
        }
      } catch (error) {
        console.error("Błąd ładowania ustawień prywatności:", error);
        alert.showError({
          title: t("user.privacy.content.alert.errorTitle"),
          message: t("user.privacy.content.alert.errorMessage"),
          level: "ERROR",
          timestamp: new Date().toISOString(),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (privacy) {
      form.setValues({
        profilePrivacy: privacy.profilePrivacy,
        postPrivacy: privacy.postPrivacy,
        friendsPrivacy: privacy.friendsPrivacy,
      });
      setIsChanged(false);
    }
  }, [privacy]);

  return (
    <Box pos={"relative"}>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>

      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
        onReset={(event) => {
          event.preventDefault();
          form.onReset(event);
          setIsChanged(false);
        }}
      >
        <Stack>
          <Fieldset legend={t("user.privacy.content.legend")}>
            <NativeSelect label={t("user.privacy.content.profile.label")}
                          data={data} {...form.getInputProps("profilePrivacy")} />
            <NativeSelect label={t("user.privacy.content.posts.label")} data={data}
                          mt={"md"} {...form.getInputProps("postPrivacy")} />
            <NativeSelect label={t("user.privacy.content.friends.label")} data={data}
                          mt={"md"} {...form.getInputProps("friendsPrivacy")} />
          </Fieldset>
          {isChanged && (
            <Group justify={"space-around"}>
              <Button type={"reset"} color={"red"}>
                {t("user.privacy.content.cancel")}
              </Button>
              <Button type={"submit"}>{t("user.privacy.content.save")}</Button>
            </Group>
          )}
        </Stack>
      </form>
    </Box>
  );
};
