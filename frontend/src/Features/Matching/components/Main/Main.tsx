import {Center, Grid, Loader, Stack, Text} from "@mantine/core";
import {ProfileCard} from "./components";
import {useEffect, useState} from "react";
import {MatchingProfile} from "../../types";
import api from "../../../shared/services/api.ts";
import {useTranslation} from "react-i18next";

export const Main = () => {
  const [profiles, setProfiles] = useState<MatchingProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {t} = useTranslation('matching');

  const fetchProfiles = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/matching-profile/all?page=${page}`);
      const data = response.data;

      // Append new profiles to the list
      setProfiles((prev) => [...prev, ...data.content]);

      // Update total pages and hasMore state
      if (page >= data.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(currentPage);
  }, [currentPage]);

  const handleSwipe = (direction: string) => {
    if (isAnimating) return;

    setSwipeDirection(direction);
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection("");
      setIsAnimating(false);

      // Check if we need to load the next page
      if (currentIndex + 1 >= profiles.length - 1 && hasMore) {
        setCurrentPage((prev) => prev + 1);
      }
    }, 500); // Time of animation
  };

  return (
    <Grid
      pos={"relative"}
      w={"100%"}
      h={"100vh"}
      style={{
        overflow: "hidden",
      }}
    >
      {isLoading && (
        <Center
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
        >
          <Loader size="lg"/>
        </Center>
      )}

      {!isLoading &&
        profiles
          .slice(currentIndex, currentIndex + 2) // Only two profiles at a time
          .map((profile, index) => {
            return (
              <ProfileCard
                key={profile.id}
                profile={profile}
                isActive={index === 0}
                isNext={index === 1}
                swipeDirection={index === 0 ? swipeDirection : ""}
                handleSwipe={handleSwipe}
              />
            );
          })}

      {/* Show a message when there are no more profiles */}
      {!hasMore && currentIndex >= profiles.length && !isLoading && (
        <Center
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
        >
          <Stack justify={'center'} align={'center'} gap={0}>
            <Text size="xl" fw={700} mb="md">
              {t('main.noMatch.title')}
            </Text>
            <Text mb="lg">
              {t('main.noMatch.description')}
            </Text>
          </Stack>
        </Center>
      )}
    </Grid>
  );
};
