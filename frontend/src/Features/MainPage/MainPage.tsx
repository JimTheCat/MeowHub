import {Box, Center} from "@mantine/core";
import {InfiniteScroll} from "./components/InfiniteScroll";

export const MainPage = () => {
  return (
    <Box p={"md"}>
      <Center>
        {/* Post rendering */}
        <InfiniteScroll/>
      </Center>
    </Box>
  );
};
