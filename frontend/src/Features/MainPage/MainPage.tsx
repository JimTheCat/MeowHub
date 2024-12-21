import {Box, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import api from "../shared/services/api.ts";
import {Post} from "../shared/components/Cards/Post";
import {PostDTO} from "./types/Post.tsx";

export const MainPage = () => {
  const [posts, setPosts] = useState<PostDTO[]>([]);

  useEffect(() => {
    api.get<{ content: PostDTO[] }>("/api/posts").then((response) => {
      setPosts(response.data.content);
    });
  }, []);

  return (
    <Box p={"md"}>
      <Title order={1}>Main page</Title>

      {/* Post rendering */}
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
    </Box>
  );
};
