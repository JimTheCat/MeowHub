import {Button} from "@mantine/core";
import React from "react";

type MenuButtonProps = {
  text: string;
  icon: React.ReactNode;
}

export const MenuButton = (props: MenuButtonProps) => {
  return (
    <Button
      variant={"subtle"}
      size={"md"}
      leftSection={props.icon}
      autoContrast
      fullWidth
      justify={"flex-start"}
      color={"gray"}
    >
      {props.text}
    </Button>
  );
}