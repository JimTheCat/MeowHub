import {Box, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import api from "../../Services/api.ts";
import {Post} from "../../Components/Cards/Post";
import {PostDTO} from "../../Services/DTOs/Post.tsx";

export const MainPage = () => {

  const [posts, setPosts] = useState<PostDTO[] | []>([]);

  useEffect(() => {
    api.get<PostDTO[]>("/api/posts/get-all").then((response) => {
      setPosts(response.data);
    });
  }, []);

    return (
      <Box p={"md"}>
        <Title order={1}>Main page</Title>

        {/*Posts*/}
        {posts.map((post) => (
          <Post key={post.ownerLogin} ownerLogin={post.ownerLogin} contentHtml={post.content} createdAt={post.createdAt}
                photosUrls={
                  // generate 100 random photos
                  Array.from({length: 100}, () => {
                    return "https://picsum.photos/seed/" + Math.random() + "/800/2200";
                  })
                }
          />
        ))}
      </Box>
    )
}