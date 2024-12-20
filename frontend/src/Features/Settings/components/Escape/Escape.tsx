import {ActionIcon, Box, Stack, Text} from "@mantine/core";
import {IconX} from "@tabler/icons-react";

export const Escape = () => {
  return (
    <Box pos={"absolute"} top={20} right={30}>
      <Stack align={"center"} justify={"center"} gap={2}>
        <ActionIcon
          p={"xs"}
          variant={"outline"}
          size={"xl"}
          aria-label={"Close"}
          color={"gray"}
          radius={"xl"}
          // Back to previous page
          onClick={() => window.history.back()}
        >
          <IconX stroke={1}/>
        </ActionIcon>
        <Text>Esc</Text>
      </Stack>
    </Box>
  );
}