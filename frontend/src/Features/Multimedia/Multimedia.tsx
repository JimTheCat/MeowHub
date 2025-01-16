import {useEffect, useRef, useState} from 'react';
import {Carousel} from '@mantine/carousel';
import {ActionIcon, Center, Flex, Group, Image, ScrollArea, Stack, Text} from '@mantine/core';
import {useNavigate, useParams} from "react-router-dom";
import api from "../shared/services/api.ts";
import {EmblaCarouselType} from 'embla-carousel-react';
import {IconArrowLeft} from '@tabler/icons-react';
import {BasicUserInfo} from "../shared/types";
import classes from './carousel.module.css';

export const Multimedia = () => {
  const {userTag} = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState<string[]>([]);
  const [owner, setOwner] = useState<string>('Unknown User');
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const emblaApiRef = useRef<EmblaCarouselType | null>(null);
  const thumbnailScrollRef = useRef<HTMLDivElement | null>(null);
  const login = userTag?.split('@')[1];

  const fetchMedia = async (page: number) => {
    try {

      const response = await api.get(`/api/profiles/${login}/media`, {
        params: {page, size: 10},
      });
      if (response.data.last) {
        setIsLastPage(true);
      }
      setMedia((prevMedia) => [...prevMedia, ...response.data.content]);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const fetchOwner = () => {
    api.get<BasicUserInfo>(`/api/users/basic-user-info`, {params: {login}}).then((response) => {
      setOwner(`${response.data.name} ${response.data.surname}`);
    });
  };

  useEffect(() => {
    fetchMedia(page);
    fetchOwner();
  }, [page]);

  const handleLoadMore = () => {
    if (!isLastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    if (emblaApiRef.current) {
      emblaApiRef.current.scrollTo(index);
    }
    centerActiveThumbnail(index);
  };

  const centerActiveThumbnail = (index: number) => {
    if (thumbnailScrollRef.current) {
      const thumbnailContainer = thumbnailScrollRef.current;
      const children = Array.from(thumbnailContainer.querySelectorAll('img'));

      if (!children[index]) return;

      const thumbnail = children[index] as HTMLElement;

      const containerWidth = thumbnailContainer.clientWidth;
      const thumbnailWidth = thumbnail.offsetWidth;
      const thumbnailOffsetLeft = thumbnail.offsetLeft;

      const scrollTo = thumbnailOffsetLeft - containerWidth / 2 + thumbnailWidth / 2;

      thumbnailContainer.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (thumbnailScrollRef.current) {
      const {scrollLeft, scrollWidth, clientWidth} = thumbnailScrollRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - 50 && !isLastPage) {
        handleLoadMore();
      }
    }
  };

  useEffect(() => {
    centerActiveThumbnail(activeIndex);
  }, [activeIndex]);

  return (
    <Stack gap="lg" w="100%" h={'100vh'}>
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb="md" p={'lg'}>
        {/* Back Arrow */}
        <ActionIcon
          size="lg"
          radius="xl"
          variant="light"
          onClick={() => navigate(-1)}
        >
          <IconArrowLeft size={24}/>
        </ActionIcon>

        {/* Owner Info */}
        <Text size="lg" fw={600}>
          {owner ? `${owner}'s Media` : 'Media'}
        </Text>
      </Flex>
      <Center px={"xl"} py={"xs"} style={{flexGrow: 1}}>
        <Stack>
          {/* Main Carousel */}
          <Carousel
            classNames={classes}
            getEmblaApi={(embla) => (emblaApiRef.current = embla)}
            onSlideChange={(index) => setActiveIndex(index)}
          >
            {media.map((item, index) => (
              <Carousel.Slide key={item}>
                <Image src={item} alt={`Media ${index}`} fit="contain" height={400}/>
              </Carousel.Slide>
            ))}
          </Carousel>

          {/* Thumbnails */}
          <ScrollArea
            scrollbars={"x"}
            viewportRef={thumbnailScrollRef}
            onScrollPositionChange={handleScroll}
            type="hover"
            scrollbarSize={12}
            offsetScrollbars
          >
            <Group wrap={'nowrap'}>
              {media.map((item, index) => (
                <Image
                  key={item}
                  src={item}
                  alt={`Thumbnail ${item}`}
                  fit="cover"
                  height={80}
                  width={80}
                  radius="sm"
                  onClick={() => handleThumbnailClick(index)}
                  style={{
                    cursor: 'pointer',
                    border: activeIndex === index ? '2px solid #1c7ed6' : '2px solid transparent',
                    flexShrink: 0,
                  }}
                />
              ))}
            </Group>
          </ScrollArea>
        </Stack>
      </Center>

    </Stack>
  );
};
