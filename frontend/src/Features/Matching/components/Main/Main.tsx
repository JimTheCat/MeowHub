import {Grid} from "@mantine/core";
import {ProfileCard} from "./components";
import {useEffect, useState} from "react";

type ProfileDummy = {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  photos: { index: string; url: string }[];
};

export const Main = () => {
  const [profiles, setProfiles] = useState<ProfileDummy[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Dummy data
    const newProfiles = [
      {
        id: 1,
        name: "Iza",
        age: 23,
        location: "London",
        bio: "Lorem ipsum dolor sit amet.",
        photos: [
          {index: "1", url: "https://picsum.photos/seed/1/800/600"},
          {index: "2", url: "https://picsum.photos/seed/2/800/600"},
        ],
      },
      {
        id: 2,
        name: "John",
        age: 29,
        location: "New York",
        bio: "Lorem ipsum dolor sit amet.",
        photos: [
          {index: "1", url: "https://picsum.photos/seed/3/800/600"},
          {index: "2", url: "https://picsum.photos/seed/4/800/600"},
        ],
      },
      {
        id: 3,
        name: "Alice",
        age: 25,
        location: "Berlin",
        bio: "Lorem ipsum dolor sit amet.",
        photos: [
          {index: "1", url: "https://picsum.photos/seed/5/800/600"},
          {index: "2", url: "https://picsum.photos/seed/6/800/600"},
        ],
      },
      {
        id: 4,
        name: "Iza",
        age: 23,
        location: "London",
        bio: "Lorem ipsum dolor sit amet.",
        photos: [
          {index: "1", url: "https://picsum.photos/seed/1/800/600"},
          {index: "2", url: "https://picsum.photos/seed/2/800/600"},
        ],
      },
      {
        id: 5,
        name: "John",
        age: 29,
        location: "New York",
        bio: "Lorem ipsum dolor sit amet.",
        photos: [
          {index: "1", url: "https://picsum.photos/seed/3/800/600"},
          {index: "2", url: "https://picsum.photos/seed/4/800/600"},
        ],
      },
      {
        id: 6,
        name: "Alice",
        age: 25,
        location: "Berlin",
        bio: "Lorem ipsum dolor sit amet.",
        photos: [
          {index: "1", url: "https://picsum.photos/seed/5/800/600"},
          {index: "2", url: "https://picsum.photos/seed/6/800/600"},
        ],
      },
    ] as ProfileDummy[];
    setProfiles(newProfiles);
  }, []);

  const handleSwipe = (direction: string) => {
    if (isAnimating) return;
    setSwipeDirection(direction);
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection("");
      setIsAnimating(false);
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
      {profiles
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
    </Grid>
  );
};
