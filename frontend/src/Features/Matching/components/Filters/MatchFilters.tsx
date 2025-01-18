import {
  Box,
  Button,
  Card,
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
import {useState} from "react";
import {IconEye, IconFriends, IconGenderBigender, IconRulerMeasure} from "@tabler/icons-react";
import {distanceOptions, hereForOptions, sexualityOptions, showMeOptions, sliderMarks} from "../../const";
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";

export const MatchFilters = () => {
  const [isChanged, setIsChanged] = useState(false);
  const {t} = useTranslation('matching');

  const dummyFiltersData = {
    showMe: 'everyone',
    prefferedAge: [18, 40],
    prefferedDistance: 999,
    prefferedSexuality: 'any',
    hereFor: 'anything',
  }

  const form = useForm({
    initialValues: {
      showMe: dummyFiltersData.showMe,
      prefferedAge: dummyFiltersData.prefferedAge,
      prefferedDistance: dummyFiltersData.prefferedDistance,
      prefferedSexuality: dummyFiltersData.prefferedSexuality,
      hereFor: dummyFiltersData.hereFor,
    },
    onValuesChange: () => {
      setIsChanged(true);
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      onReset={(event) => {
        form.onReset(event);
        setIsChanged(false);
      }}
    >
      <Stack gap={"md"} h={'100%'} align={'center'} justify={"center"} py={"lg"} px={"xl"}>
        <Card mah={"90vh"} w={'100%'} withBorder component={ScrollArea}>
          {/* Filters */}
          <Title order={2}>{t('filters.card.title')}</Title>

          <Divider my={"md"}/>

          <Grid gutter={0} grow>
            <Grid.Col span={6} pr={'xs'}>
              <NativeSelect
                label={t('filters.card.options.showMe')}
                data={showMeOptions}
                leftSection={<IconFriends/>}
                {...form.getInputProps("showMe")}
              />
            </Grid.Col>
            <Grid.Col pl={'xs'} span={6}>
              <NativeSelect
                label={t('filters.card.options.sexuality')}
                data={sexualityOptions}
                leftSection={<IconGenderBigender/>}
                {...form.getInputProps("prefferedSexuality")}
              />
            </Grid.Col>
            <Grid.Col span={12} mt={"md"}>
              <Box>
                <Text size={"sm"}>{t('filters.card.options.age')}</Text>
                <RangeSlider
                  mt={'xs'}
                  marks={sliderMarks}
                  max={100}
                  min={16}
                  minRange={1}
                  {...form.getInputProps("prefferedAge")}
                />
              </Box>
            </Grid.Col>
            <Grid.Col span={12} mt={"lg"}>
              <NativeSelect
                label={t('filters.card.options.distance')}
                data={distanceOptions}
                leftSection={<IconRulerMeasure/>}
                {...form.getInputProps("prefferedDistance")}
              />
            </Grid.Col>
            <Grid.Col span={12} mt={"lg"}>
              <NativeSelect
                label={t('filters.card.options.hereFor')}
                data={hereForOptions}
                leftSection={<IconEye/>}
                {...form.getInputProps("hereFor")}
              />
            </Grid.Col>
          </Grid>
        </Card>
        {/* Buttons - show them when change is made */}
        {isChanged && (
          <Group justify={"space-between"}>
            <Button type={"reset"} color="red" radius="lg">
              {t('filters.card.button.cancel.label')}
            </Button>
            <Button type={"submit"} color="green" radius="lg">
              {t('filters.card.button.submit.label')}
            </Button>
          </Group>
        )}
      </Stack>
    </form>
  );
}