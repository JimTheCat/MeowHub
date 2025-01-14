import {useEffect, useState} from "react";
import {PostDTO} from "../shared/types";
import api from "../shared/services/api.ts";
import {Box, Stack} from "@mantine/core";
import {InfiniteScroll} from "./components/InfiniteScroll";
import {Post} from "../shared/components/Cards/Post";

export const MainPage = () => {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await api.get(`/api/posts`, {
        params: {pageNo: page, pageSize: 10},
      });

      const data = response.data;

      setPosts((prevPosts) => [...prevPosts, ...data.content]);
      setHasMore(data.totalPages > page);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadMorePosts();
  }, []);

  return (
    <Box p="lg">
      <InfiniteScroll loadMore={loadMorePosts} hasMore={hasMore} loading={loading}>
        <Stack align={"center"} gap="lg">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              content={post.content}
              createdAt={post.createdAt}
              numberOfComments={post.numberOfComments}
              pictures={post.pictures}
            />
          ))}
        </Stack>
      </InfiniteScroll>
    </Box>
  );
};