import {useParams} from "react-router-dom";
import {DummyUser} from "../../Services/Constants/DummyUser.tsx";
import {CardProfileTop} from "../../Components/Cards/ProfileTop/CardProfileTop.tsx";
import {Box} from "@mantine/core";

export const Profile = () => {

  const {userTag} = useParams();

  if (DummyUser && DummyUser.tag === userTag) {
    return (
      <Box px={"xl"} py={"xs"}>
        <CardProfileTop userDetails={DummyUser}/>
      </Box>
    );
  }

  return (
    <>
      Undefined
    </>
  );
}