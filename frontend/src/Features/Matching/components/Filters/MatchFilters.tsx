import {
  Box,
  Button,
  Card,
  ComboboxData,
  Divider,
  Grid,
  Group,
  NativeSelect,
  RangeSlider,
  ScrollArea,
  Stack,
  Text,
  Title
} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconEye, IconFriends} from "@tabler/icons-react";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";
import {Gender, LookingFor} from "../Profile/consts";
import {useMatchingStore} from "../../services/matchingStore.ts";
import {useAlert} from "../../../../Providers/AlertProvider.tsx";
import api from "../../../shared/services/api.ts";
import {sliderMarks} from "../../const";

export const MatchFilters = () => {
  const {preferences, fetchPreferences, isPreferencesLoading} = useMatchingStore();
  const [isChanged, setIsChanged] = useState(false);
  const {t} = useTranslation('matching');
  const alert = useAlert();

  const initialValues = {
    gender: 'MALE',
    ageFrom: 18,
    ageTo: 40,
    heightFrom: 150,
    heightTo: 190,
    lookingFor: 'ANYTHING'
  };

  const form = useForm({
    initialValues,
    onValuesChange: () => setIsChanged(true),
  });

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        await fetchPreferences();
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    };
    loadPreferences();
  }, []);

  useEffect(() => {
    if (preferences) {
      form.setValues({
        gender: preferences.gender ?? initialValues.gender,
        ageFrom: preferences.ageFrom ?? initialValues.ageFrom,
        ageTo: preferences.ageTo ?? initialValues.ageTo,
        heightFrom: preferences.heightFrom ?? initialValues.heightFrom,
        heightTo: preferences.heightTo ?? initialValues.heightTo,
        lookingFor: preferences.lookingFor ?? initialValues.lookingFor
      });
      setIsChanged(false);
    }
  }, [preferences]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await api.post("/api/matching-profile/preferences", values);
      await fetchPreferences();
      alert.showError({
        title: t('filters.alert.success.title'),
        message: t('filters.alert.success.message'),
        level: "INFO",
        timestamp: new Date().toISOString(),
      });
      setIsChanged(false);
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  const handleReset = () => {
    if (preferences) {
      form.setValues({
        gender: preferences.gender,
        ageFrom: preferences.ageFrom,
        ageTo: preferences.ageTo,
        heightFrom: preferences.heightFrom,
        heightTo: preferences.heightTo,
        lookingFor: preferences.lookingFor
      });
    }
    setIsChanged(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md" h="100%" align="center" justify="center" py="lg" px="xl">
        <Card mah="90vh" w="100%" withBorder component={ScrollArea}>
          <Title order={2}>{t('filters.card.title')}</Title>
          <Divider my="md"/>

          <Grid gutter="md" mx="8px">
            <Grid.Col span={6}>
              <NativeSelect
                label={t('filters.card.options.gender')}
                data={Gender() as ComboboxData}
                leftSection={<IconFriends size={18}/>}
                {...form.getInputProps("gender")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <NativeSelect
                label={t('filters.card.options.lookingFor')}
                data={LookingFor() as ComboboxData}
                leftSection={<IconEye size={18}/>}
                {...form.getInputProps("lookingFor")}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Box>
                <Text size="sm" mb={5}>
                  {t('filters.card.options.ageRange')}
                </Text>
                <RangeSlider
                  min={16}
                  max={100}
                  minRange={2}
                  marks={sliderMarks}
                  value={[form.values.ageFrom, form.values.ageTo]}
                  onChange={([from, to]) => {
                    form.setFieldValue('ageFrom', from);
                    form.setFieldValue('ageTo', to);
                  }}
                />
                <Group justify="space-between" mt="xs">
                  <Text size="sm">{form.values.ageFrom}</Text>
                  <Text size="sm">{form.values.ageTo}</Text>
                </Group>
              </Box>
            </Grid.Col>

            <Grid.Col span={12} mt="md">
              <Box>
                <Text size="sm" mb={5}>
                  {t('filters.card.options.heightRange')}
                </Text>
                <RangeSlider
                  min={120}
                  max={300}
                  minRange={10}
                  value={[form.values.heightFrom, form.values.heightTo]}
                  onChange={([from, to]) => {
                    form.setFieldValue('heightFrom', from);
                    form.setFieldValue('heightTo', to);
                  }}
                />
                <Group justify="space-between" mt="xs">
                  <Text size="sm">{form.values.heightFrom} cm</Text>
                  <Text size="sm">{form.values.heightTo} cm</Text>
                </Group>
              </Box>
            </Grid.Col>
          </Grid>
        </Card>

        {isChanged && (
          <Group justify="space-around" w="100%">
            <Button
              type="button"
              color="red"
              radius="lg"
              onClick={handleReset}
              loading={isPreferencesLoading}
            >
              {t('filters.card.button.cancel.label')}
            </Button>
            <Button
              type="submit"
              color="green"
              radius="lg"
              loading={isPreferencesLoading}
            >
              {t('filters.card.button.submit.label')}
            </Button>
          </Group>
        )}
      </Stack>
    </form>
  );
};