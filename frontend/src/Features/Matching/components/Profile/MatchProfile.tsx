import {
  Autocomplete,
  Button,
  Card,
  Divider,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Title
} from "@mantine/core";
import {EditableImage} from "./components/EditableImage/EditableImage.tsx";
import {useState} from "react";
import {useForm} from "@mantine/form";
import axios from "axios";

type City = {
  label: string;
  value: string;
};

export const MatchProfile = () => {
  const [cities, setCities] = useState<City[]>([]);
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
  };

  const form = useForm({
    initialValues: {
      name: dummyProfileData.name,
      age: dummyProfileData.age,
      location: dummyProfileData.location,
      bio: dummyProfileData.bio,
    },
    onValuesChange: () => {
      setIsChanged(true);
    },
  });

  // Funkcja do pobrania danych miast
  const fetchCities = async (latitude: number, longitude: number) => {
    const apiKey = '4b114eb519c94e9aa1294d2a7b20966c';  // Twój klucz API
    const language = localStorage.getItem('language') || 'en';  // Pobierz preferencję językową z localStorage

    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=${language}`
      );

      const data = response.data.results;
      const citiesList = data.map((result: any) => {
        const city = result.components.city || result.components.town || result.components.village;
        return {
          label: city, // label zależy od języka w API
          value: result.components.city || result.components.town || result.components.village || city,
        };
      });

      setCities(citiesList);
    } catch (err) {
      console.error(err);
    }
  };

  const sendGeoLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          fetchCities(latitude, longitude);
        },
        () => {
          console.log("Geolocation is not available. fetchCities with default coordinates");
          fetchCities(51.5074, 0.1278); // Londyn
        }
      );
    }
  };

  // Ładowanie miast po renderowaniu komponentu
  // useEffect(() => {
  //   sendGeoLocation();
  // }, []);

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
