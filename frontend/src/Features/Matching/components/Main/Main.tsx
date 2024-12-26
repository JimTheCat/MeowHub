import {Badge, Box, Button, Card, Group, ScrollArea, Stack, Text} from "@mantine/core";
import {Carousel} from "@mantine/carousel";
import {IconCheck, IconX} from "@tabler/icons-react";
import classes from './carousel.module.css';
import {useState} from "react";

export const Main = () => {
  const [isSwiping, setIsSwiping] = useState(false); // Kontroluje animację swipowania
  const [swipeDirection, setSwipeDirection] = useState(""); // Kierunek animacji

  const handleSwipe = (direction: string) => {
    setSwipeDirection(direction); // Ustaw kierunek animacji
    setIsSwiping(true);

    // Resetuj stan po zakończeniu animacji
    setTimeout(() => {
      setIsSwiping(false);
      setSwipeDirection("");
    }, 500); // Długość animacji w ms
  };

  return (
    <Box
      style={{
        // position: "relative",
        width: "50%",
        height: "100%",
        background: isSwiping ? "rgba(0, 0, 0, 0.3)" : "transparent", // Wyszarzenie podczas swipe
        transition: "background 0.3s ease",
      }}
    >
      <Card
        radius={"md"}
        style={{
          position: "relative",
          "--card-padding": "0",
          transform: isSwiping
            ? swipeDirection === "left"
              ? "translateX(-100%)"
              : "translateX(100%)"
            : "translateX(0)", // Animacja swipowania
          transition: "transform 0.5s ease",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        }}
        mih={'90dvh'}
      >
        {/* Obszar przewijania obejmujący cały Card */}
        <ScrollArea type={"auto"} style={{maxHeight: "calc(90dvh - 80px)"}}>

          {/* Sekcja zdjęcia jako karuzela */}
          <Card.Section style={{backgroundColor: "#454545"}}>
            <Carousel
              withIndicators
              loop
              classNames={classes}
            >
              <Carousel.Slide>
                <Box
                  style={{
                    height: "300px",
                    backgroundColor: "#5A5A5A",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text ta="center" style={{color: "#FFF"}}>
                    Photo 1
                  </Text>
                </Box>
              </Carousel.Slide>
              <Carousel.Slide>
                <Box
                  style={{
                    height: "300px",
                    backgroundColor: "#6A6A6A",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text ta="center" style={{color: "#FFF"}}>
                    Photo 2
                  </Text>
                </Box>
              </Carousel.Slide>
              <Carousel.Slide>
                <Box
                  style={{
                    height: "300px",
                    backgroundColor: "#7A7A7A",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text ta="center" style={{color: "#FFF"}}>
                    Photo 3
                  </Text>
                </Box>
              </Carousel.Slide>
            </Carousel>
          </Card.Section>

          {/* Informacje o użytkowniku */}
          <Stack gap="xs" p="md">
            <Group justify="apart">
              <Text size="xl" fw={700}>
                Imie
              </Text>
              <Badge color="orange" size="lg" radius="xl">
                P
              </Badge>
            </Group>
            <Text size="sm" c="gray">
              London, 21
            </Text>
            <Group justify="apart">
              <Text size="xl" fw={700}>
                Imie
              </Text>
              <Badge color="orange" size="lg" radius="xl">
                P
              </Badge>
            </Group>
            <Text size="sm" c="gray">
              London, 21
            </Text>
            <Group justify="apart">
              <Text size="xl" fw={700}>
                Imie
              </Text>
              <Badge color="orange" size="lg" radius="xl">
                P
              </Badge>
            </Group>
            <Text size="sm" c="gray">
              London, 21
            </Text>
          </Stack>
        </ScrollArea>

        <Group
          justify="space-evenly"
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
          }}
        >
          <Button
            color="red"
            radius="xl"
            size="lg"
            style={{
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)", // Cień przycisku
            }}
            onClick={() => handleSwipe("left")} // Swipe w lewo
          >
            <IconX/>
          </Button>
          <Button
            color="green"
            radius="xl"
            size="lg"
            style={{
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)", // Cień przycisku
            }}
            onClick={() => handleSwipe("right")} // Swipe w prawo
          >
            <IconCheck/>
          </Button>
        </Group>
      </Card>
    </Box>
  );
};
