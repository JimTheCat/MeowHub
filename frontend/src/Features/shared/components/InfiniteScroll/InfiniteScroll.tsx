import React, {useEffect, useRef} from "react";
import {Box, Loader, Text} from "@mantine/core";
import {useTranslation} from "react-i18next";

interface InfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  children: React.ReactNode;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
                                                                loadMore,
                                                                hasMore,
                                                                loading,
                                                                children,
                                                              }) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const {t} = useTranslation('mainPage');

  useEffect(() => {
    // IntersectionObserver callback
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        loadMore();
      }
    };

    if (sentinelRef.current) {
      observer.current = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "100px", // Load earlier when close to the bottom
        threshold: 0.1, // Trigger when sentinel is at least 10% visible
      });

      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current && sentinelRef.current) {
        observer.current.unobserve(sentinelRef.current);
      }
    };
  }, [hasMore, loading, loadMore]);

  return (
    <Box style={{position: "relative"}}>
      {children}
      {/* Sentinel element */}
      <div ref={sentinelRef} style={{height: 1, visibility: "hidden"}}/>
      {/* Loading indicator */}
      {loading && (
        <Box style={{textAlign: "center", margin: "20px 0"}}>
          <Loader size="md"/>
        </Box>
      )}
      {/* End of data */}
      {!hasMore && !loading && (
        <Text ta="center" c="dimmed" mt="lg">
          {t('infiniteScroll.noMore')}
        </Text>
      )}
    </Box>
  );
};
