import {Button} from "@mantine/core";
import React from "react";
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";

type MenuButtonProps = {
  text: string;
  icon: React.ReactNode;
  href?: string;
}

export const MenuButton = (props: MenuButtonProps) => {

  const location = useLocation();
  const navigate = useNavigate();

  // check if the current location is a part of the href
  const isActive = location.pathname.includes(props.href || "") && props.href !== undefined;

  return (
    <Button
      variant={isActive ? "outline" : "subtle"}
      size={"md"}
      leftSection={props.icon}
      autoContrast
      fullWidth
      justify={"flex-start"}
      color={"gray"}
      onClick={() => {
        if (props.href) {
          navigate(props.href)
        }
      }}
    >
      {props.text}
    </Button>
  );
}