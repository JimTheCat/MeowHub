import {useCallback, useEffect, useState} from "react";
import api from "../../../shared/services/api.ts";
import {Group, Loader, ScrollArea, Text} from "@mantine/core";
import {Post} from "../../../shared/components/Cards/Post";
import {PostDTO} from "../../types/Post.tsx";

export const InfiniteScroll = () => {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await api.get(`/api/posts`, {
        params: {pageNo: page, pageSize: 10},
      });

      const newPosts = response.data.content;

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setHasMore(response.data.totalPages > page + 1);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Funkcja do obsługi scrolla
  const handleScroll = (event: { currentTarget: any; }) => {
    const target = event.currentTarget;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 10) {
      loadPosts();
    }
  };

  return (
    <ScrollArea
      onScroll={handleScroll}
      offsetScrollbars
    >
      {posts.map((post) => (
        <Post
          key={post.id}
          author={post.author}
          content={post.content}
          createdAt={post.createdAt}
          numberOfComments={post.numberOfComments}
          id={post.id}
          photosUrls={
            // generate 100 random photos
            Array.from({length: 100}, () => {
              return "https://picsum.photos/seed/" + Math.random() + "/800/2200";
            })
          }
        />
      ))}
      {loading && (
        <Group justify={"center"} mt="lg">
          <Loader/>
        </Group>
      )}
      {!hasMore && !loading && (
        <Text ta="center" c="dimmed" mt="lg">
          No more posts to load
        </Text>
      )}
    </ScrollArea>
  );
}