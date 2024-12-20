import {Center, Flex} from "@mantine/core";
import React from "react";

type ICenterContainer = {
  children: React.ReactNode;
}

export const CenterContainer = (props: ICenterContainer) => {
  return (
    <Center h={'100vh'}>
      <Flex direction={'column'} align={'center'} justify={'center'}>
        {props.children}
      </Flex>
    </Center>
  );
}