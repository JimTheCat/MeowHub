import {useParams} from "react-router-dom";
import {CardProfileTop} from "./components/ProfileTop";
import {Box, Group, Stack} from "@mantine/core";
import {ProfileAboutMe} from "./components/ProfileAboutMe";
import {ProfileMultimedia} from "./components/ProfileMultimedia";
import {ProfileFriends} from "./components/ProfileFriends";
import {useEffect, useState} from "react";
import {ProfileDetails} from "./consts";
import api from "../shared/services/api.ts";
import {BasicUserInfo, PostDTO, ProfileUser} from "../shared/types";
import {InfiniteScroll} from "../shared/components/InfiniteScroll";
import {Post} from "../shared/components/Cards/Post";

export const Profile = () => {

  const {userTag} = useParams();
  const [profileInfo, setProfileInfo] = useState<ProfileDetails | null>(null);
  const [friends, setFriends] = useState<BasicUserInfo[]>([]);
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [mediaList, setMediaList] = useState<string[]>([]);
  const login = userTag?.split('@')[1];

  const [userPosts, setUserPosts] = useState<PostDTO[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await api.get(`/api/posts/user/${login}`, {
        params: {pageNo: page, pageSize: 10},
      });

      const data = response.data;

      setUserPosts((prevPosts) => [...prevPosts, ...data.content]);
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
  }, [userTag]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, userInfoResponse, friendsResponse, mediaResponse] = await Promise.all([
          api.get<ProfileDetails>(`/api/profiles/${login}`),
          api.get<BasicUserInfo>('/api/users/basic-user-info', {params: {login}}),
          api.get(`/api/relations/${login}/friends`, {params: {page: 0, size: 6}}),
          api.get(`/api/profiles/${login}/media`, {params: {page: 0, size: 6}}),
        ]);

        const profileDetails = profileResponse.data;
        const basicUserInfo = userInfoResponse.data;
        const friendsList = friendsResponse.data.content;
        const media = mediaResponse.data.content;

        setProfileInfo(profileDetails);
        setFriends(friendsList);
        setMediaList(media);

        setProfile({
          ...basicUserInfo,
          ...profileDetails,
          profilePicture: profileDetails.profilePicture,
          friends: friendsList,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userTag]);

  return (
    <Box px={"xl"} py={"xs"}>
      <Group align={"flex-start"} justify={"center"} gap={70}>
        <Stack>
          <CardProfileTop userDetails={profile}/>
          <ProfileAboutMe htmlContent={profileInfo?.content ? profileInfo.content : ""}/>

          <Box w={500}>
            <InfiniteScroll loadMore={loadMorePosts} hasMore={hasMore} loading={loading}>
              <Stack align={"center"} gap="lg">
                {userPosts.map((post) => (
                  <Post
                    key={post.id}
                    id={post.id}
                    author={post.author}
                    content={post.content}
                    createdAt={post.createdAt}
                    numberOfComments={post.numberOfComments}
                    pictures={post.pictures}
                    cardWidth={500}
                    bordered
                  />
                ))}
              </Stack>
            </InfiniteScroll>
          </Box>
        </Stack>
        <Stack>
          <ProfileMultimedia multimedia={mediaList}/>
          <ProfileFriends friends={friends}/>
        </Stack>
      </Group>
    </Box>
  );

}