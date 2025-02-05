import {Box, Button, Card, Divider, Group, Image, ScrollArea, Stack, Text} from "@mantine/core";
import {Carousel, Embla, useAnimationOffsetEffect} from "@mantine/carousel";
import {IconCheck, IconX} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import classes from "./carousel.module.css";
import {MatchingProfile} from "../../../types";
import {MatchingBadge} from "../../../../shared/components/MatchingBadge";
import {useProfileAttributes} from "../../../../shared/utils/profileAttributesUtils.tsx";
import {useTranslation} from "react-i18next";
import api from "../../../../shared/services/api.ts";

type ProfileProps = {
  profile: MatchingProfile;
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
    transform: "translate(-50%, -50%) scale(0.9)",
    opacity: 1,
  });
  const [embla, setEmbla] = useState<Embla | null>(null);
  const DURATION = 500;
  const {processProfileAttributes} = useProfileAttributes();
  const {t} = useTranslation('matching');

  useAnimationOffsetEffect(embla, DURATION);

  useEffect(() => {
    if (swipeDirection) {
      // Animation for swiping
      const directionTransform =
        swipeDirection === "left"
          ? "translate(-150%, -50%)"
          : "translate(150%, -50%)";

      setIsAnimating(true);
      setStyles({
        transform: `${directionTransform} scale(1)`,
        opacity: 0,
      });

      // Reset styles after animation
      const timeout = setTimeout(() => {
        handleSwipe(swipeDirection);
        setIsAnimating(false);
        setStyles({
          transform: "translate(-50%, -50%) scale(0.9)", // Default scale
          opacity: 1,
        });
      }, 500);

      return () => clearTimeout(timeout);
    } else if (isNext) {
      // Animation for next card
      setStyles((prevStyles) => ({
        ...prevStyles,
        transform: "translate(-50%, -50%) scale(0.9)",
        opacity: 1,
      }));
    } else if (isActive) {
      // Animation for active card
      setStyles({
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 1,
      });
    }

    const timeout = setTimeout(() => {
      if (embla) {
        embla.reInit();
      }
    }, 300); // Run after the animation
    return () => clearTimeout(timeout);
  }, [swipeDirection, isActive, isNext, handleSwipe]);

  const handleZIndex = () => {
    if (isActive) {
      return 100;
    }

    return isNext ? 50 : 1;
  }

  const infoSectionAttributes = [
    "gender", "sexuality", "education", "drinker", "smoker", "exercises", "pet"
  ];

  const handleApiSubmit = async (matchingProfileId: number, swipeDirection: 'right' | 'left') => {
    if (swipeDirection === 'right') {
      await api.post(`/api/matching-relations/like/${matchingProfileId}`);
    }
    if (swipeDirection === 'left') {
      await api.post(`/api/matching-relations/dislike/${matchingProfileId}`);
    }
    handleSwipe(swipeDirection);
  }

  return (
    <Card
      pos={'absolute'}
      top={'50%'}
      left={'50%'}
      w={'30vw'}
      mih={'90vh'}
      style={{
        ...styles,
        transition: isAnimating
          ? "transform 0.5s ease, opacity 0.5s ease"
          : "transform 0.3s ease, opacity 0.3s ease",
        zIndex: handleZIndex(),
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        '--card-padding': '0',
      }}
      component={ScrollArea}
    >
      <Box mah="calc(90dvh - 80px)">
        {/* Carousel section */}
        <Card.Section h="70vh">
          <Carousel classNames={classes} getEmblaApi={setEmbla} withIndicators>
            {/*Sort by creation date*/}
            {profile.pictures
              .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
              .map((photo) => (
                <Carousel.Slide key={photo.id} pos={'relative'} h="70vh">
                  <Image src={photo.url} alt="Profile photo" h={'100%'}/>
                </Carousel.Slide>
              ))}
          </Carousel>
        </Card.Section>

        {/* Profile information */}
        <Stack gap="xs" p="md">
          <Text size="xl" fw={700}>
            {profile.name}, {profile.age}
          </Text>
          {profile.aboutMe &&
              <>
                  <Stack gap={'xs'}>
                      <Text c={'dimmed'}>
                        {t('main.card.about', {name: profile.name})}
                      </Text>
                      <Text>
                        {profile.aboutMe}
                      </Text>
                  </Stack>
                  <Divider/>
              </>
          }
          {profile.lookingFor && profile.lookingFor.length > 0 &&
              <>
                  <MatchingBadge
                      title={t('main.card.lookingFor', {name: profile.name})}
                      data={
                        processProfileAttributes(
                          profile,
                          ["lookingFor"],
                          true
                        )
                      }
                      gap={'xs'}
                  />
                  <Divider/>
              </>
          }
          <MatchingBadge
            title={t('main.card.info', {name: profile.name})}
            data={
              processProfileAttributes(
                profile,
                infoSectionAttributes,
              )
            }
          />
          {/* Location */}
          {profile.location && (
            <>
              <Stack gap={'xs'}>
                <Text c={'dimmed'}>
                  {t('main.card.location', {name: profile.name})}
                </Text>
                <Text size="sm" c="gray">
                  {profile.location}
                </Text>
              </Stack>
              <Divider/>
            </>
          )}
        </Stack>
      </Box>

      {/* Swipe buttons */}
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
          onClick={() => handleApiSubmit(profile.id, "left")}
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
          onClick={() => handleApiSubmit(profile.id, "right")}
        >
          <IconCheck/>
        </Button>
      </Group>
    </Card>
  );
};
