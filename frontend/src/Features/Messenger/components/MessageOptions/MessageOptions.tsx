import {ActionIcon, Group} from "@mantine/core";
import {IconMoodSmile} from "@tabler/icons-react";

export const MessageOptions = () => {
  return (
    <Group>
      <ActionIcon variant={"subtle"} color={"gray"} radius={"xl"}>
        <IconMoodSmile stroke={1.5}/>
      </ActionIcon>
    </Group>
  );
}