import {useParams} from "react-router-dom";
import {DummyUser} from "../../Services/Constants/DummyUser.tsx";
import {CardProfileTop} from "../../Components/Cards/ProfileTop";
import {Box, Group, Stack} from "@mantine/core";
import {ProfileAboutMe} from "../../Components/Cards/ProfileAboutMe";
import {ProfileMultimedia} from "../../Components/Cards/ProfileMultimedia";
import {DummyMultimedia} from "../../Services/Constants/DummyMultimedia.tsx";
import {ProfileFriends} from "../../Components/Cards/ProfileFriends";

export const Profile = () => {

  const {userTag} = useParams();

  if (DummyUser && DummyUser.tag === userTag) {
    return (
      <Box px={"xl"} py={"xs"}>
        <Group align={"flex-start"} justify={"center"} gap={70}>
          <Stack>
            <CardProfileTop userDetails={DummyUser}/>
            <ProfileAboutMe htmlContent={DummyUser.profileDetails ? DummyUser.profileDetails : ""}/>

            {/*TODO: Implement post map*/}
            {/*Here should be post map*/}
          </Stack>
          <Stack>
            <ProfileMultimedia multimedia={DummyMultimedia}/>
            <ProfileFriends friends={DummyUser.friends!}/>
          </Stack>
        </Group>
      </Box>
    );
  }

  return (
    <>
      Undefined
    </>
  );
}