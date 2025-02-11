import React, {forwardRef, useEffect, useRef} from "react";
import {Box, Loader, Text} from "@mantine/core";
import {useTranslation} from "react-i18next";

interface InfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  children: React.ReactNode;
  translation?: string;
  hideEndMessage?: boolean;
  reverse?: boolean;
  rootRef?: React.RefObject<HTMLElement>;
}

export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  (
    {
      loadMore,
      hasMore,
      loading,
      children,
      translation,
      hideEndMessage,
      reverse = false,
      rootRef,
    },
    ref
  ) => {
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const {t} = useTranslation(translation ?? "mainPage");

    useEffect(() => {
      const options = {
        root: rootRef?.current || null,
        rootMargin: reverse ? "100px 0px 0px 0px" : "0px 0px 100px 0px",
        threshold: 0.1,
      };

      const handleIntersection: IntersectionObserverCallback = (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          loadMore();
        }
      };

      if (sentinelRef.current) {
        observer.current = new IntersectionObserver(handleIntersection, options);
        observer.current.observe(sentinelRef.current);
      }

      return () => {
        if (observer.current && sentinelRef.current) {
          observer.current.unobserve(sentinelRef.current);
        }
      };
    }, [hasMore, loading, loadMore, reverse, rootRef]);

    return (
      <Box
        ref={ref}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: reverse ? "column-reverse" : "column",
          overflow: "auto",
        }}
      >
        {reverse ? (
          <>
            {children}
            <div ref={sentinelRef} style={{height: 1, visibility: "hidden"}}/>
          </>
        ) : (
          <>
            <div ref={sentinelRef} style={{height: 1, visibility: "hidden"}}/>
            {children}
          </>
        )}

        {loading && (
          <Box style={{textAlign: "center", margin: "20px 0"}}>
            <Loader size="md"/>
          </Box>
        )}

        {!hideEndMessage && !hasMore && !loading && (
          <Text ta="center" c="dimmed" mt="lg">
            {t("infiniteScroll.noMore")}
          </Text>
        )}
      </Box>
    );
  }
);
