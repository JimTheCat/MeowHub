import {Badge, Box, Button, Card, Group, Image, ScrollArea, Stack, Text} from "@mantine/core";
import {Carousel} from "@mantine/carousel";
import {IconCheck, IconX} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import classes from "./carousel.module.css";

type ProfileProps = {
  profile: {
    name: string;
    age: number;
    location: string;
    bio: string;
    photos: { index: string; url: string }[];
  };
  isActive: boolean;
  isNext: boolean;
  swipeDirection: string;
  handleSwipe: (direction: string) => void;
};

export const ProfileCard = ({
                              profile,
                              isActive,
                              isNext,
                              swipeDirection,
                              handleSwipe,
                            }: ProfileProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [styles, setStyles] = useState({
    transform: "translate(-50%, -50%) scale(1)",
    opacity: 1,
  });

  useEffect(() => {
    if (swipeDirection) {
      // Animacja przesuwania aktywnej karty
      const directionTransform =
        swipeDirection === "left"
          ? "translate(-150%, -50%)"
          : "translate(150%, -50%)";

      setIsAnimating(true);
      setStyles({
        transform: `${directionTransform} scale(1)`,
        opacity: 0,
      });

      // Po zakończeniu animacji wykonaj swipe i zresetuj styl
      const timeout = setTimeout(() => {
        handleSwipe(swipeDirection);
        setIsAnimating(false);
        setStyles({
          transform: "translate(-50%, -50%) scale(0.9)", // Nowa karta wychodzi spod poprzedniej
          opacity: 1,
        });
      }, 500);

      return () => clearTimeout(timeout);
    } else if (isNext) {
      // Skalowanie nowej karty, która czeka na swoją kolej
      setStyles({
        transform: "translate(-50%, -50%) scale(0.9)",
        opacity: 1,
      });
    } else if (isActive) {
      // Reset do domyślnego stanu dla aktywnej karty
      setStyles({
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 1,
      });
    }
  }, [swipeDirection, isActive, isNext, handleSwipe]);

  return (
    <Card
      pos={'absolute'}
      top={'50%'}
      left={'50%'}
      w={'80vw'}
      maw={'400px'}
      mih={'90vh'}
      style={{
        ...styles,
        transition: isAnimating
          ? "transform 0.5s ease, opacity 0.5s ease"
          : "transform 0.3s ease, opacity 0.3s ease",
        zIndex: isActive ? 10 : isNext ? 5 : 1,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        '--card-padding': '0',
      }}
      component={ScrollArea}
    >
      <Box mah="calc(90dvh - 80px)">
        {/* Sekcja karuzeli */}
        <Card.Section h="70vh">
          <Carousel classNames={classes} withIndicators>
            {profile.photos.map((photo) => (
              <Carousel.Slide key={photo.index}>
                <Image src={photo.url} alt="Profile photo" h="70vh"/>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Card.Section>

        {/* Sekcja informacji użytkownika */}
        <Stack gap="xs" p="md">
          <Group justify="apart">
            <Text size="xl" fw={700}>
              {profile.name}
            </Text>
            <Badge color="orange" size="lg" radius="xl">
              {profile.age}
            </Badge>
          </Group>
          <Text size="sm" c="gray">
            {profile.location}
          </Text>
          <Text size="sm">{profile.bio}</Text>
        </Stack>
      </Box>

      {/* Sekcja przycisków */}
      <Group
        justify="space-evenly"
        pos={'absolute'}
        bottom={'1rem'}
        left={'50%'}
        w={'100%'}
        style={{
          transform: "translateX(-50%)",
        }}
      >
        <Button
          color="red"
          radius="xl"
          size="lg"
          style={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => handleSwipe("left")}
        >
          <IconX/>
        </Button>
        <Button
          color="green"
          radius="xl"
          size="lg"
          style={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => handleSwipe("right")}
        >
          <IconCheck/>
        </Button>
      </Group>
    </Card>
  );
};
