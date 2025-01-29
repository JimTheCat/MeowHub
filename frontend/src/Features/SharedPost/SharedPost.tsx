import {Center, Loader} from "@mantine/core";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {PostDTO} from "../shared/types";
import {Post} from "../shared/components/Cards/Post";
import api from "../shared/services/api.ts";

export const SharedPost = () => {
  const [post, setPost] = useState<PostDTO | null>(null);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const {postId} = useParams()

  useEffect(() => {
    api.get(`/api/posts/${postId}`).then(r => {
      if (r.status === 200) {
        setPost(r.data);
        setIsPostLoading(false);
      }
    });
  }, []);

  return (
    <Center h={'100vh'}>
      {isPostLoading && <Loader size="xl"/>}
      {post &&
          <Post
              id={post.id}
              content={post.content}
              createdAt={post.createdAt}
              numberOfComments={post.numberOfComments}
              author={post.author}
          />
      }
    </Center>
  );
}