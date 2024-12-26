import {AppShell, Stack} from "@mantine/core";
import {Aside} from "./components/Aside";
import React from "react";
import {Main} from "./components/Main";

type MatchingProps = {
  component?: React.ReactNode;
}

export const Matching = (props: MatchingProps) => {
  return (
    <AppShell
      aside={{
        breakpoint: 0,
        width: 300
      }}
    >
      <AppShell.Aside withBorder={false}>
        <Aside/>
      </AppShell.Aside>
      <AppShell.Main p={0}>
        <Stack mih={"inherit"} p={'lg'} align={'center'} justify={'center'} gap={0}>
          {props.component ? props.component : <Main/>}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}