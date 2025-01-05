import {
  Autocomplete,
  Button,
  Card,
  Divider,
  Group,
  NativeSelect,
  ScrollArea,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Title
} from "@mantine/core";
import {EditableImage} from "./components/EditableImage/EditableImage.tsx";
import {useCallback, useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {IconGenderBigender} from "@tabler/icons-react";
import {sexualityProfile} from "../../const";

declare global {
  interface Window {
    google: any;
  }
}

export const MatchProfile = () => {
  const [cityQuery, setCityQuery] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const dummyProfileData = {
    name: "Iza",
    age: 23,
    location: "London",
    bio: "Lorem ipsum dolor sit amet.",
    photos: [
      {index: "1", url: "https://picsum.photos/seed/1/800/600"},
      {index: "2", url: "https://picsum.photos/seed/2/800/600"},
    ],
    sexuality: "homosexual",
  };

  const form = useForm({
    initialValues: {
      name: dummyProfileData.name,
      age: dummyProfileData.age,
      location: dummyProfileData.location,
      bio: dummyProfileData.bio,
      sexuality: dummyProfileData.sexuality,
    },
    onValuesChange: (values) => {
      if (values.location) {
        // Set city query to the value of the location input
        setCityQuery(values.location);
        setIsTyping(true);
      }
      setIsChanged(true);
    },
  });

  // Fetch cities from Google Places API
  const fetchCities = useCallback((input: string) => {
    if (!input || !window.google) return;

    const language = localStorage.getItem("language") ?? 'en';
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input,
        types: ["(cities)"],
        language
      },
      (predictions: any[], status: string) => {
        if (status === "OK" && predictions) {
          setCities(predictions.map((p) => p.description));
        } else {
          setCities([]);
        }
      }
    );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isTyping) {
        fetchCities(cityQuery);
        setIsTyping(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [cityQuery, isTyping, fetchCities]);

  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      onReset={(event) => {
        form.onReset(event);
        setIsChanged(false);
      }}
    >
      <Stack gap={"md"} align={"center"} justify={"center"} py={"lg"} px={"xl"}>
        <Card mah={"90vh"} withBorder component={ScrollArea}>
          {/* Images */}
          <Title order={2} mb='md'>Your images</Title>
          <SimpleGrid cols={3} spacing="lg">
            {dummyProfileData.photos.map((photo) => (
              <EditableImage key={photo.index} src={photo.url} alt={"Photo"}/>
            ))}
          </SimpleGrid>

          <Divider my={"md"}/>

          {/* Settings of profile */}
          <Title order={2}>Settings</Title>
          <Stack gap="lg">
            <TextInput
              placeholder="Name"
              label={"Name"}
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <Autocomplete
              data={cities}
              label={"Location"}
              key={form.key("location")}
              {...form.getInputProps("location")}
              placeholder="Start typing a city"
            />
            <Textarea
              placeholder="Bio"
              label={"Bio"}
              key={form.key("bio")}
              {...form.getInputProps("bio")}
            />
            <NativeSelect
              label={'Sexuality'}
              data={sexualityProfile}
              leftSection={<IconGenderBigender/>}
              {...form.getInputProps("sexuality")}
            />
          </Stack>
        </Card>

        {/* Buttons - show them when change is made */}
        {isChanged && (
          <Group justify={"space-between"}>
            <Button type={"reset"} color="red" radius="lg">
              Cancel
            </Button>
            <Button type={"submit"} color="green" radius="lg">
              Save
            </Button>
          </Group>
        )}
      </Stack>
    </form>
  );
};
