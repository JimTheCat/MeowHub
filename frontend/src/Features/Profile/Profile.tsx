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
        const results = await Promise.allSettled([
          api.get<ProfileDetails>(`/api/profiles/${login}`),
          api.get<BasicUserInfo>('/api/users/basic-user-info', {params: {login}}),
          api.get(`/api/relations/${login}/friends`, {params: {page: 0, size: 6}}),
          api.get(`/api/profiles/${login}/media`, {params: {page: 0, size: 6}}),
        ]);

        const profileResponse = results[0];
        const userInfoResponse = results[1];
        const friendsResponse = results[2];
        const mediaResponse = results[3];

        if (profileResponse.status === 'fulfilled' && userInfoResponse.status === 'fulfilled') {
          setProfileInfo(profileResponse.value.data);

          const profileDetails = profileResponse.value.data;
          const basicUserInfo = userInfoResponse.value.data;

          setProfile((prevProfile) => ({
            ...prevProfile,
            id: basicUserInfo.id,
            name: basicUserInfo.name,
            surname: basicUserInfo.surname,
            login: basicUserInfo.login,
            profilePictureUrl: basicUserInfo.profilePictureUrl ?? profileDetails.profilePictureUrl,
            content: profileDetails.content ?? "",
            createdAt: profileDetails.createdAt,
            friends: friendsResponse.status === 'fulfilled' ? friendsResponse.value.data.content : [],
          }));
        }

        if (friendsResponse.status === 'fulfilled') {
          setFriends(friendsResponse.value.data.content);
        } else if (friendsResponse.reason?.response?.status === 403) {
          console.warn("Friends list is private or restricted.");
          setFriends([]);
        } else {
          console.error('Error fetching friends:', friendsResponse.reason);
        }

        if (mediaResponse.status === 'fulfilled') {
          setMediaList(mediaResponse.value.data.content);
        } else if (mediaResponse.reason?.response?.status === 403) {
          console.warn("Media list is private or restricted.");
          setMediaList([]);
        } else {
          console.error('Error fetching media:', mediaResponse.reason);
        }

        if (profileResponse.status === 'fulfilled' && userInfoResponse.status === 'fulfilled') {
          const profileDetails = profileResponse.value.data;
          const basicUserInfo = userInfoResponse.value.data;

          setProfile({
            ...basicUserInfo,
            ...profileDetails,
            profilePictureUrl: profileDetails.profilePictureUrl,
            friends: friendsResponse.status === 'fulfilled' ? friendsResponse.value.data.content : [],
          });
        }
      } catch (error) {
        console.error('Unexpected error fetching data:', error);
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