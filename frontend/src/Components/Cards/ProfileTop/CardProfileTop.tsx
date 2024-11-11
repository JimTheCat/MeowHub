import {Box, Card, Group, Image, Skeleton, Stack, Text} from "@mantine/core";
import {DummyUserType} from "../../../Services/Constants/DummyUser.tsx";
import {useState} from "react";


export const CardProfileTop = (props: { userDetails: DummyUserType }) => {

  const [isProfilePictureLoaded, setIsProfilePictureLoaded] = useState(false);

  return (
    <Card shadow="sm" padding="lg" radius="md" w={"fit-content"} withBorder>
      <Card.Section withBorder>
        <Box h={150} w={500}>
          <Stack justify={"center"} align={"center"} h={"inherit"}>
            Placeholder for background photo
          </Stack>
        </Box>
      </Card.Section>

      <Box pos={"relative"} top={-35}>
        <Group>
          <Box>
            {!isProfilePictureLoaded && (
              <Skeleton
                circle
                height={120}
              />
            )}
            <Image
              src={props.userDetails.profilePicture}
              w={"auto"}
              h={120}
              fit={"cover"}
              onLoad={() => setIsProfilePictureLoaded(true)}
              radius={180}
              bd={"2px solid"}
              display={isProfilePictureLoaded ? "block" : "none"}
            />
          </Box>
          <Stack justify="flex-end" gap={0} mt={"lg"}>
            <Group justify={"center"} gap={"xs"} align={"baseline"}>
              <Text size={"xl"}>{props.userDetails.name} {props.userDetails.surname}</Text>
              <Text size={"sm"} c="dimmed">{props.userDetails.pronouns}</Text>
            </Group>
            <Text size={"md"} c="dimmed">{props.userDetails.tag}</Text>
          </Stack>
        </Group>

        <Stack justify={"flex-start"} gap={0} mt={'md'}>
          <Text>Dołączył/a: {props.userDetails.joiningDate}</Text>
          <Text>Znajomi: {props.userDetails.friends?.totalFriends}</Text>
        </Stack>
      </Box>
    </Card>
  );
}